#### How to run server

* Run `npm install` to install dependencies

* Run `npm install -g bcrypt-cli` to download the Bcrypt CLI for hashing passwords

* Run `bcrypt-cli $PASSWORD $ROUNDS` to hash a password. **$PASSWORD** is placeholder for password & **$ROUNDS** is placeholder for the hashing rounds. e.g `bcrypt-cli "This is secret" 10`

* Store the generated hash in a `.env` file as the value of a key **PW**

* Add another key **SECRET** with a random string value

*Run `npm start` to start server on port **1259**. Navigate to the root url to display static content