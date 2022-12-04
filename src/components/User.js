import { Avatar, Box, Button, Grid, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, updateUser } from '../features/Store';

//This function to display the current state's data of the redux store
export default function User() {
    const users = useSelector((state) => state.users.value)
    const baseURL = `https://6336fae365d1e8ef2677835f.mockapi.io/users`;
    const dispatch = useDispatch();
    return (
            <Grid item xs={8} sm={4} sx={{
                '& > :not(style)': {
                    m: 1,
                    pl: 8,
                },
            }}>
                {users.map(user => (
                    <Box>
                        <Box id='users-container'>
                            <Avatar
                                alt={user.name}
                                src={user.avatar}
                                sx={{ width: 80, height: 80 }}
                            />
                            ID: {user.user_id} -
                            Name: {user.name}
                            {/* Delete button */}
                            <Button
                                onClick={
                                    () => {
                                        if (window.confirm(`You want to delete ${user.name}?`)) {
                                            dispatch(deleteUser(user));
                                            fetch(baseURL + '/' + user.user_id, {
                                                method: 'DELETE'
                                            }).then(response => {
                                                if (!response.ok) {
                                                    throw new Error(`HTTP Status: ${response.status}`)
                                                }
                                                return response.json()
                                            })
                                                .catch(error => console.log(error.message));
                                        };

                                    }}
                            >
                                Delete
                            </Button>

                            {/* Update button */}
                            <Button
                                onClick={
                                    () => {
                                        document.querySelector(`#user-id-${user.user_id}`).classList.remove("hideThis")
                                    }}
                            >
                                Update</Button>
                        </Box>

                        <div id='popup-container'>
                            <Box id={"user-id-" + user.user_id} className='hideThis'>
                                <form>
                                    <Avatar
                                        alt={user.name}
                                        src={user.avatar}
                                        sx={{ width: 80, height: 80 }}
                                    />

                                    <TextField
                                        id={"user-avt-" + user.user_id}
                                        margin="dense"
                                        name="avatar"
                                        label="Avatar link"
                                        type="url"
                                        fullWidth
                                        defaultValue={user.avatar}
                                    />
                                    <p>{user.avatar}</p>

                                    <TextField
                                        id={"user-name-" + user.user_id}
                                        margin="dense"
                                        name="name"
                                        label="Name"
                                        type="text"
                                        fullWidth
                                        defaultValue={user.name}
                                    />

                                    {/* Cancel button */}
                                    <Button
                                        onClick={
                                            () => {
                                                document.querySelector(`#user-id-${user.user_id}`).classList.add("hideThis")
                                            }}
                                    >
                                        Cancel
                                    </Button>

                                    {/* Apply button */}
                                    <Button
                                        onClick={
                                            () => {
                                                let newAvatarLink = document.querySelector(`#user-avt-${user.user_id}`).value;
                                                console.log(newAvatarLink);
                                                let newName = document.querySelector(`#user-name-${user.user_id}`).value;
                                                let newUser = { user_id: user.user_id, name: newName, avatar: newAvatarLink };
                                                // console.log('ApplyUpdate: ', newUser);

                                                dispatch(updateUser(newUser));
                                                fetch(baseURL + '/' + user.user_id, {
                                                    method: 'PUT',
                                                    headers: { "Content-Type": "application/json" },
                                                    body: JSON.stringify(newUser)
                                                }).then(response => {
                                                    if (!response.ok) {
                                                        throw new Error(`HTTP Status: ${response.status}`)
                                                    }
                                                    else {
                                                        document.querySelector(`#user-id-${user.user_id}`).classList.add("hideThis")
                                                    }
                                                    return response.json()
                                                })
                                                    .catch(error => console.log("Update fail cause: ", error.message));



                                            }}
                                    >
                                        Apply
                                    </Button>
                                </form>
                            </Box>
                        </div>

                    </Box>
                ))}
        </Grid>
    )
}