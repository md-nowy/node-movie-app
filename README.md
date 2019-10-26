# node-movie-app

## Installation

### Prerequisites

Following tools have to be installed on local machine:

1. Node v.10(LTS) and npm
1. Local MongoDB Server v.4.2.0

### Steps

1. Clone repository to local machine
1. Open terminal and:
    1. Start local MongoDB
    1. Navigate to repository root folder
    1. Create `dev.env` under `./config` folder and assign proper values to environment variables
    1. Type command: `npm i` to install all dependencies
    1. Type command: `npm run dev` to run app locally
1. Call endpoints at `http://localhost:3000`

## Docker

Alternatively you can run application with MongoDB in containerized way.

### Prerequisites

1. Docker and docker-compose have to be installed

### Steps
1. Open terminal and:
    1. Navigate to cloned repository root folder
    1. Set an environment variable `OMDB_API_KEY` with proper value
    1. run command `docker-compose up`
1. Call endpoints at `http://localhost:8080`

## Tests

Automated tests can be triggered as a part of development process in following scenarios:
* in watcher mode - tests are triggered automatically when saving a file - by running command `npm test`
* as a pre-commit hook - tests are triggered automatically before commiting changes, which also prints well-structured test report (alternatively you can run command `pre-commit-test`)
