SIPGATE BOILERPLATE
===================

## Demo

Try the [Live Sample](https://spinatathon.sideprojects.de)

## Get started
 ### 0. Install requirements
 [Install Node.js](https://nodejs.org/en/)
 
 You can use any text editor, but I recommend [Visual Studio Code](https://code.visualstudio.com/)

 __Mac ONLY:__
 On a Mac you need the command line developer tools open terminal and enter ```xcode-select --install```

 ### 1. Check out sipgate boilerplate
 Open your Operating systems terminal and type:
```bash
# clone the repository
git clone https://github.com/BlackMac/sipgate-boilerplate.git
# switch to sipgate boilerplate directory
cd sipgate-boilerplate
# install dependencies
npm install
```

### 2. Run a mongoDB server

#### In the cloud
Visit https://atlas.mongodb.com/ and create a free sandbox cluster close to your location.

When your cluster is ready (it takes a while) click "Connect", "Connect your Application" and whitelist your IP and define your username and password.

Afterwards you get a link like this:

    mongodb+srv://user:<password>@cluster.mongodb.net/test?retryWrites=true&w=majority

Make sure to replace < password > with the password you set before and paste the URL in your .env file:

```bash
# create your own .env file
cp .env.example .env
# edit .env file (you can use any editor. nano is just a recommendation)
nano .env
```

### 2. Run sipgate boilerplate
```bash
# run
node app.js
```

### 3. Open sipgate boilerplate in your browser

http://localhost:8080

### 4. Create an app

```bash
# create a new app
./mkapp helloworld
```
After restarting node your app is avaliable at http://localhost:8080/apps/helloworld
