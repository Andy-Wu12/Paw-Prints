# View Some Dogs

This is a [Node.js](https://nodejs.org/en/about/) web application
using the [Koa](https://koajs.com/) and [React](https://reactjs.org/)
web frameworks.

## Getting started

You will need to install Node.js.

For best results, use [Node.js 16 or higher](https://nodejs.org/).

You can check your current version of Node.js with

```sh
$ node --version
v16.17.0
```

Open two terminal sessions. They will be for running the 
frontend and backend separately.

To start up the server in the backend,
```sh
cd app/backend
npm install
npx ts-node server.ts
```

Alternatively, you can run with the compiled server.ts
```sh
tsc -p .
node server.js
```

If the server starts successfully, you will see
```sh
Server running on http://localhost:8080
```

in the terminal.


To start up the frontend run
```sh
cd app/frontend
npm install
npm run start
```
in your other terminal tab.

Note that `npm install` in this case will result in a few **high severity vulnerabilities** being discovered.
However, this is just a false positive which you can read more about from a Meta engineer himself [here](https://github.com/facebook/create-react-app/issues/11174)

If the server starts successfully, you will see
```
You can now view dogs in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://networkaddress:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully
```

## In your browser
Once both servers are started, you can navigate to: <br />
1. Application website - http://localhost:3000
2. Server w/ endpoints - http://localhost:8080


## Documentation

- Koa: https://koajs.com/
- @koa/router: https://github.com/koajs/router#koarouter
- koa-body: https://github.com/dlau/koa-body#usage-with-koa-router
- Dogs API: https://dog.ceo/dog-api/breeds-list
- React.js: https://beta.reactjs.org/learn/thinking-in-react
- React Router: https://reactrouter.com/en/main
