module.exports={
    MONGO_DATABASE_URL : 'mongodb+srv://admin:admin@cluster0.taw1soo.mongodb.net/',
    JWT_SECRET_KEY :"offeringsSecret",
    PORT:process.env.PORT||3000,
    TOKEN_EXPIRATION: '1h',

    ERROR_MESSAGES: {
        USERNAME_EXISTS: 'Username already exists',
        USER_EMAIL_EXISTS:'Email already exists',
        USER_NOT_FOUND: 'User not found',
        INVALID_CREDENTIALS: 'Invalid credentials',
        INTERNAL_SERVER_ERROR: 'Internal Server Error',
        AUTHENTICATION_FAILED: 'Authentication failed',
        INVALID_TOKEN:'Invalid token'
      },
    
      SUCCESS_MESSAGES: {
        USER_CREATED: 'User created successfully',
        USER_UPDATED: 'User updated successfully',
      },
    
      // HTTP status codes
      STATUS_CODES: {
        OK: 200,
        CREATED: 201,
        NOT_FOUND: 404,
        UNAUTHORIZED: 401,
        INTERNAL_SERVER_ERROR: 500,
      },
}