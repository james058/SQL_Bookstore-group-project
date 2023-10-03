LOOKINNABOOK Project

- This projects simulates an online bookstore where:
    - users can search for a book
    - users can purchase a book
    - owners can add a book
    - owners can remove a book

- This is a node.js web based project that uses MySQL as the Database Mangement system.

- Files
    - create-database.sql file contains sql code to create the database and insert some data into it.
    - server.js file handles the required express routes and is responsible for querying the DB.
    - public/css folder contains all css used in the project
    - public/js folder contains client side code responsible for handling AJAX requests and updating the DOM.
    - public/html folder contains all html usedin the project


- running instructions: - Install all dependencies contained in the package.json file.
                        - Install the latest version of MySQL workbench
                        - Execute the create-database.sql file in MySQL workbench
                        - Navigate to the project folder (folder containing the server.js file) in a terminal.
                        - npm i
                        - Type "node ./server.js" and press enter
                        - Go to "http://localhost:3000/" in a Browser
                        - To access the owner page, you must be an owner. The current owners are "chiedu ezinwa"
                                           "daniel"
                                           "james"

