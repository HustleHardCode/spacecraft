#!/bin/sh
# This is sample deploy script
# You can run this on server after git push or
# locally before you put new version of website via FTP

if [ $1 = "build" ]; then
	echo "[Build] Running npm install"
	npm install
	if [ $? = "0" ]; then
	  echo "[Build] Npm install success, running Bower install"
	  cd public
	  bower install --allow-root
	  if [ $? = "0" ]; then
		cd ..
		echo "[Build] Bower install success, running gulp build"
		rm -rf build
		gulp build
		gulp rev
		if [ $? = "0" ]; then
		  echo "[Build] Gulp build success"
		else
		  echo "[Build] Gulp build failed, aborting build"
		fi
	  else
		echo "[Build] Bower install failed, aborting build"
	  fi
	else
	  echo "[Build] Npm install failed, aborting build"
	fi
fi

if [ $1 = "start" ]; then
	echo "[Start] Running server"
	NODE_ENV=production NODE_PATH=. PORT=80 DEBUG=spacecraft forever --uid SpaceCraftServer -a start bin/www
fi

if [ $1 = "stop" ]; then
	echo "[Stop] Stop server"
 	forever stop SpaceCraftServer
fi

if [ $1 = "tools" ]; then
	npm install forever -g
	npm install -g bower
	npm install --g gulp-cli
	npm install --save-dev gulp
fi