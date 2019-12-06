<!--
*** Thanks for checking out this README Template. If you have a suggestion that would
*** make this better, please fork the repo and create a pull request or simply open
*** an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>
  <p align="center">
    This is the ticket system app for manage employee work hours!
    <br />
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
 


<!-- ABOUT THE PROJECT -->
## About The Project

The test consists of a basic Ticket System which includes the following modules:

Ticket Module (w/ CRUD)
Employee Module (w/ Login, and CRUD)
Report Module
The basic idea behind the application is that an Employee can log in and create/update/delete tickets and also create time entries for each of the tickets. Later, a report can be generated to get the hours worked by an employee during a time frame.

### Built With

* [Vuetify](https://vuetifyjs.com/)
* [Vue](https://vuejs.org/)

### Prerequisites

- NODE (NPM)

### Installation

1. Go to : `https://github.com/lewandy/ticket-system-app`
2. Clone the repo
```sh
git clone https://github.com/lewandy/ticket-system-app
```
3. Install NPM packages
```sh
npm install
```
4. Add your .env file `cp env.example .env`

5- Run your serve `npm run serve`

### Docker 
Build image `docker build --rm -f "DockerFile" -t ticketsystemapp:latest "."`

Run container `docker run --rm -d -p 8080:80/tcp ticketsystemapp:latest`

