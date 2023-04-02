**Assuming that getShiftsByFacility will not be impacted by this as we are returning facility level data but if needed we can pass the custom_id in the response.**

We will use the `custom_id` column added in the `agent_facility table` and `update` our `generateReport endpoint` to use this also as a `filter` for the `generated reports` - update endpoint to `accept agent_custom_id` as a `filter criteria` in a `query string` as **assuming that this endpoint is a get request.** - the reports generated now should be for the agent represented by this custom_id and the facility. - `sample response` should be something like this:

    ```
    {
        shifts: [],
    }
    status_code: 200
    ```

    - we can add below validations
        - if the custom_id is not associated with the facility in the agent_facility table then we will give below response:
        ```
        {
            errors: [
                {
                    "field": "custom_id",
                    "messages": ["agent is not associated with the facility"]
                }
            ],
        }
        status_code: 400
        ```

**Assuming that the endpoint was already protected by authentication and authorization hence not mentioning those conditions here.**
