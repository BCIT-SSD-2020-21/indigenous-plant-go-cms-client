# Launch/Install documentation
## Installing server-side of cms from github
1. Clone the repo with the following code:
```
git clone https://github.com/BCIT-SSD-2020-21/indigenous-plant-go-cms.git
```
2. Navigate into the server folder of the repo
  - indigenous-plant-go-cms/server
### To run locally
1. Install all the node module with `npm install`
2. Few things related to .env file needs to be set up:
  1. To run this locally you will need to set up a S3, see /planning/server/s3/README.md for how to set that up
  2. To run this locally you will need to set up mongoDb, if you have mongo shell and stuff you can just set `MONGO_DB_URL=mongodb://localhost:27017/<Your Db name>` in .env file. For mongoDb atlas set up, (yet to be documented)
  3. One more thing to set up in .env file is sender email for recovering password
Final .env file should have the following field: 
```
MONGO_DB_URL=<Your mongo_db url>
AWS_BUCKET_NAME=<Your s3 bucket name>
AWS_BUCKET_REGION=<Your s3 bucket region>
AWS_ACCESS_KEY=<Your s3 access key>
AWS_SECRET_KEY=<Your s3 secret key>
SENDER_EMAIL=<Your email that handles sending recovery email>
SENDER_PASSWORD=<Your password for the email above>
```
3. Running npm start now should run the api stuff at `http://localhost:8080`, for the routes see /planning/server/api for all the routes
### To deploy to heroku (using heroku cli)
1. Set up the app on heroku site and download heroku cli, typing heroku --version in your terminal to check if you install heroku cli correctly
2. Add a new git inside the server folder and commit everything, and make sure to rename the branch that was created with the commit is called master, rename to master if it is not
``` 
git init
git add .
git commit -m "Initial commit"

git branch -m master
```
And add the heroku git url as a remote to this repo (you can get this from the setting from the app you set up on heroku site) and push to heroku
```
git add remote heroku <Your heroku git url>
git push heroku master
```
3. You also need to set up s3 and mongoDb separately, but you put the variable that is suppose to go in .env file into config vars in heroku app's setting, see above to run locally step 2 to see what environmental variables are required
  - An extra variable you can add is ACCESS_TOKEN_SECRET to separate the jwt token generated from your local with ones generated from your deployed app, the secret can be anything you want
4. Once you set up all the environmental variables in config vars on heroku, you should be able to run it on your deployed domain, route still follow those in /planning/server/api

## Installing client-side of cms from github
1. If you already clone it from step 1 above you just need to navigate to the client folder instead
  - indigenous-plant-go-cms/client
2. Install all the node module with `npm install`