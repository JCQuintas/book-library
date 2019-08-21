# Personal Library

This was a personal project to create a library. A previous company I worked on had a lot of books in digital formats that the employees could read, this was an attempt to coherently list all the books they had on a nicer interface than Amazon's S3. ;)

## Installing

You need to have `postgres` setup on your environment.

`npm install` should deal with all the other dependencies, while everything is install you can copy `./.env.example` into `./.env` and update the fields to your liking.

```bash
EXPRESS_PORT=8081

POSTGRES_PORT=5432
POSTGRES_USER='user'
POSTGRES_PASSWORD='password'
POSTGRES_DATABASE='book_library'
```

## Running

The project has a `frontend` and a `backend` service, to run you must run both `npm start` and `npm run server` scripts.

If you did everything right, you should see the initial interface without any book, now you can add them yourself.