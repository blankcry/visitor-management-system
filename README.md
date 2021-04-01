# visitor-management--system
A simple Visitor Management system written in ReactJS for front end and NodeJS(Express) for back end & Database = PostgreSQL 
Front-End
  - Written in React.JS & Redux, to start the development server, simply run npm start
  - To run you'll need to have NODE installed locally on your system
Back-End API
  - Written in Javascript(Node)
  - To start the back end server simply run npm start
  - You can also include Nodemon to automatically end and start the server when changes are made
  - For Database, postgresql is used, so you would need to have it installed locally, DATABASE Schema File can be found in server-api/bin/sql
    - The .env file contain your Database connection details which are used to connect to PostgreSQL
    - Database Table names are also located in the .env file 
    - USER_CODES are also in the .env files
  - Check Package.json files for dependcies, authentication is based on JWT Tokens
  - To create the default admin user in the database run a get request to serveraddress:{port}/register
  
  PS. ONLY SERVER API is documented 
