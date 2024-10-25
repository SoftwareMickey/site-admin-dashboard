import { createSlice } from "@reduxjs/toolkit";

const agentSlice = createSlice({
    name: 'agent-slice',
    initialState: {
        agents: [
            {
                id: 1,
                name: "John Doe",
                email: "john@example.com",
                status: "Active",
                type: "Premium",
              },
              {
                id: 2,
                name: "Jane Smith",
                email: "jane@example.com",
                status: "Inactive",
                type: "Basic",
              },
              {
                id: 3,
                name: "Alice Johnson",
                email: "alice@example.com",
                status: "Active",
                type: "Standard",
              },
              {
                id: 5,
                name: "Jane Smith",
                email: "jane@example.com",
                status: "Inactive",
                type: "Basic",
              },
              {
                id: Math.floor(Math.random() * 1000000000 + 1),
                name: "Alice Johnson",
                email: "alice@example.com",
                status: "Active",
                type: "Standard",
              },
              {
                id: Math.floor(Math.random() * 1000000000 + 1),
                name: "Jane Smith",
                email: "jane@example.com",
                status: "Inactive",
                type: "Basic",
              }
        ],
        searchedAgents: [],
        isSearched: false,
    },
    reducers: {
        searchedAgentsHandler: (state, action) => {
            const searches = action.payload;
            console.log(`Searched Agents: ${searches}`)

            state.searchedAgents = searches;
            state.isSearched = true
        },
        sortAgentsHandler: (state, action) => {
          const sortedAgents = action.payload;
          console.log(`Sorted agents: ${sortedAgents}`)
          state.searchedAgents = sortedAgents
        }
    }
})

export const agentsActions = agentSlice.actions;
export default agentSlice
