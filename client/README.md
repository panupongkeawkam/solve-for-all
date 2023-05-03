## Get Started
1. Go to `client` directory
```
cd client
```
2. To get start an app install all package dependencies in follow command
```
npm install
```
3. Set your `.env` file in root `client` in follow environment variable
```properties
# Server host and port relate to "server" directory (e.g. http://localhost:3000)
SERVER_HOST=<server-host>
# Your server port relate to "server" directory
SERVER_PORT=<server-port>
# Your frontend running port
PORT=<client-port>
```
4. Then start server at port you setup before
```
npm run start
```
5. Open your frontend domain for start using frontend app

## Build & Run Docker
1. If you currently in `client` directory, run a follow command to build Docker image
```sh
docker build -t panupongkeawkam/solveforall-client .
```
or with `docker compose`
```sh
docker compose build
```
2. Run container with built image before
```sh
docker run -d -p 80:80 --name solveforall-client-container panupongkeawkam/solveforall-client
```
or with `docker compose`
```sh
docker compose up -d
```

## Documentation
[UI Mockup](https://www.figma.com/proto/bklW3UMpjuzwrTmk6V07PC/Solve-For-All?node-id=203%3A398&starting-point-node-id=203%3A398) high fidelity in Figma with prototyping
