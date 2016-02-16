rm -rf ../../trentv.net/
cp -r ../ ../../trentv.net/
rm -rf ../../trentv.net/.*
killall -KILL node
ds node ../../trentv.net/api/server.js
echo "Build succeeded. Maybe."
