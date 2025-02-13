import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    access_token: '',
    refresh_token: '',
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.access_token = action.payload.access_token
            state.refresh_token = action.payload.refresh_token
        },

        updateToken: (state, action) => {
            state.access_token = action.payload.access_token
        },

        logOut:(state) => {
            state.access_token = null
            state.refresh_token = null
        }
    }
})

export const {setCredentials, logOut, updateToken} = authSlice.actions;
export default authSlice.reducer