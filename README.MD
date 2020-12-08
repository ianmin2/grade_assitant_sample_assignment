# Sample grade assistant assignment

Once you've clone dthe repository, navigate to it and on the comand line run
> `npm install`

then

> `npm run start`

**On the first run**, you need to define some configuration files, the CLI will guide you on this.

### The database schema can be found in the folder *`db > schema`*  (there are sample SQL schemas provided for [**mySQL**](db/schema/mysql_sample.sql), [**postgres**](db/schema/postgresql_sample.sql) and [**SQLServer**](db/schema/sql_server_sample.sql) )

----
----

### `Note! [Dependency alert]` 
**The Node.js runtime environment has to be installed on your system prior to running this example** you can download and install hit from [here](https://nodejs.org) (https://nodejs.org)

----
----

### `Assignment Definition`
> A sample real world proof of concept Assignment.

The functionality of the developed grading assistant is tested with a basic configuration matching the below criteria.

Develop an application that :
___
1. Allows a person to register as a user at the route **/users/register** using the **POST HTTP** method accepting **application/json** input with the parameters **{username, password, name}** (all of which are required) and returning a 201 status code (in the case that a user is successfully created). A username should be unique.
___

        A. A 400 status code with a Text.HTML MIME type is returned in the case where not all the required parameters are provided.
___

        B. An attempt to re-register a username that’s already taken should throw an error as in [1.A] above.
___
___     
2. Allows a user to login at /users/login using the POST HTTP method accepting  **application/json** input bearing the parameters {username,password} . This should
___
        a).  (on a successful login attempt) give a 200  HTTP status code response as **application/json** in the format {token} where ‘token’ is a JWT access Token to be used for authentication and authorization in the subsequent requests.  
___
        b). on a failed login attempt (e.g in the case of invalid credentials provided or where not all required fields are provided for authentication) return a 401 HTTP status code with a response message of your choice.

______
___

3.  Using the access token returned as {token} in (2) above added to the HTTP ‘authorization’ header as a ‘Bearer’ token facilitates:

    
A. Fetching a list of services from the /services  application route using the HTTP GET method that: 
___
         I. Where a user access token is valid, returns a 200 HTTP status code with a response as an array/List  in **application/json** format bearing the various records as objects bearing the parameters 
               {  
                   service_id as integer, 
                   service_name as string, 
                   service_fee as integer,
                   service_code as string, 
                   service_added as datetime, 
                   service_active as boolean
               }
___     
        II. Denies access to requests made using an invalid, missing or expired access token and returns a 401 HTTP status code with a non-[Array/List] body response.
           
B. The creation of a service record at the /services application route using the HTTP POST  method that: 

        I. Inserts a database record for a service  given the data below as **application/json**
            `{
                service_name as string, 
                service_fee as integer,
                service_code as string, 
                service_active as boolean
            }`
           while facilitating the generation of the service_id and service_added fields during storage and returns a 201 HTTP status code.
___ 
        II. Returns a 400  HTTP status code in case an invalid addition request is attempted (e.g missing parameters or an attempted duplicate record) with a non-[Array/List] body response of choice.
___
        III. Denies access to requests made using an invalid, missing or expired access token and returns a 401 HTTP status code with a non-[Array/List] body response.
        
C. The editing of a service record at the /services/{service_id} application route using the HTTP PUT method (where the {service_id}  in the route above stands for the service_id  added/generated at [B.I] above and shown in the  service structure/format specification in [A.I] above ) that:

        I. Updates a service object by accepting the same parameters shown in [B.I] above as **application/json** and returns a 200 status code where an object has been successfully updated
___
        II. Returns a 404 HTTP status code where a given {service_id} is not found in the given records. The return body should not be an Array/List type.
___
        III. Denies access to requests made using an invalid, missing or expired access token and returns a 401 HTTP status code with a non-[Array/List] body response.


D. The deletion of a service record at the /services/{service_id} application route via the HTTP DELETE method (where {service_id}  is as described in [C] above) that:
       
        I. Removes a service object matching the given {service_id} and returns a 200 HTTP status code upon completion.
___
        II. Returns a 404 status code where a status code that is not in the database/records is specified as the {service_id} .
___
        III. Denies access to requests made using an invalid, missing or expired access token and returns a 401 HTTP status code with a non-[Array/List] body response.


   

Note: The non-[Array/List] return specification for the above demonstration (where specific response status codes are required) is given to ensure that the application being tested does not merely alter the status code and then display the data to the user. It is not to be confused as a requirement by the grading tool.

___

### `Insomnia Environment Export `

[Download Insomnia REST Client to manualy verify application functionality ](https://insomnia.rest/download/core/?&ref=)
> You can get the insomnia environment [here](./insomnia_client__export.json)