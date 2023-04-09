import { createSlice } from "@reduxjs/toolkit";
import { request } from "../../api/request";



const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState: {
    loading: false,
    users: [],
  },
  reducers: {
    getUsers(state, action) {
      return { ...state, users: action.payload };
    },
    setLoading(state, action) {
      return { ...state, loading: action.payload };
    },
  },
});

export default leaderboardSlice.reducer;
export const { getUsers, setLoading } = leaderboardSlice.actions;

export function fetchUsers() {
  return async function fetchUsersThunk(dispatch, getState) {
    dispatch(setLoading(true));
    let response=await request("GET","/fetchUsers");
  
    if(response.success){
      dispatch(getUsers(response.data));
    }
    dispatch(setLoading(false));
  };
}
