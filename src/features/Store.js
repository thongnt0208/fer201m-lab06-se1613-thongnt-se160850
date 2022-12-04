import { createSlice } from "@reduxjs/toolkit";


//Redux state slice (create redux store)
export const userSlice = createSlice({
    name: "users",
    initialState: { value: [{ name: 'ahf', avatar: "hhhhh" }] },
    reducers: {
        refreshData: (state, action) => {
            console.log("RefreshData", action.payload);
            if (action.payload != null) { state.value.splice(0, state.value.length); }
            state.value.push(...action.payload);//... is REST technique
        },
        addUser: (state, action) => { // Write code for addUser function
            state.value.push(action.payload);
        },
        deleteUser: (state, action) => { // Write code for deleteUser fuction
            console.log('deleteUser', action.payload);
            let index = -1;
            let tmp = 0;
            state.value.map((user) =>
                user.user_id === action.payload.user_id
                    ? index = tmp
                    : tmp++
            )
            state.value.splice(index, 1);
        },
        updateUser: (state, action) => { // Write code for updateUser function
            console.log('Update', action.payload);
            let index = -1;
            let tmp = 0;
            state.value.map((user) =>
                user.user_id === action.payload.user_id
                    ? index = tmp
                    : tmp++
            )
            state.value.splice(index, 1, action.payload);

        }
    }
});
//export reducer
export default userSlice.reducer;
//export actions
export const { refreshData, addUser, deleteUser, updateUser } = userSlice.actions;
