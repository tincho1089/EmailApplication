# Email Application

## Application Demo
The purpose of this project is to be able to build a POC application that pretends to be an email application. It contains user authentication with JWT token management. And the architecture features React on the client side and Nest on the server side. MongoDB is used as the database and Websocket is used to manage notifications in real time for the arrival of new emails.

![Docker Services](/images/demo.gif?raw=true "Docker Services")


## Local execution with Docker
 The command will build the API developed in Nest JS, will create a MongoDB instance and will build the frontend project developed in React JS with Vite.
`docker-compose stop && docker-compose up --build -d --remove-orphans`

![Docker Services](/images/docker.png?raw=true "Docker Services")

This is the final result of the services that you should see if everything works as expected.

## Application access
To be able to see all the endpoints and structures we are using Swagger. The endpoints documentation can be accessed by `http://localhost:3000/docs`

If the project was build successfully, we should see this screen from the previous link:

![endpoint docs](/images/docs.png?raw=true "endpoint docs")

## Database Access
To MongoDB database can be accessed through the extension MongoDB for VScode:

![db extension](/images/mongoextension.png?raw=true "db extension")

The connection string should be for this case `mongodb://localhost:27017/`. After we stablish the connection, we should have access to the database:

![db access](/images/mongodb.png?raw=true "db access")


## Testing
To execute the E2E tests locally for the backend endpoints, we need to install the libraries dependencies for the service with `npm i`. After that we can run the command:
`npm run test:e2e`

NOTE: The MongoDB istance has to be running in Docker. The tests will use it.

If everything ends up successfully we should be able to see the following results:

![tests](/images/tests.png?raw=true "tests")

To perform the frontend tests through Vitest and Testing Library, we should execute `npm run test`

![tests](/images/testfront.png?raw=true "tests")

NOTE: MongoDB service is not required here. The responses are mocked.