import { TextField, Button, Typography, Grid, Paper } from "@mui/material";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react'
import { addUser } from '../features/Store';
import { useDispatch } from 'react-redux';


export default function AddUser() {
    const dispatch = useDispatch();
    const baseURL = `https://6336fae365d1e8ef2677835f.mockapi.io/users`;
    const formik = useFormik({
        initialValues: {
            name: "",
            avatar: "",
            created_date: "",
        },
        onSubmit: (values) => {
            fetch(baseURL, {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'same-origin'
            }).then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP Status: ${response.status}`)
                }
                return response.json()
            })
                // .then(data => setOpen(true))
                .catch(error => console.log(error.message));

        },

        validationSchema: Yup.object({
            name: Yup.string().required("Required.").min(2, "Must be 2 characters or more"),
            avatar: Yup.string().required("Required.").min(2, "Must be 2 characters or more"),
            created_date: Yup.string().required("Required.").min(2, "Must be 2 characters or more"),
        }),
    });
    // const [open, setOpen] = useState(false);
    // const handleClose = () => {
    //     setOpen(false);
    // };

    return (
        <Grid item xs={8} sm={4}>
            <Paper id="form-paper-container" elevation={3} sx={{
                '& > :not(style)': {
                    m: 1,
                    p: 5,
                },
            }}>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.name && (<Typography variant="caption" color="red">{formik.errors.name}</Typography>)}
                    <TextField
                        margin="dense"
                        name="avatar"
                        label="Avatar link"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={formik.values.avatar}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.avatar && (<Typography variant="caption" color="red">{formik.errors.avatar}</Typography>)}
                    <TextField
                        margin="dense"
                        name="created_date"
                        label="Created date"
                        type="date"
                        fullWidth
                        variant="standard"
                        value={formik.values.created_date}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.created_date && (<Typography variant="caption" color="red">{formik.errors.created_date}</Typography>)}

                    <Button variant="contained" size="small" type='submit'
                        onClick={() => {
                            dispatch(addUser({ name: formik.values.name, avatar: formik.values.avatar, created_date: formik.values.created_date }));
                            // setTimeout(GetDataFromDb(), 3000);
                        }}>
                        Add</Button>
                </form>
            </Paper>
        </Grid>
    )
}