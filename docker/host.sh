 #! /bin/sh
 OS='uname -s'
echo "$OS"
if [ "$OS" == 'Linux' ]; then
    echo "Linux"
else 
    echo "Not Linux"
fi

 hostname=$(host $ipaddr | awk '{print substr($NF,1,length($NF)-1)}')
 echo $hostname
 h=$(hostname -f) 
 if [ $hostname -ne $h ]
 then
//instructions
 fi