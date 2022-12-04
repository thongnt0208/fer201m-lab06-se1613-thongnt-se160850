import { Grid } from '@mui/material';
import './App.css';
import AddUser from './components/AddUser';
import User from './components/User';
import GetDataFromDb from './features/GetDataFromDb';
// import Contact from './components/contact';

function App() {
  return (
    <>
      <GetDataFromDb></GetDataFromDb>
      <Grid container spacing={2} id="bigContainer">
        <Grid item xs={2}></Grid>
        <AddUser></AddUser>
        <User></User>
        <Grid item xs={2}></Grid>
      </Grid>

    </>
  );
}

export default App;
