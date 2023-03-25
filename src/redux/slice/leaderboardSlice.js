import { createSlice } from "@reduxjs/toolkit";
const URL=process.env.REACT_APP_USER_API;


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
    try {
      dispatch(setLoading(true));
      let response = await fetch(`${URL}fetchUsers`, {
        method: "get",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });

      let data = await response.json();
      dispatch(getUsers(data.data));
      dispatch(setLoading(false));
    } catch (error) {
        console.log("Internal server error" ,error)
    }
  };
}
