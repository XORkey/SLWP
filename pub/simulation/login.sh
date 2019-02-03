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

printf "User sends U (0x%0.8x) and Au (0x%0.8x) to the website (it expects response Bu (0x%0.8x)).\n" $U $Au $Bu

typeset -i Bs Ps Qs seq=0
while SDPS $Au $(LookupSiteKey $U) $seq
do
	if [[ $Bs -eq 0 && $Ps -eq 0 ]]
	then
		printf "Website sends Bs (0x%0.8x) and Ps (0x%0.8x) to the user; login has failed!\n" $Bs $Ps
		exit 1
	fi
	printf "Website sends Bs (0x%0.8x) and Ps (0x%0.8x) to the user (it expects response Qs (0x%0.8x))\n" $Bs $Ps $Qs
	if [[ $Bs -eq $Bu ]]
	then
		typeset -i Rs=$(XOR $Ps $Ku)
		typeset -i Qu=$(SHA256 $Rs)
		printf "Bs matches Bu, so User sends Qu (0x%0.8x) to the website.\n" $Qu
		if [[ $Qs -eq $Qu ]]
		then
			echo "User '$USERID' is logged in!"
			if [[ $seq -gt 0 ]]
			then
				printf "New key is in Rs (0x%0.8x), which will be stored in the keyring.\n" $Rs
				UpdateKeyring "$KEYRING" $KEY_NUMBER $Rs
			fi
			exit 0
		else
			echo "OOOPS! WRONG Qs! THIS SHOULD NOT BE HAPPENING!"
			exit 99
		fi
	else
		if [[ $seq -eq 0 ]]
		then
			echo "Bs does not match Bu, so user send Qs (0x0) to the website."
		else
			echo "Bs still does not match Bu, \c"
			if [[ $c != [yY]* ]]
			then
				echo "continue [y/N]? \c"
				read c
			fi
			if [[ $c = [yY]* ]]
			then
				echo "and user continues... Qs (0x0) sent to the website."
			else
				echo "and user quits by sending Qs (0xffffffff) to the website."
				exit 1
			fi
		fi
		seq=$((seq + 1))
	fi
done
echo "PROGRAMMING ERROR: LOOP SHOULD NOT END THIS WAY!"
exit 99
