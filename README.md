# Ticket system App

The basic idea behind the application is that an Employee can log in and create/update/delete tickets and also create time entries for each of the tickets. Later, a report can be generated to get the hours worked by an employee during a time frame.

  - Create employees
  - Create tickets and times entries
  - Reports(working)

### Tech

Ticket system uses a Vue Framwork

* [vue] - is a progressive framework for building user interfaces. Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable. The core library is focused on the view layer only, and is easy to pick up and integrate with other libraries or existing projects. On the other hand, Vue is also perfectly capable of powering sophisticated Single-Page Applications when used in combination with modern tooling and supporting libraries.

### Installation

1 -Clone the repo "https://github.com/lewandy/ticket-system-app"

2 -Run `npm install` for install all packages that the app need

3 -Add your .env file `cp env.example .env`

4- Run your serve `npm run serve`

### Docker 
Build image `docker build --rm -f "DockerFile" -t ticketsystemapp:latest "."`

Run container `docker run --rm -d -p 80:80/tcp ticketsystemapp:latest`

### Todos

 - Time entries employees and notes
 - reports


