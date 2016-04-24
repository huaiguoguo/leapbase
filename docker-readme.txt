# Install docker
# For Windows and MacOSX, need to install Docker Toolbox: https://www.docker.com/docker-toolbox
# For MacOSX, Run "Docker Quickstart Terminal.app" to setup Docker Daemon

# docker ready message:
docker is configured to use the default machine with IP 192.168.99.100

/usr/local/bin/docker-machine env default
export DOCKER_TLS_VERIFY="1"
export DOCKER_HOST="tcp://192.168.99.100:2376"
export DOCKER_CERT_PATH="/Users/yliu0/.docker/machine/machines/default"
export DOCKER_MACHINE_NAME="default"
# Run this command to configure your shell:
# eval $(/usr/local/bin/docker-machine env default)

# Create docker image
docker build --tag=leapon/leapbase -f ./Dockerfile .

# Run docker container
docker run --name=leapbase -p 8005:8080 -t -d leapon/leapbase

# Check log file on leapbase container
docker logs -f leapbase

# Inspect Docker container
docker inspect leapbase

# Visit dnrdw website at docker ip address shown above: 192.168.99.100
http://192.168.99.100
