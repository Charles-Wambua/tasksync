import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from 'uuid'; 
function Form() {
    const [formValues, setFormValues] = useState({
        id: '',
        firstName: '',
        lastName: '',
        description: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const newRecord = {
            ...formValues,
            id: uuidv4()
        };
        console.log('Form Submitted:', newRecord);
        setFormValues({
            id: '',
            firstName: '',
            lastName: '',
            description: ''
        });
    };

    return (
        <div>
            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <TextField
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    variant="outlined"
                    value={formValues.firstName}
                    onChange={handleChange}
                />
                <TextField
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    variant="outlined"
                    value={formValues.lastName}
                    onChange={handleChange}
                />
                <TextField
                    id="description"
                    name="description"
                    label="Description"
                    variant="outlined"
                    value={formValues.description}
                    onChange={handleChange}
                />
                <Button type="submit" variant="contained">Submit</Button>
            </Box>
        </div>
    );
}

export default Form;
