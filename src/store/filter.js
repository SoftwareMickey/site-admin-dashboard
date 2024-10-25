import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        isFilterModalOpen: false
    },
    reducers: {
        openFilterModal: (state) => {
            state.isFilterModalOpen = true

            console.log('Filter modal has been opened...!')
        },
        closeFilterModal: (state) => {
            state.isFilterModalOpen = false;
        }
    }
})

export const filterActions = filterSlice.actions;
export default filterSlice;