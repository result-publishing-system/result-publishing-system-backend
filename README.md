
# Result Publishing System Backend

The Result Publishing System has been developed to override the problems prevailing in the current manual system. This web application is supported to eliminate and in some cases reduce the hardships faced by this existing system. Moreover this system is designed for the particular need of the college to carry out operations in a smooth and effective manner.


## Architecture

![Architecture](https://user-images.githubusercontent.com/52713567/167289877-e0fa5276-44fa-4d4b-87bf-84a2717bb90c.png)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`URI` -> MongoDB connecting string

`JWT_SECRET` -> can enter any generated string

`CLIENT` -> The client URL that you want to allow to interact with the API

## Standard Installation

#### 1. Installing dependencies 
Before building cryptostat you must install the following dependencies on your machine.

1. [NodeJS](https://nodejs.dev/) 
2. [NPM](https://www.npmjs.com/)

#### 2. Clone this repo to your local machine
``` bash
    git clone https://github.com/result-publishing-system/result-publishing-system-backend.git
    cd result-publishing-system-backend
    npm install
```

#### 3. Start the server using  the below command.
``` bash
    npm run start
```

## Docker

Docker downloads a lot of large images. If you are short on storage then please consider using standard procedure for Installation

#### 1. Install Docker (https://docs.docker.com/get-docker/)

#### 2. Add the environment variables to .env file as listed above

#### 3. Build the docker image that will support `result-publishing-system-backend`
``` bash
    docker compose build
```

#### 4. Start the docker container. This will start the server
``` bash
    docker compose up
```

#### 5. To stop the docker container, you can use this command
``` bash
    docker compose down
```
