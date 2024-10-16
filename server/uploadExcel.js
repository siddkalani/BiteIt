const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

// Path to your Excel file
const excelFilePath = path.join(__dirname, 'public', 'faculty.xlsx'); // Adjust the path accordingly

const uploadExcelFile = async () => {
    // Create a FormData instance
    const form = new FormData();

    // Append the Excel file
    form.append('file', fs.createReadStream(excelFilePath));

    try {
        const response = await axios.post('http://localhost:3000/faculty/upload', form, {
            headers: {
                ...form.getHeaders(), 
            },
        });

        console.log('Response from server:', response.data);
    } catch (error) {
        console.error('Error uploading Excel file:', error.response ? error.response.data : error.message);
    console.error('Full error object:', error);
    }
};

uploadExcelFile();
