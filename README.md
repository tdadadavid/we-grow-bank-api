
# We-Grow-Bank-API
***

### Description
#### Technologies used
    * Language: Nodejs(Typescript)
    * Framework: Nestjs
    * Database: Mongodb
    * ORM: Typegoose
    * Auth: jsonwebtoken
    * API server: Apollo-graphql-server.

***

#### Transactions
* TRANSACTION TYPES
    * Deposit
    * Withdrawal
* USERS
  * Account
***
* **Deposit**
  * Only authenticated and authorized user's can perform these transactions.
  * If balance is not sufficient it throws `InsufficientBalanceException`
  * If the two accounts are not having the same currency, an external API is
    used to get current exchange rates value for the two parties involved.
* **Withdrawal**
    * Only authenticated and authorized user's can perform these transactions.
    * If balance is not sufficient it throws `InsufficientBalanceException`
    * Users cannot withdraw negative amounts.
***

### Project Setup
***

### Create environment file.
    -$ touch .env 
### Copy environment configurations to newly created env file
    ~$ cp .env.example .env


### Start scripts.
    ~$ npm install --legacy-peer-deps
    ~$ npm run start:dev [ developement ]
    ~$ npm run start:prod [ production ]

### Using Docker
    ~$ sudo docker build -t we-grow-api:1.0
    ~$ sudo docker run -p ${ANY_PORT}:3000 we-grow-bank-api:1.0
****

Check [here](https://docs.docker.com/desktop/install/linux-install/) to download docker.