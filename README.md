### For Developer
To correctly work with repository, follow these steps:
* Install dependencies executing ```npm install```
* Append to your file ```/etc/hosts```  :
    ```
    127.0.0.1   scopus-service
    127.0.0.1   scholar-service
    127.0.0.1   cineca-service
    127.0.0.1   search-service
    172.16.174.108  database-service
    ```
* Execute the script: ```./setup-hooks.sh```
* If you want perform a unit testing, execute: ```npm test```
* If you want run the application in local, execute the scripts: 
    * to start ```./start_all_services.sh``` 
    * to stop ```./stop_all_services.sh```

* **NEVER COMMIT** or **PUSH** directly on **PRODUCTION/MAIN** branch
    * Always work on DEVELOP branch
    * If you want to push in the **PRODUCTION/MAIN**, **MERGE** first with **DEVELOP** and then **PUSH**


## Production 
* The application is up at the following address http://172.16.174.108:8000/

