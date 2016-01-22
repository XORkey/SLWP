#!/bin/bash
#
#
. _HSM-functions.sh
. _SECRET_KEYS.sh

function NewAccount
{
	typeset Kd=$1			# The dummy key is sent unencrypted.
	typeset n=$2
	typeset -i Ks=$(Random $n)
	typeset Ku=0x$(AES256modN $Ks ${S[0]} $n)
	typeset Kx=$(XOR $Ku $Kd $n)
	typeset Ky=$Ks			# No encryption of Ks for now.
	printf "%x %x\n" $Kx $Ky
}

NewAccount $1 $2
