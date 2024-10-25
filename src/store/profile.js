import { createSlice } from "@reduxjs/toolkit";
import bg from './assets/bg.png'
import user from './assets/user.png'

const profileSlice = createSlice({
    name: 'profile-slice',
    initialState: {
        userName: 'Tony Mwirigi',
        userEmail: '',
        savedImage: bg,
        defaultImage: user,
        isProfileChanged: false
    },
    reducers: {
        updateUserProfileHandler: (state, action) => {
            const receivedName = action.payload;

            console.log(`Received User Name: ${receivedName}`)
            state.userName = receivedName;
        },
        updateUserImageHandler: (state, action) => {
            const receivedImage = action.payload;

            console.log(`Image received from the user: ${receivedImage}`)
            state.savedImage = receivedImage;
        },
        setProfileHandler: (state) => {
            state.isProfileChanged = true;
        }
    }
})

export const profileActions = profileSlice.actions;
export default profileSlice;