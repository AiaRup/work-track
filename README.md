<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/AiaRup/work-track">
    <img src="https://user-images.githubusercontent.com/35365209/139595172-b37ccc14-4a22-4b84-a671-2af2e4cf9656.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Work Tracker</h3>

  <p align="center">
   A PWA app for desktop and mobile to track the amount of massages and wage - daily and monthly.
  <br />
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Screenshots</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

I made this app for my husband so he could keep track of the amount of massages he gave and the salary he earned. The need for the app arose after months of _"Where did I put the paper in which I wrote how many massages I did on Tuesday?"_

The app supports the following languages:

- English
- Thai
<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- [React](https://reactjs.org/)
- [Netlify](https://www.netlify.com/)
- [React-intl](https://www.npmjs.com/package/react-intl)
- [Material-ui](https://mui.com/)
- [Material Dashboard React](https://github.com/creativetimofficial/material-dashboard-react)
- [Firebase](https://firebase.google.com/)
- [Dayjs](https://day.js.org/)
- [Lottie](https://lottiefiles.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy of the project and run it follow these simple steps:

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Create a project on [firebase](https://firebase.google.com/) with firestore support.
2. Clone the repo
   ```sh
   git clone https://github.com/AiaRup/work-track.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Get the following variables from the new created firebase project and put them in an `.env` file in the root of the project (all the variables start with `REACT_APP` and then the name of the variable):

   ```js
   REACT_APP_API_KEY = 'REACT_APP_API_KEY';
   REACT_APP_APP_ID = 'REACT_APP_APP_ID';
   REACT_APP_AUTH_DOMAIN = 'REACT_APP_AUTH_DOMAIN';
   REACT_APP_MEASUREMENT_ID = 'REACT_APP_MEASUREMENT_ID';
   REACT_APP_PROJECT_ID = 'REACT_APP_PROJECT_ID';
   REACT_APP_SENDER_ID = 'REACT_APP_SENDER_ID';
   REACT_APP_STORAGE_BUCKET = 'REACT_APP_STORAGE_BUCKET';
   ```

5. Start the project
   ```sh
   npm start
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

The app contains the following screens and components:

1. Dashboard
2. Monthly summary
3. Profile
4. Menu
5. Add, edit or delete a massage item

```
If you want, the app can be used to track any type of work all it takes is to change the functions that calculate the salary and change the forms and texts for the desired use.
```

<div align="center">
    <img src="https://user-images.githubusercontent.com/35365209/139595156-e81acea8-a398-4853-b8ce-8b34059946f9.jpeg" alt="Logo" width="200" height="400">
    <img src="https://user-images.githubusercontent.com/35365209/139595154-7a9f9d03-ed65-49cd-8714-1b296cc141bc.jpeg" alt="Logo" width="200" height="400">
    <img src="https://user-images.githubusercontent.com/35365209/139595155-6824f948-8545-4d32-86d4-0cd53d218d81.jpeg" alt="Logo" width="200" height="400">
    <img src="https://user-images.githubusercontent.com/35365209/139595153-113b0e97-116e-4f9e-ad4e-be5d75af788a.jpeg" alt="Logo" width="200" height="400">
    <img src="https://user-images.githubusercontent.com/35365209/139595151-0d3ae078-6c8c-4da2-9515-c0696cb2d443.jpeg" alt="Logo" width="200" height="400">
</div>

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [] Errors handling
- [] Add tests

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Aia Rupsom - [LinkedIn](https://www.linkedin.com/in/aia-rupsom)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[contributors-shield]: https://img.shields.io/github/contributors/AiaRup/work-track.svg?style=for-the-badge
[contributors-url]: https://github.com/AiaRup/work-track/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/AiaRup/work-track.svg?style=for-the-badge
[forks-url]: https://github.com/AiaRup/work-track/network/members
[stars-shield]: https://img.shields.io/github/stars/AiaRup/work-track.svg?style=for-the-badge
[stars-url]: https://github.com/AiaRup/work-track/stargazers
[issues-shield]: https://img.shields.io/github/issues/AiaRup/work-track.svg?style=for-the-badge
[issues-url]: https://github.com/AiaRup/work-track/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/aia-rupsom/

[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/AiaRup/work-track)
