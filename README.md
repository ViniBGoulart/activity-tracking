
# Activity Tracking
A React Activity Tracking project was created to learn about how to create a CRUD with React and Laravel using axios API. We'll create Projects that will be able connect with a Timer, like Todo project with a timer for each.

## Used technologies
- React
- Laravel
- Tailwind
- MySQL
- Axios
- NPM
- Composer

## Why use these technologies?
I chose these technologies because have a big community and documentations to support. Laravel is a very complete backend framework with a nice folder structure created in installation. React is a new and complete Javascript frontend library, which also has a good community to consult.

## Build with me
This project has a "how to build" in dev.to, you can access this link [How to create a CRUD App with React and Laravel](https://dev.to) to see the steps creating this project.
## Run Locally
Clone the project
```bash
  git clone https://github.com/ViniBGoulart/activity-tracking.git
```

### Start Server
```bash
  cd backend
```
```bash
  composer install
```
```bash
  php artisan serve
```

### Start Web App
```bash
  cd webapp
```
```bash
  npm install
```
```bash
  npm start
```

#### Endpoints

| Method | Endpoint | Params     | Description                |
| :-------- | :-------- | :------- | :------------------------- |
| `post` | `/api/register` | `JSON {name, email, password, password_confirmation}` | **Register** a user. |

## Demo

https://user-images.githubusercontent.com/88122830/186317825-9e4be4de-0b02-440c-9f0f-a4931f4bd253.mp4
