from fabric.api import *
from fabric.colors import green, yellow, red


@task
def build_perpare():
    local('cp package.json docker/perpare/')
    with lcd('docker/perpare/'):
        local('docker build . -t bismuth/perpare:0.1.0-dev')
        local('rm package.json')


@task
def build_web():
    with lcd('web'):
        local('ember build -prod')


@task
def build():
    local('docker rmi bismuth:0.1.0-dev')
    local('docker build -f docker/bismuth/Dockerfile . -t bismuth:0.1.0-dev')
