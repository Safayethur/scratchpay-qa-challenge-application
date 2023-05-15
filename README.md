# Please Read

I made two folders in e2e for the two seperate tests. The first on tests the businessDay and settlmentDate apis. The next one tests the backend of the medical dasboard. Theres a script in the package.json for triggering all tests.

## Business Day Checker
Returns the number of business days it will take for a payment to be allocated into an account.

## Run Locally

```
npm install
npm start
```

## API

The entire API is accessible under `/api/v1` and the following endpoints are available:

- `GET /api/v1/settlementDate`
- `GET /api/v1/isBusinessDay`

