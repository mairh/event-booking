## Getting Started

## Running app locally

### _Clone the code from repo locally from GitHub_

```
git clone https://github.com/pharmadata-fi/event-booking.git
cd event-booking
```

### _Check Node via nvm_

```
nvm use

Note: Currently using v20.17.0
```

### _Install dependencies_

```
yarn
```

### _Run in Docker_

```
docker compose up -d
```

### _Run project in development mode_

#### For event booking:

```
yarn dev
```

Then open http://localhost:3000 in your browser.

#### For admin panel: 

```
yarn dev:admin-panel
```

Then open http://localhost:4000 in your browser.

### _Data for login_

Use username and password written in the /src/modules/data/users.json file.

### _Environment variables_

```
You need to ask for the .env.local and .env.admin.local files from the team.
Additional info can be found in the .env.local.example file.
```

### _Docs_

https://event-booking-docs.vercel.app