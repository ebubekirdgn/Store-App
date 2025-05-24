import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requests from "../../api/apiClient";
import { router } from "../../App";
import { STATUS } from "../../utils/constants";

const initialState = {
  user: null,
  status: STATUS.IDLE,
};

export const loginUser = createAsyncThunk(
  "account/login",
  async (data, thunkAPI) => {
    try {
      const user = await requests.account.login(data);
      localStorage.setItem("user", JSON.stringify(user));
      router.navigate("/");
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

export const registerUser = createAsyncThunk(
  "account/register",
  async (data, thunkAPI) => {
    try {
      await requests.account.register(data);
      router.navigate("/login");
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

export const getUser = createAsyncThunk(
  "account/getUser",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem("user"))));
    try {
      const user = await requests.account.getUser();
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue({ message });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem("user")) return false;
    },
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      router.navigate("/login");
    },
  },
  extraReducers: (builder) => {
    // FOR LOGIN
    builder.addCase(loginUser.pending, (state) => {
      state.status = STATUS.PENDING;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = STATUS.IDLE;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.status = STATUS.IDLE;
    });

    // FOR REGISTER
    builder.addCase(registerUser.pending, (state) => {
      state.status = STATUS.PENDING;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.status = STATUS.IDLE;
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.status = STATUS.IDLE;
    });

    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.user = null;
      localStorage.removeItem("user");
      router.navigate("/login");
    });
  },
});

export const { setUser, logout } = accountSlice.actions;
export default accountSlice.reducer;
