import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Stack,
    Typography
} from '@mui/material';
import { BackButton } from './BackButton';


export function Page404() {
    return (
        <Card sx={{ p: 2, height: 'calc(100vh - 32px)' }}>
            <CardActions >
                <BackButton />
            </CardActions>
            <Stack direction='column' justifyContent='center' sx={{ height: '100%' }}>
                <Stack px={3} py={2} spacing={2} direction='row' justifyContent={'center'}>
                    <CardHeader title='Oops!' />
                </Stack>
                <CardContent>
                    <Stack px={3} py={2} spacing={2} direction='column' alignItems={'center'}>
                        <Typography>Sorry, an unexpected error has occurred.</Typography>
                        <Typography variant='inherit'>Not Found</Typography>
                    </Stack>
                </CardContent>
            </Stack>
        </Card>
    );
}
