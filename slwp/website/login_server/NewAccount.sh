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
	typeset Ku=$(AES256modN $Ks ${S[0]} $n)
	typeset Kx=$(XOR 0x${Ku#0x} 0x${Kd#0x} $n)
	typeset Ky=$Ks			# No encryption of Ks for now.
	printf "0x%x\n" 0x$Ku		# This is a hack...
	printf "0x%x 0x%x\n" $Kx $Ky
}

NewAccount $1 $2
