Leapbase framework
==================

A NodeJS framework for building web appliction

Run webpack
-----------

```
cd site
webpack -p // for production
webpack -w // for development
cd ..
```

Run webserver
-------------

```
npm install 
npm start
```

Visit website at  http://localhost:8080


Setting
-------

The web server setting is controlled by environment variables.

The setting can be specified by a site/setting.js file as well.
An example file is available at site/support/setting.js.

```
export LEAPBASE_HTTP_PORT=8090
export LEAPBASE_DATABASE_TYPE=mongo
export LEAPBASE_DATABASE_HOST=localhost
export LEAPBASE_DATABASE_PORT=27017
```

For more information, see site/support/install.txt.


Webpack
-------

npm install css-loader style-loader --save-dev

npm install -g webpack-dev-server

under site foler, run webpack

test page: http://localhost:8080/web/page/webpack

