## Collections

### 1. <b>User Collection</b>

-   <b>reputation</b> field is (vote-up and vote-down from you owns question and answer) or (your answer is solved other question and confirmed by question owner).
-   <b>answered</b> field is (when you are making answer in other question <u>will +1 answered</u>).
-   <b>solved</b> field is (when you are confirmed the answer by question owner <u>will +1 solved</u>).

#### Schema

```js
{
      _id: String,
      username: String,
      password: String,
      name: String,
      email: String,
      birthDay: Date,
      image: String,
      bio: String,
      reputation: Number,
      tags: Tag[],
      answered: Number,
      solved: Number,
      createdAt: Date,
      updatedAt: Date,
}
```

#### Example

```json
  {
      "_id": "ObjectId(63ec5a42ae5dba49b35b6e0d)",
      "username": "helloworld123",
      "password": "$2b$10$uCrlLAWRw7Y.I1547.5frOiKwdV95YUdKAk1gVysUDogD.hCohp1a",
      "email": "helloworld@gmail.com",
      "birthday": "2023-02-15T05:09:24.216Z",
      "image": "",
      "bio": "Hello everyone my name is Hello nice to meet you",
      "reputation": 0,
      "tags": "Tag"[],
      "answered": 0,
      "solved": 0,
      "createdAt": "2023-02-15T05:19:27.355Z",
      "updatedAt": "2023-02-15T05:19:27.355Z"
  }
```

### 2. <b>Question Collection</b>

-   <b>body</b> field must be array of string because type of object doesn't match.
-   <b>viewed</b> field is (when every user or guest clicked in post <u>will be +1 viewed</u>).
-   <b>participant</b> field us (when someone interact with the question likes answer reply vote-up vote-down solve-confirmed to the question or the answer <u>will +1 participant</u>).
-   <b>rating</b> field is (when the question receive vote-up <u>will +1 rating</u>) or (when the question receive vote-down <u>will -1 rating</u>).
-   <b>solvedBy</b> field is answer's ObjectId.

#### Schema

```js
{
      _id: String,
      createdBy: String,
      title: String,
      description: String,
      body: String[],
      viewed: Number,
      participant: Number,
      rating: Number,
      answered: Number
      likedBy: String[],
      dislikedBy: String[],
      solvedBy: String,
      createdAt: Date,
      updatedAt: Date,
      tags: Tag[]
}
```

#### Example

```json
{
      "_id": "ObjectId(63ec5a42ae5dba49b343gd4d)",
      "createdBy": "ObjectId(63ec5a42ae5dba49b35b6e0d)",
      "title": "How to link CSS file with HTML file",
      "description": "Please tell me what am I do wrong or missing in my code"
      "body": [
              "{\"type\":\"header\",\"msg\":\"This is my HTML code\"}",
              "{\"type\":\"paragraph\",\"msg\":\"I do link it with the CSS file already why it not working\"}",
              "{\"type\":\"image\",\"path\":\"../../uploads/html-picture-2023-02-15T09:23:37.594Z.jpg\"}",
              "{\"type\":\"code\",\"code\":\"\\n        <!DOCTYPE html>\\n        <html lang=\\"en\\">\\n            <head>\\n                <meta charset=\\"UTF-8\\" />\\n                <meta http-equiv=\\"X-UA-Compatible\\" content=\\"IE=edge\\" />\\n                <meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1.0\\" />\\n                <link rel=\\"stylesheet\\" href=\\"../style.css\\" />\\n                <title>Document</title>\\n            </head>\\n            <body>\\n                <script src=\\"index.js\\"></script>\\n            </body>\\n        </html>\",\"language\":\"html\"}",
              ],
      "viewed": 0,
      "participant": 0,
      "rating": 0,
      "likedBy": [
              "ObjectId(63ec5a42ae5dba49bcap4fv)",
              "ObjectId(63ec5a42ae5dba49bd234bd)",
              "ObjectId(63ec5a42ae5dba49b343gd4d)"
              ],
      "dislikedBy": [
              "ObjectId(63ec5a42ae5dba49bcap4sz)",
              "ObjectId(63ec5a42ae5dba49bd23412)",
              "ObjectId(63ec5a42ae5dba49b343gd1a)"
              ],
      "solvedBy": "ObjectId(63ec5a42ae5dba49b343gd4d)",
      "createdAt": "2023-02-15T09:40:08.111Z",
      "updatedAt": "2023-02-15T09:40:08.111Z",
      "tags": Tag[]
}
```

