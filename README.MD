# Sample grade assistant assignment


### `Assignment Definition`
> A sample real world Assignment.

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

[Download Insomnia Client to manualy verify application functionality ](https://insomnia.rest/download/core/?&ref=)
> {"_type":"export","__export_format":4,"__export_date":"2020-10-18T22:03:24.963Z","__export_source":"insomnia.desktop.app:v2020.4.1","resources":[{"_id":"req_b14c0f3ca3e14d50ba1ef1d42b7f8868","parentId":"fld_f6bcf71db81843e4b82c2b8d4bc5f7e4","modified":1603058148167,"created":1603042909237,"url":"{{ sample.url }}/users/register","name":"/users/register","description":"","method":"POST","body":{"mimeType":"**application/json**","text":"{\n\t\"username\" : \"ianmin21\",\n\t\"password\" : \"ianmin2\",\n\t\"name\" : \"Ian Kamau\"\n}"},"parameters":[],"headers":[{"name":"Content-Type","value":"**application/json**","id":"pair_37172112883a4355a2b5b3175793c5d7"}],"authentication":{},"metaSortKey":-1603045322632,"isPrivate":false,"settingStoreCookies":true,"settingSendCookies":true,"settingDisableRenderRequestBody":false,"settingEncodeUrl":true,"settingRebuildPath":true,"settingFollowRedirects":"global","_type":"request"},{"_id":"fld_f6bcf71db81843e4b82c2b8d4bc5f7e4","parentId":"fld_7f0c15bc09f1472491e61fba9c934c4e","modified":1603045282594,"created":1603045282594,"name":"USERS","description":"","environment":{},"environmentPropertyOrder":null,"metaSortKey":-1603045282594,"_type":"request_group"},{"_id":"fld_7f0c15bc09f1472491e61fba9c934c4e","parentId":"fld_fc0846d488184b35ac09c105bf8c3085","modified":1603042870202,"created":1603042870202,"name":"Sample Assignment","description":"","environment":{},"environmentPropertyOrder":null,"metaSortKey":-1603042870202,"_type":"request_group"},{"_id":"fld_fc0846d488184b35ac09c105bf8c3085","parentId":"wrk_180f0a46661741e9bee4d0f75877001e","modified":1601816673242,"created":1601816673242,"name":"Dissertation","description":"","environment":{},"environmentPropertyOrder":null,"metaSortKey":-1601816673242,"_type":"request_group"},{"_id":"wrk_180f0a46661741e9bee4d0f75877001e","parentId":null,"modified":1601816601862,"created":1601816601862,"name":"Insomnia","description":"","scope":null,"_type":"workspace"},{"_id":"req_eebebbfefd3148e39ce0572891f5bf14","parentId":"fld_f6bcf71db81843e4b82c2b8d4bc5f7e4","modified":1603045331135,"created":1603044486402,"url":"{{ sample.url }}/users/login","name":"/users/Login","description":"","method":"POST","body":{"mimeType":"**application/json**","text":"{\n\t\"username\" : \"ianmin2\",\n\t\"password\" : \"ianmin2\"\n}"},"parameters":[],"headers":[{"name":"Content-Type","value":"**application/json**","id":"pair_37172112883a4355a2b5b3175793c5d7"}],"authentication":{},"metaSortKey":-1603045322582,"isPrivate":false,"settingStoreCookies":true,"settingSendCookies":true,"settingDisableRenderRequestBody":false,"settingEncodeUrl":true,"settingRebuildPath":true,"settingFollowRedirects":"global","_type":"request"},{"_id":"req_9c758f6aeed246f6b89d97f0920fc365","parentId":"fld_f95df607040747c3812eff5a0a6f54a2","modified":1603058118523,"created":1603045418574,"url":"{{ sample.url }}/services","name":"Fetch Services","description":"","method":"GET","body":{"mimeType":"**application/json**","text":"{\n\t\"username\" : \"ianmin2\",\n\t\"password\" : \"ianmin2\",\n\t\"name\" : \"Ian Kamau\"\n}"},"parameters":[],"headers":[{"name":"Content-Type","value":"**application/json**","id":"pair_37172112883a4355a2b5b3175793c5d7"}],"authentication":{"type":"bearer","token":"{{ sample.acessToken }}","prefix":"","disabled":false},"metaSortKey":-1603045322632,"isPrivate":false,"settingStoreCookies":true,"settingSendCookies":true,"settingDisableRenderRequestBody":false,"settingEncodeUrl":true,"settingRebuildPath":true,"settingFollowRedirects":"global","_type":"request"},{"_id":"fld_f95df607040747c3812eff5a0a6f54a2","parentId":"fld_7f0c15bc09f1472491e61fba9c934c4e","modified":1603045351137,"created":1603045351138,"name":"SERVICES","description":"","environment":{},"environmentPropertyOrder":null,"metaSortKey":-1603044076398,"_type":"request_group"},{"_id":"req_e710853832cb4cf584fb80fdd751d2ee","parentId":"fld_f95df607040747c3812eff5a0a6f54a2","modified":1603052161823,"created":1603045351150,"url":"{{ sample.url }}/services","name":"Add service","description":"","method":"POST","body":{"mimeType":"**application/json**","text":"{           \n\t\"service_name\" : \"my service\", \n  \"service_fee\" : 1000,\n  \"service_code\" : \"SRV1\", \n  \"service_active\" : true\n}"},"parameters":[],"headers":[{"name":"Content-Type","value":"**application/json**","id":"pair_37172112883a4355a2b5b3175793c5d7"}],"authentication":{"type":"bearer","token":"{{ sample.acessToken }}"},"metaSortKey":-1603045322582,"isPrivate":false,"settingStoreCookies":true,"settingSendCookies":true,"settingDisableRenderRequestBody":false,"settingEncodeUrl":true,"settingRebuildPath":true,"settingFollowRedirects":"global","_type":"request"},{"_id":"req_64a26fe52da24cbfb09e4beb73cba6d3","parentId":"fld_f95df607040747c3812eff5a0a6f54a2","modified":1603058064196,"created":1603055091997,"url":"{{ sample.url }}/services/{{ sample.service_id }}","name":"Fetch Specific Service","description":"","method":"GET","body":{},"parameters":[],"headers":[],"authentication":{"type":"bearer","token":"{{ sample.acessToken }}"},"metaSortKey":-1603045322569.5,"isPrivate":false,"settingStoreCookies":true,"settingSendCookies":true,"settingDisableRenderRequestBody":false,"settingEncodeUrl":true,"settingRebuildPath":true,"settingFollowRedirects":"global","_type":"request"},{"_id":"req_2a2d0d23b1c64897b1f8dba74d645f2b","parentId":"fld_f95df607040747c3812eff5a0a6f54a2","modified":1603058036352,"created":1603045351141,"url":"{{ sample.url }}/services/{{ sample.service_id }}","name":"Edit Service","description":"","method":"PUT","body":{"mimeType":"**application/json**","text":"{           \n\t\"service_name\" : \"SERVICEPI\", \n  \"service_fee\" : 1000,\n  \"service_code\" : \"SRV1\", \n  \"service_active\" : true\n}"},"parameters":[],"headers":[{"name":"Content-Type","value":"**application/json**","id":"pair_37172112883a4355a2b5b3175793c5d7"}],"authentication":{"type":"bearer","token":"{{ sample.acessToken }}"},"metaSortKey":-1603045322557,"isPrivate":false,"settingStoreCookies":true,"settingSendCookies":true,"settingDisableRenderRequestBody":false,"settingEncodeUrl":true,"settingRebuildPath":true,"settingFollowRedirects":"global","_type":"request"},{"_id":"req_4ab0b66ecf56479ca02c01a05e976694","parentId":"fld_f95df607040747c3812eff5a0a6f54a2","modified":1603058046102,"created":1603045434799,"url":"{{ sample.url }}/services/{{ sample.service_id }}","name":"Delete Service","description":"","method":"DELETE","body":{},"parameters":[],"headers":[],"authentication":{"type":"bearer","token":"{{ sample.acessToken }}"},"metaSortKey":-1603045322507,"isPrivate":false,"settingStoreCookies":true,"settingSendCookies":true,"settingDisableRenderRequestBody":false,"settingEncodeUrl":true,"settingRebuildPath":true,"settingFollowRedirects":"global","_type":"request"},{"_id":"req_152693e934ef4da7bb4f7fb844e0b9e1","parentId":"fld_6cc5aaaa50c440b1902d528d0ad7cf10","modified":1601818152745,"created":1601816865597,"url":"{{ url }}","name":"Count Assignments","description":"","method":"GET","body":{},"parameters":[{"name":"command","value":"count","description":"","id":"pair_84aabc35d1bb4f7db85d911b93d59910"},{"name":"table","value":"attempts","description":"","id":"pair_c1dbaeef2dcb456fbfdcc6a95e8d4a01"},{"name":"","value":"","description":"","id":"pair_e981791f13d44b9e832e89ab223405c3"}],"headers":[],"authentication":{},"metaSortKey":-1601816865597,"isPrivate":false,"settingStoreCookies":true,"settingSendCookies":true,"settingDisableRenderRequestBody":false,"settingEncodeUrl":true,"settingRebuildPath":true,"settingFollowRedirects":"global","_type":"request"},{"_id":"fld_6cc5aaaa50c440b1902d528d0ad7cf10","parentId":"fld_fc0846d488184b35ac09c105bf8c3085","modified":1601816681423,"created":1601816681423,"name":"Count","description":"","environment":{},"environmentPropertyOrder":null,"metaSortKey":-1601816681423,"_type":"request_group"},{"_id":"env_93de85e947f67e66ed7cad84d8b89ac92c57edbe","parentId":"wrk_180f0a46661741e9bee4d0f75877001e","modified":1601816601924,"created":1601816601924,"name":"Base Environment","data":{},"dataPropertyOrder":null,"color":null,"isPrivate":false,"metaSortKey":1601816601924,"_type":"environment"},{"_id":"jar_93de85e947f67e66ed7cad84d8b89ac92c57edbe","parentId":"wrk_180f0a46661741e9bee4d0f75877001e","modified":1601816601929,"created":1601816601929,"name":"Default Jar","cookies":[],"_type":"cookie_jar"},{"_id":"spc_f451167e7e3146d3ac4c8ce8ab8b99eb","parentId":"wrk_180f0a46661741e9bee4d0f75877001e","modified":1601816601865,"created":1601816601865,"fileName":"Insomnia","contents":"","contentType":"yaml","_type":"api_spec"},{"_id":"env_7d623b457cee4305928010f8b35558d2","parentId":"env_93de85e947f67e66ed7cad84d8b89ac92c57edbe","modified":1603058024050,"created":1601816698367,"name":"Dissertation Core","data":{"url":"http://localhost/","action":"command=","table":"table","sample":{"service_id":2,"url":"http://localhost:3155","acessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJfaWQiOiIyIiwidXNlcm5hbWUiOiJpYW5taW4yIiwiam9pbmVkIjoiMjAyMC0xMC0xOFQxNzo0OTo0OC4zMDVaIiwiYWN0aXZlIjp0cnVlLCJuYW1lIjoiSWFuIEthbWF1IiwiaWF0IjoxNjAzMDQ1Nzg2LCJleHAiOjM2MDAxNjAzMDQ1Nzg2LCJpc3MiOiIxOTIuMTY4LjEuMTg0In0.uk3u3bS6API0S4NOaJnrojhN2x5LeToWnAXfaaxv_aE"}},"dataPropertyOrder":{"&":["url","action","table","sample"],"&~|sample":["service_id","url","acessToken"]},"color":"#d912be","isPrivate":false,"metaSortKey":1601816698367,"_type":"environment"},{"_id":"env_f182a65bb4da43cfbfc5805fb52790dd","parentId":"env_93de85e947f67e66ed7cad84d8b89ac92c57edbe","modified":1603043166589,"created":1603043166589,"name":"New Environment","data":{},"dataPropertyOrder":null,"color":null,"isPrivate":false,"metaSortKey":1603043166589,"_type":"environment"}]} 