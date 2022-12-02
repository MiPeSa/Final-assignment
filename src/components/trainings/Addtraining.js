import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import MenuItem from '@mui/material/MenuItem';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function Addtraining(props) {

    const [customer, setCustomer] = useState([]);
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        customer: '', date: (null), duration: '', activity: ''
    })

    useEffect(() => fetchData(), []);
    
    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomer(data.content))
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
  
    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e) => {
        setTraining({...training, [e.target.name]: e.target.value})
    }

    const addNewTraining = () => {
        props.saveTraining(training);
        handleClose();
    }

    const changeDate = (date) => {
        setTraining({...training, date})
      }

    return(
        <div className="Addcustomer-button">
            <Box textAlign='left'>
                <Button style={{margin: 10, marginBottom: 0}} color="primary" size="medium" variant="contained" endIcon={<AddBoxRoundedIcon fontSize='small'/>} onClick={handleClickOpen}>
                    Add new Training
                </Button>
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Training</DialogTitle>
                <DialogContent>
                    <TextField
                        id="standard-select-currency"
                        select
                        name="customer"
                        label="Customer Name"
                        value={training.customer}
                        onChange={e => handleInputChange(e)}
                        helperText="Please select customer from the list"
                        fullWidth
                        variant="standard"
                    >
                    {customer.map((data) => (
                        <MenuItem key={data.links[1].href} value={data.links[1].href}>
                        {data.firstname} {data.lastname}
                        </MenuItem>
                    ))}
                    </TextField>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        label="Date" 
                        variant="standard"
                        name="date"
                        imputFormat="MM/DD/YYYY HH:mm"
                        value={training.date}
                        onChange={date => changeDate(date)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    </LocalizationProvider>              
                    <TextField
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        onChange={e => handleInputChange(e)}
                        label="Duration"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="activity"
                        value={training.activity}
                        onChange={e => handleInputChange(e)}
                        label="Activity"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addNewTraining}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}