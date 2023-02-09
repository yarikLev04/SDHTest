import { Iconify } from './Iconify';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function BackButton() {
    const navigate = useNavigate();

    return (
        <Button size='large' sx={{ color: 'black' }} onClick={() => navigate('/users')}>
            <Iconify icon={'material-symbols:arrow-back-rounded'} width={'20px'} height={'20px'} />
            <Typography sx={{ marginLeft: 1 }} variant='body2'>Back to main page</Typography>
        </Button>
    );
}
