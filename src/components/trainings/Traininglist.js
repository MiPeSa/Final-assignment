import React, { useState, useEffect } from "react";
import { AgGridReact } from'ag-grid-react';
import'ag-grid-community/dist/styles/ag-grid.css';
import'ag-grid-community/dist/styles/ag-theme-material.css';
import dayjs from 'dayjs';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Addtraining from "./Addtraining";
import Deletetraining from "./Deletetraining";

export default function Traininglist() {

        const [trainings, setTrainings] = useState([]);
        const [open, setOpen] = useState(false);
        const [message, setMessage] = useState('');
    
        useEffect(() => fetchData(), []);
        
        const fetchData = () => {
            fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
        }

        const handleClick = () => {
          setOpen(true);
        };
  
        const handleClose = (event, reason) => {
            if (reason === 'clickaway') {
                return;
            }
            setOpen(false);
        };
  
        const action = (
          <React.Fragment>
              <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={handleClose}
              >
              <CloseIcon fontSize="small" />
              </IconButton>
          </React.Fragment>
        );
        
        const dayjs = require('dayjs');

        const filterParams = {
            comparator: (filterLocalDateAtMidnight, cellValue) => {
              const dateAsString = dayjs(cellValue).format('DD/MM/YYYY');
              if (dateAsString == null) return -1;
              const dateParts = dateAsString.split('/');
              const cellDate = new Date(
                Number(dateParts[2]),
                Number(dateParts[1]) - 1,
                Number(dateParts[0])
              );
          
              if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
                return 0;
              }
          
              if (cellDate < filterLocalDateAtMidnight) {
                return -1;
              }
          
              if (cellDate > filterLocalDateAtMidnight) {
                return 1;
              }
            },
            browserDatePicker: true,
            minValidYear: 2020,
            maxValidYear: 2022,
            inRangeFloatingFilterDateFormat: 'DD.MM.YYYY',
          };

        const addMinRenderer = function(params) {
            return params.value+' min';
        }


        const saveTraining = (training) => {
            fetch('https://customerrest.herokuapp.com/api/trainings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(training)
            })
            .then(res => fetchData())
            .catch(err => console.error(err))
            setMessage('New Training added');
            handleClick();
        }

        const deleteTraining = (id) => {
            fetch('https://customerrest.herokuapp.com/api/trainings/' + (id), {
                method: 'DELETE'
            })
                .then(res => fetchData())
                .catch(err => console.error(err))
                setMessage("Training Deleted");
                handleClick();
        }

        const columns = [
                {
                    headerName: 'Name', field: 'fullname', 
                    valueGetter(params) {
                        return params.data.customer.firstname + ' ' + params.data.customer.lastname;
                    }, 
                    suppressMenu: true, 
                    floatingFilter: true, 
                    sortable: true, 
                    filter: 'agTextColumnFilter'
                },
                {
                    headerName: 'Duration', 
                    field: 'duration', 
                    floatingFilter: true, 
                    sortable: true, 
                    filter: 'agTextColumnFilter', 
                    suppressMenu: true,
                    cellRenderer: addMinRenderer
                },
                {
                    headerName: 'Activity', 
                    field: 'activity', 
                    floatingFilter: true, 
                    sortable: true, 
                    filter: 'agTextColumnFilter', 
                    suppressMenu: true
                },
                { 
                    headerName: 'Date', 
                    field: 'date', 
                    floatingFilter: true, 
                    sortable: true, 
                    filter: 'agDateColumnFilter', 
                    suppressMenu: true, 
                    valueFormatter: function(params) {
                        return dayjs(params.value).format('D.MM.YYYY, HH:mm');
                    },
                    filterParams: filterParams
                },
                {
                    width: 130,
                    headerName: 'Delete',
                    field: 'id',
                    cellRenderer: row => <Deletetraining deleteTraining={deleteTraining} id={row.data.id} />
                },
        ]
        return (
            <div className="tablecontent">
                <div className="ag-theme-material"
                    style={{height: '90vh', width: '100%', margin: 10}} >
                <Addtraining saveTraining={saveTraining} />
                <AgGridReact
                    rowSelection="single"
                    columnDefs={columns}
                    rowData={trainings}
                    animateRows={true}
                    enableColResize={true}
                    onGridReady= {function(params) {
                        params.api.sizeColumnsToFit();
                    }}
                ></AgGridReact>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={message}
                    action={action}
                />
                </div>
            </div>
        );
}