# Work in Progress

Natours API Documentation
Welcome to Natours API documentation! Natours is a platform that allows users to discover, book, and review hiking and tour experiences. This README provides an overview of the available endpoints and functionalities of the Natours API.

Features
Tours Management: Explore various tours, including details such as name, duration, difficulty, ratings, price, summary, description, images, start dates, locations, and guides.
User Authentication: Sign up, log in, and manage user accounts securely using JSON web tokens (JWT).
Reviews: Users can read and create reviews for tours, including ratings and feedback.
Tour Statistics: Retrieve statistical insights about tours, including the number of tours, ratings, average rating, and pricing statistics.
Custom Queries: Filter, sort, limit fields, and paginate tours to perform specific queries.
Admin Privileges: Certain endpoints require admin privileges for actions like deleting tours or accessing user information.

Endpoints Overview

Tours
GET /api/v1/tours: Retrieve a list of all tours.
GET /api/v1/tours/:id: Retrieve details about a specific tour by ID.
DELETE /api/v1/tours/:id: Delete a tour (Admin only).
GET /api/v1/tours/tour-stats: Retrieve statistics for tours.
GET /api/v1/tours/top-5-tours: Retrieve the top 5 tours based on ratings.
Users
GET /api/v1/users: Retrieve a list of all users (Admin only).
GET /api/v1/users/:id: Retrieve details about a specific user by ID (Admin only).
DELETE /api/v1/users/deleteMe: Deactivate current user account.

Authentication
POST /api/v1/users/signup: Sign up and create a new user account.
GET /api/v1/users/login: Log in and generate a JWT token.
POST /api/v1/users/forgotPassword: Request a password reset link via email.
PATCH /api/v1/users/resetPassword/:token: Reset user password using token received via email.

Reviews
GET /api/v1/reviews: Retrieve all reviews.
GET /api/v1/reviews/:id: Retrieve details about a specific review by ID.
POST /api/v1/reviews: Create a new review.
PATCH /api/v1/reviews/:id: Update a review (Admin or User who created the review).
DELETE /api/v1/reviews/:id: Delete a review (Admin or User who created the review).

Getting Started
To use the Natours API, follow these steps:

Clone the repository: git clone <https://github.com/SamuelAmphoux/natours.git>
Install dependencies: npm install
Set up environment variables (e.g., database connection string, JWT secret)
Run the server: npm start
Additional Notes
Ensure proper authentication and authorization for protected endpoints.
Handle errors and provide appropriate error responses.
Use HTTPS for secure communication between clients and the server.
For detailed information on each endpoint and request/response examples, refer to the provided API documentation (https://documenter.getpostman.com/view/24798070/2sA3Bg9aWH#fcb34c8f-e407-43e5-8fb6-06886c017977).

Contributors
Amphoux Samuel

License
This project is licensed under the MIT License.
