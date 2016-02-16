rm -rf ../../trentv.net/
cp -r ../ ../../trentv.net/
rm -rf ../../trentv.net/.*
killall -KILL node
node ../../trentv.net/api/server.js >> /dev/null &
echo "Build succeeded. Maybe."
