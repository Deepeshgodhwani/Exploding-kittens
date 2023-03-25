
import { createSlice } from "@reduxjs/toolkit";


const leaderboardSlice  = createSlice({
    name:'leaderboard',
    initialState:[],
    reducers:{
        getLeaderboard(state,action){
            return {
                ...state,
                users: action.payload,
              };
        }
    }

})



export default leaderboardSlice.reducer;
export const {getLeaderboard} =leaderboardSlice.actions;



export function fetchUsers (){
       
       return async function fetchUsersThunk(dispatch,getState){
              
                try {
                    
                } catch (error) {
                    let users=await fetch(`http://localhost:8000/api/users/fetchUsers`,{
                        method:'get',
                        mode: "cors",
                        headers:{
                            "Content-Type": "application/json",
                    }
                    })
                
                }
       }
}


