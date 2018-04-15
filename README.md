## csv-api

CSV parsing API application using `sqlite3` and Node.js. To run, clone the repository and run `npm install` to install necessary dependencies. Once installed, run `node main.js` to start the application. 


Postman can be used to send POST requests to `localhost:8080/addcsv` when the server is running. 

In POSTMAN, add the URL and make the request a POST request. Then, click on the *Body* tab, and select *form-data* as the type. Add the key name as `file`, and in the dropdown next to the key name field, select `File` as the type. 
Then choose the `data.csv` file in the cloned folder, and run the request. The API should respond with JSON indicating a success message, and the entire table's data.

