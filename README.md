# PAT
A cloud-based system model verification tool

###Setup Instruction
* Download and install [Git](https://git-scm.com/download/win)

* Download and install [MongoDB](https://www.mongodb.org/downloads#production)

* Download and install [Node.js](https://nodejs.org/en/)

* Download and install [Edge.js](https://github.com/tjanczuk/edge#windows) (please setup the environment of your computer before installation)

* Download this repository and open your cmd or terminal

Type
```
$ cd PATH_TO_THIS_FOLDER
$ npm install bower -g
$ npm install
$ bower install
```
All the setup should be done now!

###Start the server
Type
```
$ node index.js
```
Or you can start the server by
```
$ nodemon index.js

//restart the server by 
$ rs
```
###Implemented API
_The API are implemented by Express.js_

| API  | URL | Methods | data| 
| ------------- | ------------- |
| Login  | login | post | {username: _username_, password: _password_}|
| Logout  | logout | get| |
| Check grammar| api/grammar/csp| post| {specStr: _model content_}|
| Get assertion list| api/verification/assertions| post|{spectStr: _model content_}|
| Verify selected assertion| api/verification/verify_assertion| post| {specStr: _model content_, assertion: _selected assertion_}|
