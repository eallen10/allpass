# Allpass

Allpass is an open-source web app platform that allows multiple users to store and manage their passwords. All passwords are encrypted before they are sent to the backend using AES-256 and a master password.

#### Get the code: [https://github.com/eallen10/allpass](https://github.com/eallen10/allpass)

## Getting Started

* Clone the repo!
* Configure your reverse proxy to route connections to the front and back end, respectively
* Generate your own private HMAC keys as jwtSecret.key and newUserJwtSecret.key to be used for JWT signing and store in the resources directory
* Install docker and run a Cassandra container with a keyspace named "allpass" 

### Prerequisites

Java, Gradle, npm, Node.js, Nginx (optional)

## Built With

* [Nginx](https://www.nginx.com/) - Reverse Proxy, Web Server 
* [Gradle](https://gradle.org/) - Dependency Management, Deployment
* [NPM](https://www.npmjs.com/) - Package Manager
* [Docker](https://www.docker.com/) - Database Containerization
* [Cassandra](http://cassandra.apache.org/) - Database

## Contributing

Submit a PR and I'll see whatsup

## Authors

* **Ethan Allen** - *Initial work* - [eallen10](https://github.com/eallen10)

## Acknowledgments

* To all of the brilliant, knowledgeable (and somewhat pretentious :p) developers at StackOverflow
* My first developer job
