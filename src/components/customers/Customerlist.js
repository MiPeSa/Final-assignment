import React, { useState, useEffect } from "react";
import { AgGridReact } from'ag-grid-react'
import'ag-grid-community/dist/styles/ag-grid.css'
import'ag-grid-community/dist/styles/ag-theme-material.css';
import Addcustomer from "./Addcustomer";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Editcustomer from "./Editcustomer";
import Deletecustomer from "./Deletecustomer";

export default function Customerslist() {

    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    
    useEffect(() => fetchData(), []);
    
    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
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

    const saveCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
        setMessage('New Customer added');
        handleClick();
    }

    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
            .then(res => fetchData())
            .catch(err => console.error(err))
            setMessage('Customer details updated');
            handleClick();
        }
    
    const deleteCustomer = (link) => {
        fetch(link, {
            method: 'DELETE'
        })
            .then(res => fetchData())
            .catch(err => console.error(err))
            setMessage("Customer Deleted");
            handleClick();
    }
    
    const columns = [
            {
                headerName: 'Name', field: 'fullname', valueGetter(params) {
                    return params.data.firstname + ' ' + params.data.lastname;
                }, 
                suppressMenu: true,
                floatingFilter: true,
                sortable: true, 
                filter: 'agTextColumnFilter'
            },
            {
                headerName: 'Address', field: 'fulladdress', valueGetter(params) {
                    return params.data.streetaddress + ', ' + params.data.postcode + ' ' + params.data.city;
                }, 
                suppressMenu: true, 
                floatingFilter: true, 
                sortable: true, 
                filter: 'agTextColumnFilter'
            },
            {
                headerName: 'Email', 
                field: 'email', 
                floatingFilter: true, 
                sortable: true, 
                filter: 'agTextColumnFilter', 
                suppressMenu: true
            },
            {
                headerName: 'Phone', 
                field: 'phone', 
                floatingFilter: true, 
                sortable: true, 
                filter: 'agTextColumnFilter', 
                suppressMenu: true
            },
            {
                width: 100,
                headerName: 'Edit',
                field: 'links.1.href',
                cellRenderer: row => <Editcustomer updateCustomer={updateCustomer} customer={row.data} />
            },
            {
                width: 130,
                headerName: 'Delete',
                field: 'links.1.href',
                cellRenderer: row => <Deletecustomer deleteCustomer={deleteCustomer} customer={row.data} />
            },
        ]


    return (
        <div className="tablecontent">
            <div className="ag-theme-material"
                style={{height: '90vh', width: '100%', margin: 10}} >
            <Addcustomer saveCustomer={saveCustomer} />
            <AgGridReact
                rowSelection="single"
                columnDefs={columns}
                rowData={customers}
                animateRows={true}
                enableColResize={true}
                onGridReady= {function(params) {
                    params.api.sizeColumnsToFit();
                }}
            ></AgGridReact>
            <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                message={message}
                action={action}
            />
            </div>
        </div>
    );
}