printf "0x%x 0x%x %d %d %d\n" $* >> /tmp/tmcr
#ssh timor@login252.xorkey.com ./HSM.sh $1 $2 $3 $4 $5 | grep ",.*,"
cd /Users/timo/src/slwp/website/login_server
./HSM.sh $1 $2 $3 $4 $5 | grep ",.*,"

# curl --connect-timeout 3 -sk --no-netrc -F Au=$1 -F Ks=$2 -F n=$3 -F v=$4 -F i=$5 https://login.xorkey.com/call_hsm.php | grep ",.*,"
