# VCENTER CALLER

Powered by Nodejs.

  - Deploy with docker-compose

# Features

You can:
  - Query the vmware api explore, "vcenter particular"

# Tech

name-service uses a number of open source projects to work properly:

* [node.js] - open-source, JavaScript runtime environment 

# Installation


#### Install

Open your favorite Terminal and run these commands.

First, if necessary:
```sh
$ mkdir ./vcenter-caller
$ cd vcenter-caller/
```
Second:
```sh
$ git init
```
Third:
```sh
$ git clone git@github.com:molupini/vcenter-caller.git
```


#### Author

Using node + nodemon + docker for fast developing. Making any change in your source file will update immediately.

Before we begin, required environment variables:
```sh
$ vi ./.env/app.env

# # VSPHERE 
VCENTER_HOST=unknown
VCENTER_USER=unknown
VCENTER_PASSWORD=unknown
```


### Deploy

Easily done in a Docker container.
Make required changes within Dockerfile + compose files if necessary. When ready, simply use docker-compose to build your environment.
This will create the services with necessary dependencies.

For dev, docker compose:
```sh
$ docker-compose build
$ docker-compose up
```
Verify via docker via CMD or docker exec. 

```sh
# # STEP 1, IF REQUIRED TO NARROW DOWN SEARCH 
# QUERY FOLDER DATA STORE
    # GET LIST OF FOLDERS WHICH CORRESPOND TO SUPPORTED CLUSTER
    # USE ID TO FIND DATA STORES BELOW
# CMD ["nodemon", "./bin/run.js", "getFolder", "--resource=datastore", "--folder=", "--regex="]

# QUERY FOLDER NETWORK,
    # GET LIST OF FOLDERS WHICH CORRESPOND TO SUPPORTED NETWORK
    # USE ID TO FIND NETWORKS BELOW
# CMD ["nodemon", "./bin/run.js", "getFolder", "--resource=network", "--folder=", "--regex=...-..."]

# # STEP 2, RETRIEVE RESOURCES
# DATA STORE
# CMD ["nodemon", "./bin/run.js", "getPathRegEx", "--resource=datastore", "--folder=group-...", "--regex="]
# USE 2ND FUNCTION FOR % FREE
# CMD ["nodemon", "./bin/run.js", "getDataStore", "--resource=datastore", "--folder=group-...", "--regex="]

# NETWORK
# CMD ["nodemon", "./bin/run.js", "getPathRegEx", "--resource=network", "--folder=group-....", "--regex=-...-"]
# CMD ["nodemon", "./bin/run.js", "getPathRegEx", "--resource=network", "--folder=group-....", "--regex=-...-"]

# OTHER EXAMPLES 
# CMD ["nodemon", "./bin/run.js", "getPathRegEx", "--resource=datacenter", "--folder=", "--regex="]
# CMD ["nodemon", "./bin/run.js", "getPathRegEx", "--resource=cluster", "--folder=", "--regex="]

```

For prod, install node:
*evaluate above using nodemon or docker exec*
```sh
$ cd ./bin
$ npm i --save
$ node ./bin/run.js func --resource= --folder= --regex=

```

# Future Release

  - TBD.

# License

MIT

# Author
**Want to contribute? Great! See repo [git-repo-url] from [Maurizio Lupini][mo]    -Author, Working at [...][linkIn]**


   [mo]: <https://github.com/molupini>
   [linkIn]: <https://za.linkedin.com/in/mauriziolupini>
   [git-repo-url]: <https://github.com/molupini/vcenter-caller>
   [node.js]: <http://nodejs.org>
