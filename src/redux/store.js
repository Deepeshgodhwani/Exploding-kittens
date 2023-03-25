import { configureStore } from "@reduxjs/toolkit";
import leaderboardReducer from "./slice/leaderboardSlice";
import userReducer from "./slice/userSlice";





const store= configureStore({
     reducer:{
         user:userReducer,
         leaderboard:leaderboardReducer
     }
})


export default store;