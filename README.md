
# HUCU

HUCU is a digital alternative to getting lost in phone trees and waiting on hold. Have Us Call U
instead. Users are able to search and select what their inquiring about and schedule a time
that works best for them. HUCU allow dispatchers to assign tickets to agents and monitor
queue progress. Agents can manage all their assigned tickets in one place.

HUCU is full-stack app built using React and Node.js. The app was build as a capstone project for the software enginering program at BrainStation (June 2023 Online cohort). The app leverages the rc-tree and react-table packages to help create a rich and responsive user experience. 


## Acknowledgements

 - [Awesome Readme Templates](https://readme.so/editor)
 - [BrainStation](https://brainstation.io/)
 - [Super cool CSS Progress Bars with stripe animations](https://css-tricks.com/css3-progress-bars/)
 


## Authors

- [@NickVirga](https://github.com/NickVirga)


## Features

- User ticket submission
- Agent/dispatcher ticket management
- Login/Signup - access profile information for easier ticket creation
- Dynamic ticket queue - real-time updates
- Multi-role user authentication - user and organization data secure
- Responsive design for mobile/tablet/desktop


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file


Front-end React:

`REACT_APP_BASE_URL`    
e.g.  `REACT_APP_BASE_URL=http://localhost:8080`


Back-end Node:

`PORT`
`DB_HOST=127.0.0.1`
`DB_NAME`
`DB_USER`
`DB_PASSWORD`
`CORS_ORIGIN`
`JWT_SECRET_KEY`

e.g. `PORT=8080`
`DB_HOST=127.0.0.1`
`DB_NAME`
`DB_USER`
`DB_PASSWORD`
`CORS_ORIGIN=http://localhost:3000`
`JWT_SECRET_KEY`


## Installation and Running Locally

Clone the front-end React app:

```bash
  git clone https://github.com/NickVirga/hucu
```
    
Clone the back-end Node.js:

```bash
  git clone https://github.com/NickVirga/hucu-api
```

Navigate to both directories:


```bash
   cd directory
```

Install dependencies for both:

```bash
   npm install
```

Run react app:

```bash
   npm start
```

Run node server:

```bash
   node index.js
```
## Lessons Learned

Using libraries to save time can sometimes not save time at all. Using the rc-tree and react-table packages probably took time to figure out such that I could've probably made my own  solution from scratch.


## Roadmap

- Add support for multiple organizations

- 2FA in the form of e-mail or SMS

- sign-up as an agent or dispatcher for an organizations

- enable dispatchers to add entries to inquiry options

