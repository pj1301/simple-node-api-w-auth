# Simple Node API

_This is a simple API, written in node, with auth built in using Bcrypt and JWT._

## Getting started
### MongoDb
The chosen database for this project is MongoDB, this should be started by opening a terminal and entering:
```bash
mongod --config /usr/local/etc/mongod.conf
```
_Note: This can be entered in any directory. The terminal will appear to hang, but this is normal behaviour._

### Project
Clone and then, depending upon whether the dev is an npm or pnpm user, install the required node modules with `npm i` OR `pnpm i`. This project has been configured to work with both.

Once installed, running `npm start` will start the development server.

### Package JSON
There are a number of vital packages included in the package.json file, these must be included as a minimum to run this app:
* @types/bcrypt
* @types/cors
* @types/debug
* @types/express
* @types/express-serve-static-core
* @types/jsonwebtoken
* @types/node
* bcrypt
* cors
* debug
* express
* jsonwebtoken
* nodemon
* ts-node
* typescript

## Issues
### Types issues
A lot of the time, if there is an issue with TS compilation, it is usually down to a missing @types/ import. Here were a few of the novel ones that came up:

**res does not exist on type Response**
This one was actually solved by adding `@types/express-serve-static-core`. It's not enough to simply install @types/express.

## Author
**pj1301**