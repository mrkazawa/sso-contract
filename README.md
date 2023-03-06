# SSO Contract #

This repository is implementing our paper "" which is published [here]().

## Running ##

```shell
cd to directory
docker-compose build --no-cache
docker-compose up -d
```

## Get access to the terminal ##

Run this command.

```shell
docker ps # see the container-id
docker run -it <container-id> sh
```

After that, you can access the terminal like when you run SSH on virtual machine.

## Install dependencies ##

From the SSH-ed `dapp` container, run this:

```console
root@host:~$ docker-compose exec dapp sh
dapp@container:~$ yarn install
```

## Stopping / tearing all down ##

```shell
docker-compose down --rmi all
```

## Check the contract size ##

```shell
truffle run contract-size --ignoreMocks
```

## BUG ##

If you cannot remove docker network because of `has active endpoint`, then run this command to disconnect all containers from network.

```shell
docker network disconnect -f lasignora_local {container_id} # repeat this for all active containers
docker network rm lasignora_local # remove the network
```


## Vagrant ##

Useful Vagrant commands here

```shell
vagrant up --provider=hyperv
vagrant ssh
vagrant destroy -f

vagrant reload

vagrant halt
vagrant global-status
```


 export DISPLAY=127.0.0.1:0.0
