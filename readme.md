URL Shortener Application

A URL shortening application built with the MERN stack (MongoDB, Express, React, Node.js). This project allows users to shorten URLs, view performance analytics, and manage their links effectively.

Features

Shorten URLs: Shorten long URLs with optional custom aliases and topics.
Analytics: Get detailed analytics for each shortened URL and overall performance data.
Authentication: Uses Google Authentication to provide a seamless and secure user experience.
React Frontend: Built with React and React Query for efficient API fetching.


API Endpoints

1. POST /api/shorten
Description: Shortens a long URL and optionally accepts an alias and a topic.
Authentication: Required (User must be logged in).
Request Body:

{
  "longUrl": "https://example.com",
  "alias": "customAlias",
  "topic": "tech"
}
Response:

{
  "shortUrl": "https://example.com/customAlias",
  "createdAt": "2025-01-17T12:00:00Z"
}
2. GET /api/shorten/:alias
Description: Redirects the user to the original long URL using the alias.
Authentication: Not required.
Response: A redirect to the original long URL.
3. GET /api/analytics/:alias
Description: Retrieves performance analytics for a shortened URL identified by alias (e.g., clicks, unique users).
Authentication: Required (User must be logged in).
Response:

{
  "totalClicks": 150,
  "uniqueUsers": 120,
  "clicksByDate": [
    {
      "date": "2025-01-17T00:00:00Z",
      "count": 10
    }
  ]
}
4. GET /api/analytics/topic
Description: Retrieves analytics for all URLs shortened by the authenticated user, grouped by topic.
Authentication: Required (User must be logged in).
Response:

{
  "tech": {
    "totalClicks": 100,
    "uniqueUsers": 90
  },
  "food": {
    "totalClicks": 50,
    "uniqueUsers": 30
  }
}
5. GET /api/analytics/overall
Description: Retrieves overall analytics for all URLs shortened by the authenticated user.
Authentication: Required (User must be logged in).
Response:

{
  "totalUrls": 10,
  "totalClicks": 500,
  "uniqueUsers": 300
}
Authentication
This application uses Google Authentication to make the user login process easy and secure.



Running the Application

Make sure you have the following installed:

Node.js

Setup
Clone the repository:


git clone https://github.com/vickyaltitude/URLShortener-TheAlterOfficeAssignment.git

cd url-shortener

Install dependencies:

npm run build

Start the backend server:

npm run start

The application should now be running 