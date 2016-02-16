rm -rf ../../trentv.net/
cp -r ../ ../../trentv.net/
rm -rf ../../trentv.net/.*
killall -KILL node
node ../api/server.js &
echo "Build succeeded. Maybe."
