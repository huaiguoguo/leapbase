Leapease framework
==================

A minimum framework for building web appliction


Run Webapp
----------

```
npm install 
npm start
```


Git Setup
---------
```
git config user.name username
git config user.email user@example.com

git config credential.helper 'cache --timeout=3600'
git config credential.helper store
```


Docker Commands
---------------
```
eval $(docker-machine env default) // for docker in Windows/MacOSX
docker build --tag=leapon/leapease -f ./Dockerfile . // build docker image for leapease
docker push leapon/leapease // publish docker image to docker hub

docker run --name=leapease -p 8080:8080 -t -d leapon/leapease  // run docker image
```
