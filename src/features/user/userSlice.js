import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Login user thunk
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5500/users/login",
        data
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        return rejectWithValue(error);
      }
      return rejectWithValue(error.response.data);
    }
  }
);

// Register user thunk
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/users/signup", data);
      return response.data;
    } catch (error) {
      if (!error.response) {
        return rejectWithValue(error);
      }
      return rejectWithValue(error.response.data);
    }
  }
);

// Forgot password thunk
export const forgetPasswordRequest = createAsyncThunk(
  "user/forgetPasswordRequest",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/users/forgetPassword", data);
      return response.data;
    } catch (error) {
      if (!error.response) {
        return rejectWithValue(error);
      }
      return rejectWithValue(error.response.data);
    }
  }
);

// Reset password thunk
export const resetPasswordRequest = createAsyncThunk(
  "user/resetPasswordRequest",
  async (data, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
      const email = params.get("email");
      const response = await axios.put(
        `/users/resetPassword/${token}/${email}`,
        data
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        return rejectWithValue(error);
      }
      return rejectWithValue(error.response.data);
    }
  }
);

// Refresh Token and accessToken api call;

export const refreshTokenRequest = createAsyncThunk(
  "user/refreshTokenRequest",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/users/renewToken/${id}`);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    error: null,
    registeruser: null,
    forgetpassword: null,
    resetpassword: null,
  },
  reducers: {},
  extraReducers: {
    // Login user request
    [loginUser.pending]: (state) => {
      state.status = "loading";
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.user = payload.accessToken;
      state.status = "success";
      localStorage.setItem("token", state.user);
    },

    [loginUser.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.error = payload.error || payload.toString();
    },

    // Register user request
    [registerUser.pending]: (state) => {
      state.status = "loading";
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.registeruser = payload.message;
      state.status = "success";
    },

    [registerUser.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.error = payload.error || payload.toString();
    },

    // Forgot password Request
    [forgetPasswordRequest.pending]: (state) => {
      state.status = "loading";
    },
    [forgetPasswordRequest.fulfilled]: (state, { payload }) => {
      state.forgetpassword = payload.message;
      state.status = "success";
    },

    [forgetPasswordRequest.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.error = payload.error || payload.toString();
    },

    // Reset Password Request
    [resetPasswordRequest.pending]: (state) => {
      state.status = "loading";
    },
    [resetPasswordRequest.fulfilled]: (state, { payload }) => {
      state.resetpassword = payload.message;
      state.status = "success";
    },

    [resetPasswordRequest.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.error = payload.error || payload.toString();
    },
    // Refresh Token Request
    [refreshTokenRequest.pending]: (state) => {
      state.status = "loading";
    },
    [refreshTokenRequest.fulfilled]: (state, { payload }) => {
      state.user = payload.accessToken;
      state.status = "success";
      localStorage.setItem("token", state.user);
    },

    [refreshTokenRequest.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.error = payload.error || payload.toString();
    },
  },
});

export const userSelector = (state) => state.user;

export default userSlice.reducer;
