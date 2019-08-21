SIPGATE BOILERPLATE
===================

## Get started

 ### 1. Check out sipgate boilerplate
```bash
# clone the repository
git clone git@github.com:BlackMac/sipgate-boilerplate.git
# switch to sipgate boilerplate directory
cd sipgate-boilerplate
```

### 2. configure your sipgate.io client

You need to create credentials (CLIENT_SECRET and CLIENT_ID) for your application. Generate with at the [sipgate console](https://console.sipgate.com)

```bash
# create a copy of the example config
cp .env.example .env
# edit example config and fill in your API client credentials
nano .env
````


### 3. run sipgate boilerplate
```bash
# run
node app.js
```

### 2. Open sipgate boilerplate in your browser

http://localhost:8080

