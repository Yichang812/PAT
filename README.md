# PAT
A cloud-based system model verification tool

###Manual Setup Instruction

Platform: Linux and Windows only

* Download and install [Git](https://git-scm.com/download/win)

* ~~Download and install [MongoDB](https://www.mongodb.org/downloads#production)~~ 

* Using cloud-based mongodb service now.

* Download and install [Node.js](https://nodejs.org/en/) 4.2.3+

* Configure the environment for installing [Edge.js](https://github.com/tjanczuk/edge) (on [Windows](https://github.com/tjanczuk/edge#windows), [Linux](https://github.com/tjanczuk/edge#linux)) (please setup the environment of your computer before installing npm dependencies)

* Download this repository and open your cmd or terminal

Type
```
$ cd PATH_TO_THIS_FOLDER
$ npm install bower -g
$ npm install
$ bower install
```

Start the server by

```
$ node index.js
```

###Run as Docker Container

Dockerfile is provided for build docker container.
Expose port 3000 when run the container.

##Implemented API
_The API are implemented by Express.js_

| API  | URL | Methods | data| 
| ------|------- | -----|-------- |
| Login  | login | POST | {username: _username_, password: _password_}|
| Logout  | logout | GET| |
| Check grammar| api/grammar/csp| POST| {specStr: _model content_}|
| Get assertion list| api/verification/assertions| POST|{spectStr: _model content_}|
| Verify selected assertion| api/verification/verify_assertion| POST| {specStr: _model content_, assertion: _selected assertion_, behavior: _behavior_, engine: _engine_}|
