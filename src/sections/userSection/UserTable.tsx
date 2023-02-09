import { useSelector } from 'src/redux/store';
import React, { useEffect, useState } from 'react';
import { deleteUser, getUsers } from 'src/redux/slices/users';
import {
    Button,
    Card,
    CardHeader, IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import { User } from 'src/@types/users/types';
import { Iconify } from 'src/components/Iconify';
import { useSnackbar } from 'notistack';
import { DeleteDialogWindow } from 'src/components/DeleteDialogWindow';
import { useNavigate } from 'react-router-dom';

export const UserTable = () => {
    const { users, isLoading } = useSelector(state => state.users);
    const { enqueueSnackbar } = useSnackbar();
    const [onDeleteUserId, setOnDeleteUserId] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        getUsers();
    }, []);

    const openDeleteUserDialog = (id: number) => {
        setOnDeleteUserId(id);
    }

    const handleDeleteUser = async () => {
        await deleteUser(onDeleteUserId);
        setOnDeleteUserId(0);
        enqueueSnackbar('User successfully deleted', { variant: 'success' });
        await getUsers();
    }

    return (
        <Card>
            {!!onDeleteUserId &&
                <DeleteDialogWindow
                    open={!!onDeleteUserId}
                    onClose={() => setOnDeleteUserId(0)}
                    handleDelete={handleDeleteUser}
                    title='Warning'
                    description='Are you sure you would like to delete this user?' />}
            <Stack px={3} py={2} spacing={2} direction='row' justifyContent={'space-between'}>
                <CardHeader title='Users' sx={{ p: 0 }} />
                <Button disabled={isLoading} variant='contained' size='large' sx={{ paddingX: 6 }} onClick={() => navigate('createUser')}>
                    Add user
                </Button>
            </Stack>
            <TableContainer>
                <Table>
                    <TableHead sx={{ bgcolor: 'lightblue' }}>
                        <TableRow>
                            <TableCell align='center'>Full Name</TableCell>
                            <TableCell align='center'>Date of birth</TableCell>
                            <TableCell align='center'>Gender</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users?.map(user => <UserRow user={user} key={user.id} handleOpenDeleteDialog={openDeleteUserDialog} />)}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );
};

type UserRowProps = {
    user: User,
    handleOpenDeleteDialog: (id: number) => void
};

const UserRow = ({ user, handleOpenDeleteDialog }: UserRowProps) => {
    const navigate = useNavigate();
    const { isLoading } = useSelector(state => state.users);

    return (
        <TableRow sx={{cursor: 'pointer'}} onClick={() => navigate(`${user.id}/profile`)}>
            <TableCell align='center'>{user.first_name} {user.last_name}</TableCell>
            <TableCell align='center'>{user?.birth_date?.toString()}</TableCell>
            <TableCell align='center'>{user.gender}</TableCell>
            <TableCell align='right'>
                <IconButton disabled={isLoading} size='large' onClick={(event) => {
                    event.stopPropagation();
                    navigate(`${user.id}`)
                }}>
                    <Iconify icon={'material-symbols:edit'} width='20px' height='20px' />
                </IconButton>
                <IconButton disabled={isLoading} size='large' onClick={(event) => {
                    event.stopPropagation();
                    handleOpenDeleteDialog(user.id);
                }}>
                    <Iconify icon={'bi:trash-fill'} width='20px' height='20px' />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};
