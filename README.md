# apollo-server-issue3859

## Start

```sh
npm install
npm start
```

Open the Gateway playground at http://localhost:4000/

## Queries:

- ✅ OK:

    ```graphql
    {
    serviceAQueryReturningBType(ids: ["should-exist"]) {
        id
        someFieldFromB
        extendedByServiceA
    }
    }
    ``

- 🚫 NOT OK:

    ```graphql
    {
    serviceAQueryReturningBType(ids: ["should-not-exist"]) {
        id
        someFieldFromB
        extendedByServiceA
    }
    }
    ```

    Error:

    ```json
    {
        "errors": [
            {
                "message": "Field \"someFieldFromB\" was not found in response.",
                "extensions": {
                    "code": "INTERNAL_SERVER_ERROR"
                }
            }
        ]
    }
    ```
