function Min
{
	[[ $1 -lt $2 ]] && echo $1 || echo $2
}

function Max
{
	[[ $1 -gt $2 ]] && echo $1 || echo $2
}

function Random
{
	dd bs=4 count=1 if=/dev/random 2> /dev/null | od -h | awk '{ printf "0x%s%s", $2, $3; exit}'
}

function XOR
{
	echo $(($1 ^ $2))
}

# Syntax: AES256 <value> <key>
function AES256
{
	# Fake this by secretly using XOR...
	XOR $1 $2
}

function SHA256
{
	# Fake this by secretly using cksum
	echo "$1" | cksum | cut -d ' ' -f 1
}

function InitHSM
{
	typeset secret_keys_file=$1
	typeset -i i=0
	typeset secret_key
	while read secret_key
	do
		S[$((i++))]=$secret_key
		[[ $i -lt $MAX_KEYS ]] || break
	done < $secret_keys_file
	typeset -i j=0
	echo "Loaded Secret keys:"
	while [[ $j -lt $i ]]
	do
		printf "S[%d]: 0x%0.8x\n" $j ${S[$((j++))]}
	done
	m=$j
	echo "m = $m"
}

function UpdateAccountsDatabase
{
	typeset -r AD=accounts_database
	typeset -r AD_tmp=ad_tmp
	typeset hash=$1
	typeset Ks=$2
	grep -v $hash $AD > $AD_tmp
	echo $hash $Ks | cat - $AD_tmp > $AD
	rm $AD_tmp
}

function ReadKey
{
	typeset keyring="$1"
	typeset -i key_number=$2
	[[ -r $keyring ]] &&
		tail -n +$key_number "$keyring" | head -n 1 ||
			echo 0
}

function UpdateKeyring
{
	typeset keyring="$1"
	typeset -i key_number=$2
	typeset -i key=$3
	mv "$keyring" "$keyring.old"
	awk "{ if (NR == $key_number) print $key ; else print }" "$keyring.old" > "$keyring"
}

function LookupSiteKey
{
	typeset hash=$1
	awk "BEGIN { found=0 }
		/$hash/ { found = 1 ; print \$2 }
		END { if (found = 0) print 0 }" accounts_database
}

function HSM
{
	typeset -i Ku=$(AES256 $Ks ${S[$i]})
	typeset -i Ru=$(XOR $Au $Ku)
	Bs=$(SHA256 $Ru)
	if [[ $i -eq 0 ]]
	then
		typeset -i Rs=$(Random)
	else
		typeset -i Rs=$(AES256 $Ks ${S[0]})
		printf "new key Rs=0x%0.8x\n" $Rs
	fi
	Ps=$(XOR $Rs $Ku)
	Qs=$(XOR $Rs $Ru)
#	Qs=$(SHA256 $Rs)
	unset Ku Ru Rs
}

function SDPS
{
	typeset -i Au=$1
	typeset -i Ks=$2
	typeset -i i=$3
	if [[ $i -ge $m || $Ks -eq 0 ]]
	then
		Bs=0
		Ps=0
		Qs=0
	else
		HSM
	fi
	printf "Login server returns Bs=0x%0.8x Ps=0x%0.8x Qs=0x%0.8x to webserver.\n" $Bs $Ps $Qs
	return 0		# Always OK.
}

typeset -ir MAX_KEYS=$(Max 2 10)
typeset -ai S
typeset -i m=0
