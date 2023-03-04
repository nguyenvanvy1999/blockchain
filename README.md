# To run project

`npm i`

create file .env in : `src/environments/`

put data:

```
APP_NAME=OJT
APP_HOST=localhost
APP_PORT=3006
APP_ENV=development
APP_MODE=simple
APP_LANGUAGE=en
APP_TZ=Asia/Jakarta
APP_VERSIONING=true
APP_DEBUG=true
APP_HTTP_ON=true
APP_TASK_ON=true
APP_WEBSOCKET_ON=true
APP_MICROSERVICE_ON=false

SWAGGER_ENABLE=true
SWAGGER_WRITE=false
REDOC_ENABLE=true
ASYNC_API_ENABLE=true
REDOC_AUTH_ENABLE=true
REDOC_USERNAME=admin
REDOC_PASSWORD=password

AWS_S3_BUCKET=bucketName
AWS_S3_REGION=us-east-1
AWS_CREDENTIAL_KEY=key
AWS_CREDENTIAL_SECRET=key
AWS_SESSION_TOKEN=token

JWT_SECRET=StrongSecret123!
JWT_EXPIRES_IN=1h
JWT_NOT_BEFORE_EXPIRES_IN=30d


```

then run
`npm start` or `npm start:dev` with hot reload

Swagger running  : <http://127.0.0.1:3006/swagger/common>
