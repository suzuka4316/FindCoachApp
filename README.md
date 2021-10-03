
# Find My Coach

## Main Features
- Signup or Login
- Browse coaches and filter them by their expertise
- Send coaching request to a specific coach
- Register yourself as a coach
- Browse all the requests sent to you

## Debug
Running in development mode
```
npm run serve
```

## Authentication
This app focuses on the frontend (Vue), and uses Firebase service for the backend functionalities.
In Firebase, realtime database are configured as followed:
```
{
  "rules": {
    "coaches": {
      ".read": true,
      // auth is a special variable in Firebase 
      // which will be not null if we add a valid token to the request
      ".write": "auth != null"
    },
    "requests": {
      ".read": "auth != null",
      ".write": true
    },
  }
}
```
As you can see, only authenticated user can **register as a coach** and **read any coaching requests**.

All the http requests are handled through Vuex by following Rest API rules set by Firebase. Read [here](https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password) for more info.