# Financial Goals App

## Overview
The Financial Goals App is a beautiful and interactive web application designed for tracking and managing financial goals for two users. It allows users to create, update, and visualize their financial goals in real-time.

## Features
- Create financial goals with details such as name, cost, description, and target date.
- Update costs and calculate timelines based on monthly savings.
- Dashboard with progress bars and charts to visualize savings and timelines.
- Real-time collaboration between users.
- User authentication using Firebase.

## Technologies Used
- **Frontend:** React, TailwindCSS
- **Backend:** Node.js, Express
- **Database:** Firebase

## Project Structure
```
financial-goals-app
├── client
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── types
│   │   ├── utils
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── tsconfig.json
├── server
│   ├── src
│   │   ├── controllers
│   │   ├── routes
│   │   ├── types
│   │   └── app.ts
│   ├── package.json
│   └── tsconfig.json
├── firebase.json
└── README.md
```

## Setup Instructions
1. Clone the repository.
2. Navigate to the `client` directory and run `npm install` to install frontend dependencies.
3. Navigate to the `server` directory and run `npm install` to install backend dependencies.
4. Set up Firebase configuration in `firebase.json`.
5. Start the server and client applications.

## License
This project is licensed under the MIT License.
