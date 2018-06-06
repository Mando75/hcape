# HCAPE
## API Docs
**Currently still in developement**
[API Docs](https://app.swaggerhub.com/apis/Mando75/hcape/1.0.0-oas3)
## Enviromental Variables
The following are the environmental variables
needed to run the server application

* DATABASE_URL
    
    The connection string for the MongoDB server in use
* TOKEN_SECRET

    The authentication token secret used to sign auth_tokens
    issued by the application
* QUALTRICS_AUTH_TOKEN

    The authentication token needed to access the Qualtrics API
* QUALTRICS_DOMAIN

    The base Qualtrics domain for Qualtrics API requests. 
    This should include up to the API Version
* AUTH_TOKEN_LIFESPAN
    
    The lifespan of an authentication token issued by the web service
    
* MASTER_SURVEY

    The survey_id of the master template survey which all new surveys will be copied from    