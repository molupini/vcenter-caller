# VCENTER CALLER

Powered by Nodejs.

  - Deploy with docker-compose

# Features

You can:
  - Query the vmware api explore, "vcenter particular"

# Tech

Uses a number of open source projects to work properly:

* [node.js] - open-source, JavaScript runtime environment 
* [vmware] - cloud computing and virtualization software and services
* [vmware-api-explorer] - Browse and inspect APIs across Vmware platforms

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

Before we begin, credentials can be stored within environment variables, if omitted you'll need to use the following parameters see instructions below :
```sh
$ vi ./.env/app.env

# # VSPHERE 
# VCENTER_HOST=unknown
VCENTER_USER=user
VCENTER_PASSWORD=default
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

For prod, install node:
```sh
$ cd ./src
$ npm i --save
```

# Instructions

Verify docker exec,

```sh
# # IMPORTANT 
# METHODS 
    # getPathRegEx, will query the vmware explorer api for supported resources. Folder can be provided or Regex to filter return "simple pattern supported only"
    # getDataStore, similar to above but will provide a % of free space
    # getFolder, can be used to get a folder id which can be used in the above methods 

# PARAMETERS
    # --vCenterHost=, --vCenterUser=, --vCenterPassword= 
      # > either make use of a environment variable or parameter not both,
      # > example if you set the VCENTER_HOST environment variable and vCenterHost parameter the env will take effect. 
      # > It is possible to use a combination of both example setting VCENTER_USER and VCENTER_PASSWORD and making use of the vCenterHost parameter to establish connection. 
      # > Another tip use the IP address of the vCenter if issues encountered with fqdn"
    # --resource=, supported "datacenter, cluster, datastore, host, network"
    # --folder=, "folder id"
    # --regex=, "simple pattern matching"

# RESULT
  # > SUCCESS JSON RESPONSE 
  # > FAILURE 1 WITH ERROR IN CONSOLE

# # STEP 1, IF REQUIRED TO NARROW DOWN SEARCH 
# QUERY FOLDER 
    # > GET LIST OF FOLDERS WHICH CAN CORRESPOND TO A RESOURCE NAME EXAMPLE THE SUPPORTED CLUSTER
    # > USE ID TO FIND DATA STORES BELOW IN STEP 2
$ docker exec id node run.js getFolder --vCenterHost= --resource=datastore --folder= --regex=

# QUERY FOLDER NETWORK,
    # > GET LIST OF FOLDERS WHICH CORRESPOND TO SUPPORTED NETWORK
    # > USE ID TO FIND NETWORKS BELOW IN STEP 2
$ docker exec id node run.js getFolder --vCenterHost= --resource=network --folder= --regex=

# # STEP 2, RETRIEVE RESOURCES
# DATA STORE, ADD FOLDER ID FROM STEP 1 ...
$ docker exec id node run.js getPathRegEx --vCenterHost= --resource=datastore --folder=... --regex=
# USE 2ND FUNCTION FOR % FREE, ADD FOLDER ID FROM STEP 1 ...
$ docker exec id node run.js getDataStore --vCenterHost= --resource=datastore --folder=... --regex=
# NETWORK, ADD FOLDER ID FROM STEP 1 ...
$ docker exec id node run.js getPathRegEx --vCenterHost= --resource=network --folder=... --regex=

# OTHER EXAMPLES, FULL RETURN 
$ docker exec id node run.js getPathRegEx --vCenterHost= --resource=datacenter --folder= --regex=
```

Verify node,
*make use of examples above*
```sh
$ node ./run.js func --vCenterHost= --resource= --folder= --regex=
```

# License

MIT

# Author
**Want to contribute? Great! See repo [git-repo-url] from [Maurizio Lupini][mo]    -Author, Working at [...][linkIn]**


   [mo]: <https://github.com/molupini>
   [linkIn]: <https://za.linkedin.com/in/mauriziolupini>
   [git-repo-url]: <https://github.com/molupini/vcenter-caller>
   [node.js]: <http://nodejs.org>
   [vmware]: <https://www.vmware.com/>
   [vmware-api-explorer]: <https://code.vmware.com/apis/>
