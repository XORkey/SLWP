. keyring-functions.sh

InitHSM secret_keys

typeset -r USERID="$1"
typeset keyring="$USERID.keyring"
typeset -r KEY_NUMBER=$2

typeset -i Ru=$(Random)
typeset -i Ku=$(ReadKey "$keyring" $KEY_NUMBER)
typeset -i Au=$(XOR $Ru $Ku)
typeset -i Bu=$(SHA256 $Ru)
typeset U=$(SHA256 $USERID)

printf "User sends U (0x%0.8x) Au (0x%0.8x) to the website (it expects Bu (0x%0.8x)).\n" $U $Au $Bu

typeset -i seq=0
while [[ $seq -lt 10 ]]
do
	typeset sdps=$(SDPS $Au $(LookupSiteKey $(SHA256 $1)) $seq)
	typeset -i Bs=$(echo $sdps | awk '{ print $1 }')
	typeset -i Ps=$(echo $sdps | awk '{ print $2 }')
	typeset -i Qs=$(echo $sdps | awk '{ print $3 }')

	if [[ $Qs -eq 0 ]]
	then
		printf "Website sends Bs (0x%0.8x) and Ps (0x%0.8x) to the user\n" $Bs $Ps
	else
		printf "Website sends Bs (0x%0.8x) and Ps (0x%0.8x) to the user (it expects response Qs (0x%0.8x))\n" $Bs $Ps $Qs
	fi

	if [[ $Bs -eq 0 && $Ps -eq 0 ]]
	then
		echo Login has failed.
		exit 1
	fi

	if [[ $Bs -eq $Bu ]]
	then
		typeset -i Rs=$(XOR $Ps $Ku)
		typeset -i Qu=$(SHA256 $Rs)
		printf "Bs matches Bu, so User sends Qu (0x%0.8x) to the website.\n" $Qu
		if [[ $Qs -eq $Qu ]]
		then
			echo "User '$USERID' is logged in!"
			exit 0
		else
			echo "OOOPS!"
			exit 99
		fi
	else
		if [[ $seq -eq 0 ]]
		then
			echo "Bs does not match Bu, so user send Qs (0x0) to the website."
		else
			echo "Bs still does not match Bu, and user continues... Qs (0x0) sent to the website."
		fi
		seq=$((seq + 1))
	fi
done
