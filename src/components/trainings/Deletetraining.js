import React from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Deletetraining(props) {
  
    const handleClick  = () => {
        if (window.confirm('Are you sure?')){
          props.deleteTraining(props.id);
        }
    };
 
    return (
    <div className="Deletecustomer-button">
        <Box >
        <Button style={{}} color="error" size="small" variant="outlined" endIcon={<DeleteIcon fontSize="small" />} onClick={handleClick}>
            Delete
        </Button>
        </Box>
    </div>
    );
};