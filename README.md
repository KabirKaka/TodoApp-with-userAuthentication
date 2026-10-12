# Todo App with User Authentication

A personal todo app with full email/password authentication, built with React, Firebase and Tailwind CSS during my React internship.

**Live demo:** https://todo-app-with-user-authentication.vercel.app/

## Features

- Sign up, sign in and sign out with Firebase Authentication
- Password reset by email
- A private todo list for each user, stored in Firebase
- Add and delete todos, ordered by creation time
- Responsive UI styled with Tailwind CSS

## Tech stack

- React
- Firebase Authentication
- Cloud Firestore
- Tailwind CSS
- Font Awesome

## Getting started

Add your Firebase project config in `src/firebase.js`, then:

```bash
npm install
npm start
```

The app runs at http://localhost:3000.

## Project structure

```
src/
├── components/
│   ├── Todo/      # TodoForm, TodoItem, Todos
│   ├── UI/        # Loader
│   └── SignIn, SignUp, ResetPassword, Navbar
└── firebase.js
```


## Author

**Muhammad Kabir Kaka**, Frontend Engineer (React · Next.js · TypeScript)  
[GitHub](https://github.com/KabirKaka) · [LinkedIn](https://www.linkedin.com/in/muhammad-kabir-kaka)
