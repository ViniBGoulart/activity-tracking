
# Activity Tracking

Registry your activity with a timer to count and control the hours spent. 
I did this for control hours worked outside the company, because the existing software which does this is in company local

## Run Locally

Clone the project

```bash
  git clone https://github.com/ViniBGoulart/activity-tracking.git
```

Go to the project directory

```bash
  cd activity-tracking
```

### API

#### Start Server

```bash
  cd backend
```
```bash
  composer install
```
```bash
  php artisan migrate
```
```bash
  php artisan jwt:secret
```
```bash
  php artisan serve
```

### Web App

#### Start Web App

```bash
  cd webapp
```
```bash
  npm install
```
```bash
  npm start
```
