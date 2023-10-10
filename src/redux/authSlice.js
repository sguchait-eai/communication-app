import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    status: "idle",
    isLoggedIn: false,
    user: {},
    profile: {},
    userStatus: "idle",
    users: [],
};

const serverUrl = `http://localhost:5001`;

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (userData) => {
      const { data } = await axios.post(`${serverUrl}/login`, userData);
      return data;
    }
);

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (userData) => {
      const { data } = await axios.post(`${serverUrl}/signup`, userData);
      return data;
    }
  );

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      setAuth: (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      },
      logout: (state, action) => {
        localStorage.clear();
        state.isLoggedIn = false;
        axios.defaults.headers.common["authorization"] = null;
      },
      setUser: (state, action) => {
        state.user = action.payload;
      },
    },
    extraReducers: {
      [loginUser.pending]: (state, action) => {
        state.status = "loading";
      },
      [loginUser.fulfilled]: (state, action) => {
        console.log(action)
        const { token,user } = action.payload;
        localStorage.setItem(
          "login",
          JSON.stringify({ token, user, isLoggedIn: true })
        );
        state.user= user;
        state.status = "success";
        state.isLoggedIn = true;
      },
      [loginUser.rejected]: (state, action) => {
        state.status = "failed";
        state.isLoggedIn = false;
      },
      [registerUser.pending]: (state, action) => {
        state.status = "loading";
      },
      [registerUser.fulfilled]: (state, action) => {
        state.status = "success";
        state.isLoggedIn = false;
      },
      [registerUser.rejected]: (state, action) => {
        state.status = "failed";
        state.isLoggedIn = false;
      },
    },
  });
  
  export default authSlice.reducer;
  export const { setAuth, logout } = authSlice.actions;