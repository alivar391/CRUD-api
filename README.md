# CRUD-api

##Description

This is a simple CRUD API using in-memory database underneath.

##Installation

To use it you should

- Clone this repository.
- go to **develop** branch
- install dependencies with **npm install** command

##Endpoints

1. Implemented endpoint `api/users`:
   - **GET** `api/users` is used to get all users
     - Server answer with `status code` **200** and all users records
   - **GET** `api/users/${userId}`
     - Server answer with `status code` **200** and and record with `id === userId` if it exists
     - Server answer with `status code` **400** with message `"UserId Not uuidv4"` if `userId` is invalid (not `uuid`)
     - Server answer with `status code` **404** with message `"User Not Found"` if record with `id === userId` doesn't exist
   - **POST** `api/users` is used to create record about new user and store it in database.

     - Server answer with `status code` **201** and newly created record
     - Server answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields

   - **PUT** `api/users/{userId}` is used to update existing user
     **For correct request you should send object with <i>all fields with correct data</i>, if you send unnecessary fields, they will be ignored**
     <br>
     - Server answer with` status code` **200** and updated record
     - Server answer with` status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
     - Server answer with` status code` **404** and corresponding message if record with `id === userId` doesn't exist
   - **DELETE** `api/users/${userId}` is used to delete existing user from database
     - Server answer with `status code` **204** if the record is found and deleted
     - Server answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
     - Server answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist

<br>
##Scripts

To run Development mode: you should use **npm run start:dev**
To run Production mode: you should use **npm run start:prod**
To run tests: you should use **npm test**

##Using

- In your requests you should use `Content-type: application/json`
- Users are stored as `objects` that have following properties:
  - `id` — unique identifier (`string`, `uuid`) generated on server side
  - `username` — user's name (`string`, **required**)
  - `age` — user's age (`number`, **required**)
  - `hobbies` — user's hobbies (`array` of `strings` or empty `array`, **required**)
- Requests to non-existing endpoints (e.g. `some-non/existing/resource`) are handled (server answer with `status code` **404** with message `"Route not found"`)
