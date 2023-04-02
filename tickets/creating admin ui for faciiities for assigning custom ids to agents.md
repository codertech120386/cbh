**Assumptions:- Assuming that we have notification system in place. - Assuming we are using a design system to get the components.**

# We will need to create a page as follows:

- first create an endpoint for this in the router and call it `facilities/:facilityId/agents`
- create a page for this called `CreateCustomIdForAgent.tsx` ( assuming that we are using react with TS)

  - In the `useEffect` call we will call the `/facilities/:facilityId/agents` endpoint which will return the first 10 agents from the list.

- we will create a `state` called `agents` to store this information.
- we will loop over these `agents` and call `CustomIdCreation` component and pass the data to it.

  - we will create a new component called `CustomIdCreation.tsx`
  - this component will create below elements
    - `Autocomplete` dropdown which will show 10 agents at a time
    - `Input box` to accept the custom_id provided ( if already present then it will be shown here)
    - `Error message span` below the input box to show error if any
    - `Save Icon` to save / update the `custom_id` for that agent
      Functionalities of every component
      - `Autocomplete dropdown` will allow the user to type the name ( to be maintained in a `state` called `searchAgent`) and we will use `debounce` to send the details to the update function received as props from `CreateCustomIdForAgent component` and then hit the `api/facilities/:facilityId/agents?search=:name_typing` and get the results and update the `agents state`.
      - `Input box` will allow the user to type the `custom_id` ( to be maintained in a `state` called `customId`).
      - Error message will be displayed ( to be maintained in a state called `customIdErrorMessage`) when the `api returns a 400` and the error messages is looped and the error message is taken from the `custom_id error message field` and shown in multiple lines if array contains multiple entries.
      - `save button on click` will call the `saveCustomId()` method received as `props` from the `CreateCustomIdForAgent component` and process the request.
  - if `update happens` then `CreateCustomIdForAgent component` will get the `agent_id` and the `custom_id` for that `agent` from the `CustomIdCreation` and update request `/facilities/:facilityId/agents/:agentId` can be called and the custom_id will be updated

  Sample Components with their states, props and methods

  ## CreateCustomIdForAgent.tsx

  - states
    - agents
    - errors
  - methods - useEffect() (to get the initial list of agents) - getAgentsListForSearchedTerm() (to get the list of agents as per the search term) - saveCustomIdForAgent() (to save the custom id for the agent)

    ## CustomIdCreation.tsx

  - states
    - searchTerm ( autocomplete dropdown typed state )
    - customId ( input text state of the custom id )
  - props
    - agent ( individual agent from looping the list of agents )
    - errors ( state for the errors received while updating custom id )
    - getAgentsListForSearchedTerm ( get the list of agents as per the search term )
    - saveCustomIdForAgent ( save the custom id for the agent)
  - methods
    - none required as we can do state updations inline and other data is received from props including methods

**Note :- Assuming that we are using network level error handling built at axios ( assuming using axios for hitting requests ) level or in some other way.**
