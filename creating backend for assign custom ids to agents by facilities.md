**Assumptions:- We already have an agent_facility table. All the routes will be protected by authentication and authorization and middlewares for these are created.We do not want to delete the agent_facility mapping**

# Steps

- `create a migration` to `add custom_id` into the `agent_facility table` and update some other things as shown below :-

  - `custom_id (varchar(50))(nullable)`(default can be something like temp + agentId + facilityId as we are adding column to existing table)
  - `combination of custom_id and facility_id should be unique`.

- create a `get api` which has endpoint `/facilities/:facilityId/agents?search=:name_typing`

  - here we are using `query param called search` which will receive whatever user is typing and we can do a `join between agents and agent_facility table` ( assuming we already have facilities information on the UI page and it is not needed again else we can add facilities table to the join as well) on condition that `agent name matches the like query and limit 10` for `search query param` and we will `return the agents fetched from the query`.
  - If `no search query param` received then we will `return the first 10 agents` fetched from the query.

  - If no issues and some agents then response payload will look this:-

    ```
    {
        "agents": [
            {
                "id": number,
                "name": string,
                "custom_id": string,
            }
        ]
    }
    status_code: 200
    ```

    - If no issues and no agents then response payload will look this:-
      ```
        {
            "agents": []
        }
      status_code: 200
      ```

  - If the person trying to hit our api is not authorized then the response payload will look like this

    ```
    {
        "message": "you are not authorized to access this"
    }
    status_code: 403
    ```

  - If server issues then the response payload will look like this
    ```
    {
        "message": "something went wrong please try again later"
    }
    status_code: 500
    ```

- create a `put api` which has endpoint `/facilities/:facilityId/agents/:agentId` which will do the following things:-

  - accept a `request payload` as follows:-
    ```
    {
        "custom_id": string
    }
    ```
  - submit success `response payload` as follows:-
    ```
    {
        id: number,
        name: string,
        custom_id: string ( updated custom_id)
    }
    ```
  - it will perform below validations on the request payload

    - both fields are required
    - agent_id should be present in the agents table
    - agent_id should be present in the agent_facility table and mapped to the current facility_id
    - custom_id should not be present in the agent_facility table for the current facility_id in the agent_facility table.
    - try catch should be implemented to prevent server crashing and graceful exception handling

    - If the person trying to hit our api is `not authorized` then the `response payload` will look like this

      ```
      {
          "message": "you are not authorized to access this"
      }
      status_code: 403
      ```

    - If `validation fails` then the `response payload` will look like this (`assuming custom_id failed a validation` ) :-

      ```
      {
        errors: [
            {
            "field": "agent_id",
            "messages": [
                "custom_id is required",
                "custom_id is already taken"
                ],
            }
        ]
      }
      status_code: 400
      ```

    - If `server issues` then the `response payload` will look like this
      ```
      {
          "message": "something went wrong please try again later"
      }
      status_code: 500
      ```

  **Both the endpoints will be protected by authentication and authorization middlwares and if these fail then the server will return an error response**
