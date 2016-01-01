. keyring-functions.sh

InitHSM secret_keys

typeset -r USERID="$1"
typeset -r KEY_NUMBER=$2
typeset -r KEYRING="$USERID.keyring"

typeset -i Ru=$(Random)
typeset -i Ku=$(ReadKey "$KEYRING" $KEY_NUMBER)
typeset -i Au=$(XOR $Ru $Ku)
typeset -i Bu=$(SHA256 $Ru)
typeset U=$(SHA256 $USERID)


function WebserverLogin
{
	typeset Uh=$1
	typeset -i Au=$2
	Ks=$(LookupSiteKey $Uh)
	if [[ Ks -eq 0 ]]
	then
		printf "SendToUser(0, 0);  No such user: login failed."
		return 1
	else
		typeset -i i=0
		typeset Qu=0, Qs=0, Rs=0
		while true
		do
			printf "Webserver sends Au=0x%0.8x, Ks=0x%0.8x, i=%d to the login server\n" $Au $Ks $i
			SDPS $Au $Ks $i
			if [[ $Qs -gt 0 ]]
			then
			# User computes Qu and sends it to the webserver.
				if [[ $Bs -eq $Bu ]]
				then
					Rs=$(XOR $Ps $Ku)
					Qu=$(SHA256 $Rs)
					printf "Bs matches Bu, so User sends Qu=0x%0.8x to the webserver.\n" $Qu
				else
					Qu=$(AskToContinue $i)
				fi
			else
				Qu=$Qs
			fi
			if [[ $Qu -eq 1 ]]
			then
				Qs=$Qu
			fi
			i=$((i+1))
			[[ $Qu -eq $Qs ]] && break
		done
		printf "SendToUser(0, 0x%0.8x);  login " $Qs
		Ps=$Qs
		if [[ $Qs -gt 1 && $Ps -eq $Qu ]]
		then
			printf "succeeded.\n"
			if [[ $i -gt 1 ]]
			then
				printf "New key is in Rs=0x%0.8x, which will be stored in the keyring.\n" $Rs
				UpdateKeyring "$KEYRING" $KEY_NUMBER $Rs
			fi
		else
			printf "failed.\n"
		fi
	fi
}

function AskToContinue
{
	typeset -i attempt=$1
	typeset ch="y"
	if [[ $attempt -eq 1 ]]
	then
		echo "continue [y/N]? \c" >&2
		read ch
	fi
	if [[ $ch != [yY]* ]]
	then
		echo 1					# Abort.
	else
		echo 0					# Continue.
	fi
}

printf "User sends Uh=0x%0.8x and Au=0x%0.8x to the webserver (it expects response Bu=0x%0.8x).\n" $U $Au $Bu
WebserverLogin $U $Au

exit 0
