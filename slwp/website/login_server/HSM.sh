#!/bin/sh
#
# DESCRIPTION:	Calculate login values using the array with secret keys.
#				This is a simulation of the computations of the HSM.
# SYNTAX:
#			HSM.sh <Au> <Ks> <n> <v> <i>
# ARGUMENTS:
#			<Au>: [hex string]
#				Au.
#			<Ks>: [hex string]
#				Ks.
#			<n>: [int]
#				Number of bits. There is a maximum imposed of 64 bits, due to the size
#				of an integer in bash(1). Furthermore, only multiples of 4 should work
#				as expected.
#			<v>: [bool]
#				Can user verify? Ignored in this simulation and fixed to 'false'.
#			<i>: [int]
#				Iteration count.
# AUTHOR:		T.M.C. Ruiter B ICT
# COPYRIGHT(c):	2014 by XORkey B.V., Winterkoning 5, 1722 CA, Zuid-Scharwoude, The Netherlands.
#
. _HSM-functions.sh
. _SECRET_KEYS.sh

typeset logfile=/tmp/slwp.log
typeset -i m=${#S[*]}
typeset -i MAX_ACTIVE_KEYS=6
typeset -i MAX_KEYS=$(Min $m $MAX_ACTIVE_KEYS)

typeset -i Au=0x${1#0x} Ks=0x${2#0x} n=$3 v=$4 i=$5
typeset -i Bs=0 Ps=0 Qs=0
if [[ $i -lt $MAX_KEYS ]]
then
	typeset -i Ku=0x$(AES256modN $Ks ${S[$i]} $n)
	typeset -i Ru=$(XOR $Au $Ku $n)
	if [[ $i -eq 0 ]]
	then
		typeset -i Rs=$(Random $n)
	else
		typeset -i Rs=$(AES256modN $Ks ${S[0]} $n)
	fi
	typeset -i Bs=0x$(SHA256modN $Ru $n) Ps=$(XOR $Rs $Ku $n) Qs=$(XOR $Rs $Ru $n)
fi
printf "0x%0.$((n/4))x,0x%0.$((n/4))x,%d,%d,%d -> " $Au $Ks $n $v $i >> $logfile
printf "0x%0.$((n/4))x,0x%0.$((n/4))x,0x%0.$((n/4))x\n" $Bs $Ps $Qs >> $logfile
printf "0x%0.$((n/4))x,0x%0.$((n/4))x,0x%0.$((n/4))x\n" $Bs $Ps $Qs
