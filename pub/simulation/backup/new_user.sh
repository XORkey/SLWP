#!/bin/sh
#
# DESCRIPTION:	A fully working example using 32 bit keys and values instead of 128 bit keys and values.
#
# AUTHOR:		ing. T.M.C. Ruiter (timo.ruiter@xs4all.nl)
#
. keyring-functions.sh

InitHSM secret_keys

typeset U="$1"
typeset -i key_number=$2
typeset -i Kd=$(ReadKey "$U.keyring" $key_number)
typeset -i Ks=$(Random)
typeset -i Ku=$(AES256 $Ks ${S[0]})
typeset -i Kx=$(XOR $Ku $Kd)
printf "Received U: \"%s\", Kd = 0x%0.8x\n" "$U" $Kd
printf "Generated (and forgotten) key: Ku: 0x%0.8x\n" $Ku
typeset hash=$(SHA256 "$U")
printf "To accounts database: hash: %s, Ks: 0x%0.8x\n" $hash $Ks
UpdateAccountsDatabase $hash $Ks
printf "Mail to user: Kx: 0x%0.8x\n" $Kx
typeset -i user_Ks=$(XOR $Kx $Kd)
printf "User decrypts this with Kd to yield Ku: 0x%0.8x\n" $user_Ks
UpdateKeyring "$U.keyring" $key_number $user_Ks