### 3. <b>Answer Collection</b>

-   <b>answeredIn</b> field is the ObjectId of the question thats where the answer is.
-   <b>answeredBy</b> field is the ObjectId of user who is created the answer.
-   <b>body</b> field must be array of string because type of object doesn't match.
-   <b>rating</b> field is (when other user vote-up <u>will +1 rating</u>) or (when other user vote-down <u>will -1 rating</u>).

#### Schema

```js
{
      _id: String,
      answeredBy: String,
      answeredIn: String,
      title: String,
      description: String,
      body: String[],
      likedBy: String[],
      dislikedBy: String[],
      rating: Number,
      replies: Reply[],
      isSolve: Boolean,
      createdAt: Date,
      updatedAt: Date,
}
```

#### Example

```json
{
      "_id": "ObjectId(63ec5a42ae5dba49b343dcx4)",
      "answeredBy": "ObjectId(63ec5a42ae5dba49b35b6e0d)",
      "answeredIn": "ObjectId(63ec5a42ae5dba49b343gd4d)",
      "title": "Maybe this should help you",
      "description": "You should try this I hope it would help you :)"
      "body": [
        '{"type":"header","msg":"Here is the answer of the this question"}',
        '{"type":"paragraph","msg":"Maybe your reference path is wrong or you can try this instead"}',
        '{"type":"code","code":"\\n        <!DOCTYPE html>\\n        <html lang=\\"en\\">\\n            <head>\\n                <meta charset=\\"UTF-8\\" />\\n                <meta http-equiv=\\"X-UA-Compatible\\" content=\\"IE=edge\\" />\\n                <meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1.0\\" />\\n                <link rel=\\"stylesheet\\" href=\\"./style.css\\" />\\n                <title>Document</title>\\n            </head>\\n            <body>\\n                <script src=\\"index.js\\"></script>\\n            </body>\\n        </html>","language":"html"}',
        '{"type":"image","path":"../../uploads/smile-picture-2023-02-15T09:50:27.594Z.jpg"}',
              ],
      "likedBy": [
              "ObjectId(63ec5a42ae5dba49bcap4fv)",
              "ObjectId("63ec5a42ae5dba49bd234bd)",
              "ObjectId("63ec5a42ae5dba49b343gd4d)"
              ],
      "dislikedBy": [
              "ObjectId(63ec5a42ae5dba49bcap4sz)",
              "ObjectId(63ec5a42ae5dba49bd23412)",
              "ObjectId(63ec5a42ae5dba49b343gd1a)"
              ],
      "rating": 0,
      "replies": Reply[],
      "isSolved": true,
      "createdAt": "2023-02-15T09:50:27.594Z",
      "updatedAt": "2023-02-15T09:50:27.594Z"
}
```

### 4. <b>Reply Collection</b>

-   <b>repliedBy</b> field is the ObjectId who is created reply.

#### Schema

```js
{
      _id: String,
      repliedBy: String,
      message: String,
      createdAt: Date,
      updatedAt: Date
}
```

#### Example

```json
{
	"_id": "ObjectId(63ec5a42ae5dba49b3412svy)",
	"repliedBy": "ObjectId(63ec5a42ae5dba49b33dz2fg)",
	"message": "Wow this is very nice!",
	"createdAt": "2023-02-15T10:55:45.116Z",
	"updatedAt": "2023-02-15T10:55:45.116Z"
}
```

### 5. <b>Tag Collection</b>

-   <b>questions</b> field is array of questions's ObjectId that is using this tag.
-   <b>interestedBy</b> field is array of users's ObjectId that is interesting this tag.

#### Schema

```js
{
      _id: String,
      name: String,
      questions: String[],
      interestedBy: String[],
      createdAt: Date,
      updatedAt: Date
}
```

#### Example

