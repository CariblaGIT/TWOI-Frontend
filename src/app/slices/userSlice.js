import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
      credentials: {}
    },
    reducers: {
      login: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      },
      logout: (state, action) => {
        return {
          ...state,
          credentials: null
        }
      },
      achievement: (state, action) => {
        return {
            ...state,
            ...action.payload
        }
      },
      character: (state, action) => {
        return {
            ...state,
            ...action.payload
        }
      },
      profile: (state, action) => {
        return {
            ...state,
            ...action.payload
        }
      }
    }

});

export const { login, logout, achievement, character, profile } = userSlice.actions;

export const userData = (state) => state.user;

export default userSlice.reducer;