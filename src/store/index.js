import { configureStore, createSlice } from "@reduxjs/toolkit";
import agentSlice from "./agents";
import filterSlice from "./filter";
import profileSlice from "./profile";

const portalSlice = createSlice({
    name : 'portalSlice',
    initialState: {
        isModalOpen: false,
        isSuspendModalOpen: false,

        isProfileModalOpen: false,
        isProfileHandlerOpen: false,

        isMetricsModalOpen: false,
        metricsName: '',
        metricsPrice: 0,
        isMetricsAlteredWith: false,

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
                id: 4,
                name: "John Doe",
                email: "john@example.com",
                status: "Active",
                type: "Premium",
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
        ],
        foundAgent: []
    },
    reducers: {
        sortHandler: (state, action) => {
            const sortedAgents = action.payload;
            
            state.agents = sortedAgents;
        },

        openModalHandler: (state, action) => {

            const agentID = action.payload;

            const existingAgent = state.agents.filter((agent) => agent.id === agentID);
            state.foundAgent = existingAgent;
            
            console.log(`Found Agent: ${existingAgent[0].name}`)
            
            state.isModalOpen = true
        },
        updateAgentHandler: (state, action) => {

            const updateAgent = action.payload.agent;
            const updateID = action.payload.id;

            console.log('updated agent: ', updateAgent)
            console.log('updated ID: ', updateID)

            state.agents = state.agents.map((agent) => agent.id === updateID? updateAgent : agent)

            console.log('updated agent: ', updateAgent)
            console.log('updated agents: ', state.agents)
        },

        openSubscriptionModalHandler: (state, action) => {

            const agentID = action.payload;

            const existingAgent = state.agents.filter((agent) => agent.id === agentID);
            state.foundAgent = existingAgent;
            
            state.isModalOpen = true
        },
        updateSubscriptionAgentHandler: (state, action) => {

            const updateAgent = action.payload.agent;
            const updateID = action.payload.id;

            console.log('updated agent: ', updateAgent)
            console.log('updated ID: ', updateID)

            state.agents = state.agents.map((agent) => agent.id === updateID? updateAgent : agent)

            console.log('updated agent: ', updateAgent)
            console.log('updated agents: ', state.agents)
        },
        closeModalHandler: (state) => {
            state.isModalOpen = false
        },

        openMetricsModalHandler: (state, action) => {

            const metricName = action.payload.title;
            const metricPrice = action.payload.price;

            console.log('Price received from metrics: ', metricPrice)

            state.metricsName = metricName;
            state.metricsPrice = metricPrice
            state.isMetricsModalOpen = true;
        },
        closeMetricsModalHandler: (state, action) => {

            const metricNewPrice = action.payload;

            console.log('Metrics New Price: ', metricNewPrice)
            state.metricsPrice = metricNewPrice;
            state.isMetricsAlteredWith = true;
            state.isMetricsModalOpen = false
        },

        openSuspendModal: (state) => {
            state.isSuspendModalOpen = true
        },
        closeSuspendModal: (state) => {
            state.isSuspendModalOpen = false
        },

        openProfileModal: (state) => {
            state.isProfileModalOpen = true
        },
        closeProfileModal: (state) => {
            state.isProfileModalOpen = false
        },

        openProfileHandler: (state) => {
            state.isProfileHandlerOpen = true
        },
        closeProfileHandler: (state) => {
            state.isProfileHandlerOpen = false
        }
    }
})

export const portalActions = portalSlice.actions;

const store = configureStore({
    reducer: {
        portal : portalSlice.reducer,
        agents: agentSlice.reducer,
        filter: filterSlice.reducer,
        profile: profileSlice.reducer
    }
})

export default store