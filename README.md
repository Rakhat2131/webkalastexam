Project Name
Overview
This project is a web application that provides users with features like user authentication, news display, country information, and an admin panel for managing countries and notes. It utilizes MongoDB to store data and integrates with two external APIs for fetching news and current time.

Features
User Authentication:

Users can register on the website to create an account.
After registration, users can log in to access personalized content.
News Display:

Upon logging in, users can view various news articles.
The news is sourced from an external API to provide up-to-date information.
Country Information:

Users can explore details about different countries, including basic information and news related to each country.
Country information is fetched from an external API.
Admin Panel:

Admins can access the admin panel using the credentials (username: admin, password: Adminpassword).
If the direct login doesn't work, admins can navigate to /admin/dashboard in the URL.
The admin panel allows the addition of new countries and notes.
MongoDB Integration:

Data about countries and notes is stored in a MongoDB database.
MongoDB provides a flexible and scalable solution for data storage.
APIs Used
News API:

The application fetches real-time news using a News API.
The news is displayed to users, keeping them informed about current events.
Time API:

Current time information is fetched from a Time API.
This information is utilized to provide accurate timestamps for various activities within the application.
How to Run
Install Dependencies:

Make sure you have Node.js and npm installed.
Run npm install to install project dependencies.
Set Up MongoDB:

Create a MongoDB database and update the connection string in the project configuration.
Environment Variables:

Create a .env file and provide necessary environment variables, such as API keys and MongoDB connection details.
Run the Application:

Execute npm start to run the application.
The application should be accessible at http://localhost:3000.
Contributing
If you would like to contribute to the project, please follow the standard Git workflow:

Fork the repository.
Create a new branch for your feature or bug fix.
Make changes and commit them.
Push the changes to your fork.
Create a pull request.
