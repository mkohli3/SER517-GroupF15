import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CSVUpdate() {
    const navigate = useNavigate();
    const [criteriaList, setCriteriaList] = useState([]);
        

    const handleSaveButtonClick = () => {
        navigate('/main-screen', { state: { criteriaList : criteriaList } }); // Navigate to '/main-screen' when the button is clicked
    };

    return (
        <>
            {/* Button for saving criteria */}
            <Button
                type="button"
                className="button"
                variant="contained"
                color="primary"
                onClick={handleSaveButtonClick} // Invoke handleSaveButtonClick when this button is clicked
                style={{ margin: '20px 0' }}
            >
                Save Criteria
            </Button>
        </>
    );
}

export default CSVUpdate;
