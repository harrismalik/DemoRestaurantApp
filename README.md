# DemoRestaurantApp
# Laravel v10 and React v18 with TypeScript App

This repository contains two separate applications: a backend API built with Laravel v10 and a frontend application built with React v18 and TypeScript.

## Backend Setup

1. Clone the repository:

```bash
git clone https://github.com/harrismalik/DemoRestaurantApp.git
```
2. Navigate to the backend directory:

```
cd backend
```

3. Install the required dependencies using Composer:

```
composer install
```
Note: Ensure that you are running PHP version 8.1 or above.

4. Set up Laravel Passport by running:

```
php artisan passport:install
```

5. Run the database migrations:

```
php artisan migrate
```
Note: Make sure your local database is running.

6. Start the backend app:

```
php artisan serve
```
Note: The backend is now running. However, since there is no initial data, use the Admin endpoints to add data via tools like Postman (an admin panel on the frontend is not available yet).

## Frontend Setup

1. Navigate to the frontend directory:

```
cd ../frontend
```

2. Install the required dependencies using npm:

```
npm install
```

3. Start the frontend app:

```
npm start
```
Now, the frontend application is running. Sign up and explore the features!

Feel free to reach out for any issues or inquiries. This Demo App is for the perpose of exploring and demoing some things so it needs work to be called functional, Happy coding!
