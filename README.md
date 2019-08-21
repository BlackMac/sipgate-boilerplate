SIPGATE BOILERPLATE
===================

## Demo

Try our [Live Sample](https://spinatathon.sideprojects.de)

## Get started

 ### 1. Check out sipgate boilerplate
```bash
# clone the repository
git clone git@github.com:BlackMac/sipgate-boilerplate.git
# switch to sipgate boilerplate directory
cd sipgate-boilerplate
# install dependencies
npm install
# or
yarn install
```

### 2. configure your sipgate.io client

You need to create credentials (CLIENT_SECRET and CLIENT_ID) for your application. Generate with at the [sipgate console](https://console.sipgate.com)

```bash
# create a copy of the example config
cp .env.example .env
# edit example config and fill in your API client credentials
nano .env
```


### 3. run sipgate boilerplate
```bash
# run
node app.js
```

### 3. Open sipgate boilerplate in your browser

http://localhost:8080

### 4. Create an app

```bash
# create a copy of the app template
cp -r apps/.template apps/helloworld
```
After restarting node your app is avaliable at http://localhost:8080/helloworld
