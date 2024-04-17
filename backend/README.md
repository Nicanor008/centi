## Backend Documentation

## Getting Started
### System Requirements

- Any OS, windows, ubuntu, Mac OS X, etc
- Atleast node version 16
- yarn

### Installation

Clone this repo and install the respective dependencies

```
git clone git@github.com:Nicanor008/centi.git
cd backend
yarn
```

### Configuration
Create a new file `.env` on this backend folder. Copy the contents in `.env.example` into the newly created `.env` file

```
touch .env
cp .env.example .env
```

Update your mongodb details. The mongodb can be a local instance or mongo atlas instance

### Executing/Runnig the apps
- On the backend folder terminal, start the project with `yarn start`

## Design Pattern used
MVC

## Folder Structure
26 directories, 110 files

```
.backend
├── README.md
├── file-structure.md
├── nodemon.json
├── package-lock.json
├── package.json
├── processes.json
├── scripts
│   ├── backup.sh
│   ├── backups.sh
│   └── restore.sh
├── src
│   ├── api
│   │   ├── apps
│   │   │   ├── budgets
│   │   │   │   ├── budget.controller.js
│   │   │   │   ├── budget.model.js
│   │   │   │   ├── budget.service.js
│   │   │   │   ├── budget.test.js
│   │   │   │   ├── budget.validation.js
│   │   │   │   └── index.js
│   │   │   ├── categories
│   │   │   │   ├── category.controller.js
│   │   │   │   ├── category.model.js
│   │   │   │   ├── category.service.js
│   │   │   │   ├── category.test.js
│   │   │   │   ├── category.validation.js
│   │   │   │   └── index.js
│   │   │   ├── dashboards
│   │   │   │   ├── dashboard.controller.js
│   │   │   │   ├── dashboard.model.js
│   │   │   │   ├── dashboard.service.js
│   │   │   │   ├── dashboard.test.js
│   │   │   │   ├── dashboard.validation.js
│   │   │   │   └── index.js
│   │   │   ├── debts
│   │   │   │   ├── debt.controller.js
│   │   │   │   ├── debt.model.js
│   │   │   │   ├── debt.service.js
│   │   │   │   ├── debt.test.js
│   │   │   │   ├── debt.validation.js
│   │   │   │   └── index.js
│   │   │   ├── expenses
│   │   │   │   ├── expenses.controller.js
│   │   │   │   ├── expenses.model.js
│   │   │   │   ├── expenses.service.js
│   │   │   │   ├── expenses.test.js
│   │   │   │   ├── expenses.validation.js
│   │   │   │   └── index.js
│   │   │   ├── financialGoals
│   │   │   │   ├── financialGoals.controller.js
│   │   │   │   ├── financialGoals.model.js
│   │   │   │   ├── financialGoals.service.js
│   │   │   │   ├── financialGoals.test.js
│   │   │   │   ├── financialGoals.validation.js
│   │   │   │   └── index.js
│   │   │   ├── investments
│   │   │   │   ├── index.js
│   │   │   │   ├── investment.controller.js
│   │   │   │   ├── investment.model.js
│   │   │   │   ├── investment.service.js
│   │   │   │   ├── investment.test.js
│   │   │   │   └── investment.validation.js
│   │   │   └── savings
│   │   │       ├── index.js
│   │   │       ├── savings.controller.js
│   │   │       ├── savings.model.js
│   │   │       ├── savings.service.js
│   │   │       ├── savings.test.js
│   │   │       └── savings.validation.js
│   │   ├── auth
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.service.js
│   │   │   ├── auth.test.js
│   │   │   ├── auth.validation.js
│   │   │   └── index.js
│   │   ├── configs
│   │   │   ├── config.controller.js
│   │   │   ├── config.model.js
│   │   │   ├── config.service.js
│   │   │   └── index.js
│   │   ├── index.js
│   │   ├── packages
│   │   │   ├── index.js
│   │   │   ├── packages.controller.js
│   │   │   ├── packages.model.js
│   │   │   ├── packages.service.js
│   │   │   └── packages.validation.js
│   │   ├── refreshTokens
│   │   │   ├── index.js
│   │   │   ├── refreshToken.controller.js
│   │   │   ├── refreshToken.model.js
│   │   │   ├── refreshToken.service.js
│   │   │   ├── refreshToken.test.js
│   │   │   └── refreshToken.validation.js
│   │   └── users
│   │       ├── index.js
│   │       ├── user.validation.js
│   │       ├── users.controller.js
│   │       ├── users.model.js
│   │       └── users.service.js
│   ├── app.js
│   ├── config
│   │   └── index.js
│   ├── db_seed
│   │   ├── index.js
│   │   └── user_seeder.js
│   ├── helpers
│   │   ├── common
│   │   │   ├── Controller.js
│   │   │   ├── Service.js
│   │   │   └── index.js
│   │   ├── email
│   │   │   └── sendMail.js
│   │   ├── error.js
│   │   ├── handle-errors.js
│   │   ├── index.js
│   │   ├── response.js
│   │   ├── schemas.js
│   │   └── utils.js
│   ├── middlewares
│   │   ├── auth.js
│   │   └── rate-limit.js
│   ├── server.js
│   └── services
│       ├── index.js
│       ├── jwt.js
│       ├── logger.js
│       ├── mailgun.js
│       ├── mongoose.js
│       ├── passport.js
│       ├── response.js
│       ├── storage.js
│       └── swagger.js
├── uploads
└── yarn.lock
```