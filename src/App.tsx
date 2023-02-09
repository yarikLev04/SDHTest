import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFns';
import { GlobalStyles } from 'src/theme/GlobalStyles';
import { RouterProvider } from 'react-router-dom';
import { router } from 'src/routes/router';
import { useAxiosInterceptors } from 'src/utils/axios';

function App() {
    useAxiosInterceptors();

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <GlobalStyles />
            <RouterProvider router={router} />
        </LocalizationProvider>
  )
}

export default App;
