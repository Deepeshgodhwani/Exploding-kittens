import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "./leaderboardSlice";
import io from "socket.io-client";
const ENDPOINT = "localhost:4000";
const URL=process.env.REACT_APP_USER_API;
var socket;

const userSlice = createSlice({
  name: "user",
  initialState: {
    defuseCards: [],
    openedCard: "",
    deck: [],
  },
  reducers: {
    get_user(state, action) {
      if (action.payload.deck) {
        return action.payload;
      } else {
        return {
          ...state,
          username: action.payload.username,
          matchesWon: action.payload.matchesWon,
        };
      }
    },
    save_won_game(state, action) {
      return { ...state, user: action.payload };
    },
  },
});

export default userSlice.reducer;
export const { get_user, save_won_game } = userSlice.actions;

export function getUserDetail() {
  return async function getUserDataThunk(dispatch, getstate) {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      fetch(`${URL}updateUser/${user.username}`, {
        method: "get",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (response) => {
          let result = await response.json();
          dispatch(get_user(result?.data));
        })
        .catch((error) => {
            console.log("Internal server error" ,error)
        });
    } else {
      dispatch(get_user(user));
    }
  };
}

export function editUserDetail(userData) {
  return async function editUserDataThunk(dispatch, getstate) {
    localStorage.setItem("user", JSON.stringify(userData));
    dispatch(get_user(userData));
  };
}

export function updateUserPoints(userData) {
  return async function updateUserPointsThunk(dispatch, getstate) {
    fetch(`${URL}updateUser`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userData.username,
        matchesWon: userData.matchesWon,
      }),
    })
      .then(() => {
        socket = io(ENDPOINT);
        dispatch(fetchUsers());
        socket.emit("updateLeaderBoard");
      })
      .catch((err) => {
        console.log("Internal server error" ,err)
      });
  };
}
