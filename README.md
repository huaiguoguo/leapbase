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
git config user.name $GIT_USER_NAME
git config user.email $GIT_USER_EMAIL

git config credential.helper 'cache --timeout=3600'
git config credential.helper store
```


Docker Commands
---------------
```
eval $(docker-machine env default) // for docker in Windows/MacOSX
docker build --tag=leapon/leapbase -f ./Dockerfile . // build docker image for leapbase
docker push leapon/leapbase // publish docker image to docker hub

docker run --name=leapbase -p 8080:8080 -t -d leapon/leapbase  // run docker image
```