```json
{
      "_id": ObjectId("63ec5a42ae5dba4au5x12svy"),
      "name": "html",
      "questions": [
              "ObjectId(63ec5a42ae5dba49bcbr0dz)",
              "ObjectId(63ec5a42ae5dba49bd23fxq)",
              "ObjectId(63ec5a42ae5dba49b343ak6a)"
              ],
      "interestedBy": [
              "ObjectId(63ec5a42ae5dba49bcbra5z)",
              "ObjectId(63ec5a42ae5dba49bd23m9q)",
              "ObjectId(63ec5a42ae5dba49b3431w6a)"
              ],
      "createdAt": "2023-02-15T10:55:45.116Z",
      "updatedAt": "2023-02-15T10:55:45.116Z"
}
```

### 6. <b>Notification Collection</b>

-   <b>isRead</b> field is a status that shows whether the user has read or not.
-   <b>to</b> field is the question owner ObjectId.
-   <b>fromUserId</b> field is the answer owner ObjectId (return username and image).
-   <b>message</b> field is the title of answer (return title of the answer).

#### Schema

```js
{
      _id: String,
      isRead: Boolean,
      message: string,
      question: Question,
      to: String,
      fromUserId: String,
      createdAt: Date,
      updatedAt: Date
}
```

#### Example

```json
{
      "_id": "ObjectId(63ec5a42ae5dba49b34bs46a)",
      "isRead": false,
      "message": Answer,
      "question": Question,
      "to": "ObjectId(63ec5a42ae5dba49b35b6e0d)",
      "from": "ObjectId(63ec5a42ae5dba49b35b62cs)",
      "createdAt": "2023-02-15T11:21:33.483Z",
      "updatedAt": "2023-02-15T11:21:33.483Z"
}
```

###User Route -> "/users"

1. <b>Sign-up</b>
   1.1. Create new user in collection
   1.2. Encrypt user password and generate user token
   1.3. Return <u>user details</u> and <u>token </u>

-   Route: "/users/signup"
-   Method: POST
-   Content-type: JSON
-   Request:

```json
{
	"username": "helloworld123",
	"name": "helloo",
	"password": "a123456789A",
	"email": "helloworld@gmail.com",
	"birthday": "2023-02-15T05:09:24.216Z",
	"bio": "Hello everyone my name is Hello nice to meet you"
}
```

-   Response:

```json
"User": {
    "_id": "ObjectId(63ec5a42ae5dba49b35b6e0d)",
    "username": "helloworld123",
    "email": "helloworld@gmail.com",
    "birthday": "2023-02-15T05:09:24.216Z",
    "image": "",
    "bio": "Hello everyone my name is Hello nice to meet you",
    "reputation": 0,
    "tags": [],
    "answered": 0,
    "solved": 0,
}
"token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RvcnRhZXRva3Rhay5jb20iLCJpYXQiOm51bGwsImV4cCI6bnVsbCwiYXVkIjoiIiwic3ViIjoi4LmA4LiV4Liy4Liw4LmB4LiV4Liw4LiV4LmK4Lit4LiB4LmB4LiV4LmK4LiBIn0.WM9PJJGmHxjivWOEy2ZfFnC0DR248HBPpv1tjvIUHjg"
```

2. <b>Login</b>
   1.1. Compis user credentials with data in database
   1.2. Generate user token
   1.3. Fetch popular questions from user interested tags
   1.4. Fetch other users from user interested tags
   1.5. Return <u>popular questions</u> <u>other users</u> <u>token</u> and <u>user details</u>

-   Route: "/users/login"
-   Method: POST
-   Content-type: JSON
-   Request:

```json
{
	"username": "helloworld123",
	"password": "a123456789A"
}
```

-   Response:

```json
"User": {
    "_id": "ObjectId(63ec5a42ae5dba49b35b6e0d)",
    "username": "helloworld123",
    "email": "helloworld@gmail.com",
    "birthday": "2023-02-15T05:09:24.216Z",
    "image": "",
    "bio": "Hello everyone my name is Hello nice to meet you",
    "reputation": 0,
    "tags": [],
    "answered": 0,
    "solved": 0,
}
"token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RvcnRhZXRva3Rhay5jb20iLCJpYXQiOm51bGwsImV4cCI6bnVsbCwiYXVkIjoiIiwic3ViIjoi4LmA4LiV4Liy4Liw4LmB4LiV4Liw4LiV4LmK4Lit4LiB4LmB4LiV4LmK4LiBIn0.WM9PJJGmHxjivWOEy2ZfFnC0DR248HBPpv1tjvIUHjg"
```

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

-   Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
-   Website - [https://nestjs.com](https://nestjs.com/)
-   Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE). -->
