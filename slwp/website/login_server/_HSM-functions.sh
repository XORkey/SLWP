function _rand
{
	typeset -i bits=$1
	typeset -i bytes=$(((bits + 7) / 8))
	if [[ $(uname) -eq Darwin ]]
	then
		openssl rand $bytes | od -tx1 | head -n 1 | cut -c 9- | tr -d ' '
	else
		openssl rand $bytes | od -tx1 --width=$bytes | head -n 1 | cut -c 9- | tr -d ' '
	fi
}
function Random
{
	typeset -i bits=$1
	typeset -i bits_per_hex_char=$((bits / 4))
	printf "0x%0.${bits_per_hex_char}x" $((0x$(_rand $bits) & $((2**bits - 1))))
}
function XOR		{ printf "0x%0.$(($3 / 4))x" $(($1 ^ $2)); }
function AES256 	{ printf "%s" "$1" | openssl enc  -aes256 -K "$2" -iv 0 | od -t xC | head -n 1 | cut -c 8- | tr -d  ' '; }
function SHA256 	{ printf "%s" "$1" | openssl dgst -sha256 | cut -d ' ' -f 2; }
function modN		{ awk "{ print substr(\$0, length(\$0) + 1 - $1 / 4, $1 / 4); }"; }
function AES256modN	{ AES256 "$1" "$2" | modN $3; }
function SHA256modN	{ SHA256 "$1"      | modN $2; }
function Min		{ [[ $1 -lt $2 ]] && echo $1 || echo $2; }
