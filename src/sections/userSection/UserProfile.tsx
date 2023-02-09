import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Grid,
    Stack,
    Tooltip,
    Typography
} from '@mui/material';
import { BackButton } from 'src/components/BackButton';
import { DeleteDialogWindow } from 'src/components/DeleteDialogWindow';
import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom'
import { User } from 'src/@types/users/types';
import { deleteUser, getUser } from 'src/redux/slices/users';;

export function UserProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [user, setUser] = useState<User | null>(null);
    const [onDeleteUserId, setOnDeleteUserId] = useState(0);

    useEffect(() => {
        setUserById();
    }, []);

    const setUserById = async () => {
        const response = await getUser(id);
        setUser(response)
    }

    const openDeleteUserDialog = (id: number) => {
        setOnDeleteUserId(id);
    }

    const handleDeleteUser = async () => {
        await deleteUser(onDeleteUserId);
        setOnDeleteUserId(0);
        enqueueSnackbar('User successfully deleted', { variant: 'success' });
        navigate('/users')
    }

    return (
        <Card sx={{ p: 5, height: 'calc(100vh - 32px)' }}>
            {!!onDeleteUserId &&
				<DeleteDialogWindow
					open={!!onDeleteUserId}
					onClose={() => setOnDeleteUserId(0)}
					handleDelete={handleDeleteUser}
					title='Warning'
					description='Are you sure you would like to delete this user?' />}
            <Stack direction='row' justifyContent={'space-between'} >
                <BackButton />
                <Stack direction='row' spacing={3}>
                    <Button variant={'outlined'} color={'error'} onClick={() => openDeleteUserDialog(user?.id as number)}>Delete</Button>
                    <Button variant={'contained'} color={'success'} onClick={() => navigate(`/users/${user?.id}`)}>Update</Button>
                </Stack>
            </Stack>
            <Stack px={3} py={2} direction='row' justifyContent={'center'} alignItems={'center'}>
                <CardHeader title={`${user?.first_name} ${user?.last_name} Profile`}/>
                <Chip
                    size='small'
                    sx={{ fontSize: '1rem' }}
                    color={user?.is_active ? 'success' : 'warning'}
                    label={user?.is_active ? 'Active' : 'Inactive'}
                />
            </Stack>
            <CardContent>
                <Grid container justifyContent={'center'} spacing={3}>
                    <Grid item xs={6}>
                        <Typography variant='h6'>First name: {user?.first_name}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='h6'>Last name: {user?.last_name}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='h6'>Date of birth: {user?.birth_date}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='h6'>Gender: {user?.gender}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='h6'>Job: {user?.job}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Tooltip title={user?.biography}>
                            <Typography sx={{ wordBreak: "break-all" }} variant='h6'>
                                Biography: {user?.biography.length as number > 150 ? user?.biography.slice(0, 150) + '...' : user?.biography }
                            </Typography>
                        </Tooltip>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
