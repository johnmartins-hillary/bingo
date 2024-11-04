import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
	user: any;
	isAuthenticated: boolean;
}

const initialState: AuthState = {
	user: null,
	isAuthenticated: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login(state, action) {
			state.user = action.payload;
			state.isAuthenticated = true;
		},
		logout(state) {
			state.user = null;
			state.isAuthenticated = false;
		},
		setUser(state, action) {
			state.user = action.payload;
		},
	},
});

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
