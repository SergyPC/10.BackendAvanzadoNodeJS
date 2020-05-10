# NodePOP

NodePOP is an advertisements API.

## Installation

(NodePOP requires [Node.js](https://nodejs.org/) v4+ to run)

```shell
npm install
```

You must copy .env.example to .env and review your configuration.
```shell
cp .env.example .env
```

To initialize the database you can run:

```shell
npm run install-db
```

## To start a MongoDB Server from console:
(You must have [MongoDB](https://www.mongodb.com/download-center/community) installed)


```shell
./bin/mongod --dbpath ./data/db --directoryperdb
```
Only for operating systems that don't have it installed as a service (MongoDB, in Windows, is installed as a default service).

<br />

## Start project

To start the project use:

- In development:
```shell
npm run dev
```
- In production:
```shell
npm start
```

<br />

## Page Routes

* http://localhost:3000/
* http://localhost:3000/tags

<br />

## API Rest

As a backend server we will use a Rest API in the cloud with the following address:
http://localhost:3000/

<br />

## API Methods

### Authentication

**POST /api/v1/loginJWT** (http://localhost:3000/api/v1/loginJWT)

> Returns a token (string) of the authenticated user.

#### - Data required in the body:
```shell
POST > http://localhost:3000/api/v1/loginJWT

// In the Body tab:
  - We will add the following KEY/VALUE that we want to insert for that document:

  (•) form-data
        KEY         VALUE
        -----------------
        email       string
        password    string
```

<!-- {
  email: string,
  password: string
} -->


#### - Result:
```shell
{ token: string }
```

<br />

**GET /api/v1/anuncios** (http://localhost:3000/api/v1/anuncios)
<br />
**Header: Authorization: token**

> Returns the list of advertisement in JSON format.

**(Default limit is 100)**

#### - Data required in the headers:
```shell
GET > http://localhost:3000/api/v1/anuncios

// In the Headers tab:
  - We will add the following KEY/VALUE that we want to use for that document:

  KEY             VALUE
  ---------------------
  Authorization   <tokenString>
```

#### - Result:
```shell
[
  {
    "tags": [
      "lifestyle",
      "motor"
    ],
    "_id": "5e8ca710ebce9562e8cdcb7f",
    "name": "Bicicleta eléctrica Rodars 1000W",
    "sell": true,
    "price": 230.15,
    "photo": "bicicleta-rodars-1000W.jpg",
    "thumbnail": "bicicleta-rodars-1000W-tn.jpg",
    "detail": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "createdAt": "2020-05-07T16:15:12.284Z",
    "updatedAt": "2020-05-07T16:15:12.284Z"
  },
  {
    "tags": [
      "lifestyle",
      "mobile"
    ],
    "_id": "5e8ca710ebce9562e8cdcb80",
    "name": "iPhone 11Pro",
    "sell": true,
    "price": 50,
    "photo": "iPhone-11-pro.jpg",
    "thumbnail": "iPhone-11-pro-tn.jpg",
    "detail": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "createdAt": "2020-05-07T16:15:12.284Z",
    "updatedAt": "2020-05-07T16:15:12.284Z"
  },
  {
    "tags": [
      "lifestyle",
      "motor"
    ],
    "_id": "5e8ca710ebce9562e8cdcb81",
    "name": "Aston Martin DBS",
    "sell": true,
    "price": 225630.55,
    "photo": "aston-martin-dbs.jpg",
    "thumbnail": "aston-martin-dbs-tn.jpg",
    "detail": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "createdAt": "2020-05-07T16:15:12.284Z",
    "updatedAt": "2020-05-07T16:15:12.284Z"
  },
  {
    "tags": [
      "lifestyle",
      "work"
    ],
    "_id": "5e8ca710ebce9562e8cdcb82",
    "name": "MacBook Air",
    "sell": false,
    "price": 250.5,
    "photo": "apple-macbook-air.jpg",
    "thumbnail": "apple-macbook-air-tn.jpg",
    "detail": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "createdAt": "2020-05-07T16:15:12.284Z",
    "updatedAt": "2020-05-07T16:15:12.284Z"
  },
  {
    "tags": [
      "lifestyle",
      "work"
    ],
    "_id": "5e8ca710ebce9562e8cdcb83",
    "name": "TV Samsung 4K UHD",
    "sell": false,
    "price": 4250,
    "photo": "TV-Samsung-49NU7305.jpg",
    "thumbnail": "TV-Samsung-49NU7305-tn.jpg",
    "detail": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "createdAt": "2020-05-07T16:15:12.284Z",
    "updatedAt": "2020-05-07T16:15:12.284Z"
  }
]
```

#### - Filters for this method:

```shell
// This GET method optionally, through query string, allows the following data:
{
  [name]: String,
  [sell]: Boolean,
  [price]: Number,
  [tags]: [String],
  [limit]: number,
  [skip]: number,
  [fields]: (name, sell, price, photo, tags, detail),
  [sort]: (name, sell, price, photo, tags, detail),
}
```

**Posible Filters:**

- /api/v1/anuncios?**name=iPhone**
  > Starting word, non case-sensitive.
- /api/v1/anuncios?**sell=true**
  > Sell is equal to true (or false).
- /api/v1/anuncios?**price=50**
  > Price is equal to 200.
- /api/v1/anuncios?**price=1-5000**
  > Price range between 1 to 5000.
- /api/v1/anuncios?**price=200-**
  > Price is equal or greater than 200.
- /api/v1/anuncios?**price=-1000**
  > Price is equal or lower than 1000.
- /api/v1/anuncios?**tags=lifestyle,mobile,motor,work**
  > Tags splitted by "," or " ".
- /api/v1/anuncios?**skip=0**
  > Begins returning documents from 'anuncios' collection.
- /api/v1/anuncios?**limit=10**
  > Limit the results into 10.
- /api/v1/anuncios?**sort=name**
  > Sort ads by name (lower to greater). With the option "-name" (greater to lower).

<br />

**A complete example:**

```shell
http://localhost:3000/?skip=0&limit=5&sort=name&price=1-5000&tags=lifestyle
```
> Returns the first 5 documents, ordered by name, whose price is between 1 and 5000 and their tags are lifestyle.

<br />

**GET /api/v1/anuncios/:id** (http://localhost:3000/api/v1/anuncios/5e8ca710ebce9562e8cdcb80)
<br />
**Header: Authorization: token**

> Return an advertisement in JSON format.

#### - Data required in the headers:
```shell
GET > http://localhost:3000/api/v1/anuncios/5e8ca710ebce9562e8cdcb80

// In the Headers tab:
  - We will add the following KEY/VALUE that we want to use for that document:

  KEY             VALUE
  ---------------------
  Authorization   <tokenString>
```

#### - Result:
```shell
{
  "result": {
    "tags": [
      "lifestyle",
      "mobile"
    ],
    "_id": "5e8ca710ebce9562e8cdcb80",
    "name": "iPhone 11Pro",
    "sell": true,
    "price": 50,
    "photo": "iPhone-11-pro.jpg",
    "thumbnail": "bicicleta-rodars-1000W-tn.jpg",
    "detail": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "createdAt": "2020-05-07T16:15:12.284Z",
    "updatedAt": "2020-05-07T16:15:12.284Z"
  }
}
```

<br />

**POST /api/v1/anuncios** (http://localhost:3000/api/v1/anuncios)
<br />
**Header: Authorization: token**

> Insert an advertisement and return it in JSON format.
#### - Data required in the body and headers:
```shell
POST > http://localhost:3000/api/v1/anuncios

// In the Headers tab:
  - We will add the following KEY/VALUE that we want to use for that document:

  KEY             VALUE
  ---------------------
  Authorization   <tokenString>

// In the Body tab:
  - We will mark "form-data"
  - We will add the following KEY/VALUE that we want to insert for that document:

  (•) form-data
        KEY     TYPE    VALUE
        -----------------------
        name            Disco duro
        sell            false
        price           123.10
        photo   file    noDisponible.jpg
        tags            lifestyle
        detail          Compro Disco duro que esté en buen estado.
```
#### - Result:
```shell
{
  "result": {
    "tags": [
      "lifestyle"
    ],
    "_id": "5e9080d470f90f1ee8ade083",
    "name": "Disco duro",
    "sell": false,
    "price": 123.10,
    "photo": "noDisponible.jpg",
    "detail": "Compro Disco duro que esté en buen estado.",
    "createdAt": "2020-04-10T14:21:08.918Z",
    "updatedAt": "2020-04-10T14:21:08.918Z"
  }
}
```

<br />

**PUT /api/v1/anuncios/:id** (http://localhost:3000/api/v1/anuncios/5e9080d470f90f1ee8ade083)
<br />
**Header: Authorization: token**

> Update an advertisement and return it in JSON format.
#### - Data required in the body:
```shell
PUT > http://localhost:3000/api/v1/anuncios/5e9080d470f90f1ee8ade083

// In the Headers tab:
  - We will add the following KEY/VALUE that we want to use for that document:

  KEY             VALUE
  ---------------------
  Authorization   <tokenString>

// In the Body tab:
  - We will mark "form-data"
  - We can update any of the following KEY/VALUE for that document id:

  (•) form-data
        KEY     TYPE    VALUE
        -----------------------
        name            Disco duro
        sell            false
        price           123.10
        photo   file    noDisponible.jpg
        tags            lifestyle
        detail          Compro Disco duro que esté en buen estado.
```
#### - Result:
```shell
{
  "result": {
    "tags": [
      "lifestyle"
    ],
    "_id": "5e9080d470f90f1ee8ade083",
    "name": "Disco duro",
    "sell": true,
    "price": 123.10,
    "photo": "noDisponible.jpg",
    "detail": "Vendo Disco duro de 2TB (está en buen estado).",
    "createdAt": "2020-04-10T14:21:08.918Z",
    "updatedAt": "2020-04-10T17:02:28.273Z"
  }
}
```

<br />

**DELETE /api/v1/anuncios/:id** (http://localhost:3000/api/v1/anuncios/5e9080d470f90f1ee8ade083)
<br />
**Header: Authorization: token**

> Delete an advertisement.
#### - Data required in the body:
```shell
DELETE > http://localhost:3000/api/v1/anuncios/5e9080d470f90f1ee8ade083

// In the Headers tab:
  - We will add the following KEY/VALUE that we want to use for that document:

  KEY             VALUE
  ---------------------
  Authorization   <tokenString>

// In the Body tab:
  - We will not add any value.
```
#### - Result:
```shell
//Returns a Status 200 (Success OK).
```

<br />

**GET /api/v1/tags** (http://localhost:3000/api/v1/tags)

> Returns an array with the distinct tags from tags collection.

#### - Result:
```shell
[
  "lifestyle",
  "mobile",
  "motor",
  "work"
]
```
