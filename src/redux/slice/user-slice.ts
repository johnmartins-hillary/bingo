import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

interface User {
	name: string;
	email: string;
}

const initialState: User = {
	name: "",
	email: "",
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			state.name = action.payload.name;
			state.email = action.payload.email;
		},
	},
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
