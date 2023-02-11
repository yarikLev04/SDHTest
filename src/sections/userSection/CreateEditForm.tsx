import React, { useEffect } from 'react';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    FormControlLabel,
    FormHelperText,
    Grid,
    MenuItem,
    Select,
    Stack, Switch,
    TextField
} from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers-pro';
import { endOfDay, format, parseISO } from 'date-fns';
import { BackButton } from 'src/components/BackButton';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { createUser, getUser, updateUser } from 'src/redux/slices/users';
import { Gender } from 'src/@types/users/types';

type UserForm = {
    first_name: string,
    last_name: string,
    birth_date: Date | string | null,
    gender: string,
    job: string,
    biography: string,
    is_active: boolean
}

export function CreateEditForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const validationSchema = Yup.object().shape({
        first_name: Yup.string().trim().required('First name is required'),
        last_name: Yup.string().trim().required('Last name is required'),
        birth_date: Yup.date().nullable().typeError('Invalid date').required('Date of birth is required').max(endOfDay(new Date()), 'Date of birth cant be future date'),
        gender: Yup.string().trim().required('Gender is required'),
        job: Yup.string().trim().required('Job is required'),
        biography: Yup.string().trim().required('Biography is required')
    });

    const formik = useFormik<UserForm>({
        initialValues: {
            first_name: '',
            last_name: '',
            birth_date: null,
            gender: '',
            job: '',
            biography: '',
            is_active: false
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const user = { ...values, birth_date: format(values.birth_date as Date, 'yyyy-MM-dd') }
            try {
                if (id) {
                    await updateUser(user, id);
                } else {
                    await createUser(user)
                }
                enqueueSnackbar(id ? 'User has been successfully updated' : 'User has been successfully created',{ variant: 'success' })
            } finally {
                formik.setSubmitting(false);
                navigate('/users')
            }
        }
    })

    useEffect(() => {
        if (id) {
            setUserInForm();
        }
    }, []);

    const setUserInForm = async () => {
        const user = await getUser(id);

        formik.setValues({
            first_name: user?.first_name || '',
            last_name: user?.last_name || '',
            birth_date: parseISO(user?.birth_date),
            gender: user?.gender || '',
            job: user?.job || '',
            biography: user?.biography || '',
            is_active: user?.is_active || false
        })
    }

    return (
        <Card sx={{ p: 5 }}>
            <BackButton />
            <Stack px={3} py={2} spacing={2} direction='row' justifyContent={'center'}>
                <CardHeader title={id ? 'Edit user' : 'Create user'}/>
            </Stack>
            <FormikProvider value={formik}>
                <Form noValidate autoComplete='off'>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    disabled={formik.isSubmitting}
                                    label="First name"
                                    {...formik.getFieldProps('first_name')}
                                    error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                                    helperText={formik.touched.first_name && formik.errors.first_name}
                                    size='small'
                                    type='text'
                                    inputProps={{ maxLength: 256 }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    disabled={formik.isSubmitting}
                                    label="Last name"
                                    {...formik.getFieldProps('last_name')}
                                    error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                                    helperText={formik.touched.last_name && formik.errors.last_name}
                                    size='small'
                                    type='text'
                                    inputProps={{ maxLength: 256 }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <DesktopDatePicker
                                    label='Birth date'
                                    value={formik.values.birth_date}
                                    inputFormat='yyyy-MM-dd'
                                    mask={'____-__-__'}
                                    views={['year', 'month', 'day']}
                                    maxDate={new Date()}
                                    disabled={formik.isSubmitting}
                                    onChange={(value: any) => formik.setFieldValue('birth_date', value)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            {...formik.getFieldProps('birth_date')}
                                            onChange={(value: any) => formik.setFieldValue('birth_date', value)}
                                            fullWidth
                                            size='small'
                                            type='date'
                                            error={Boolean(formik.touched.birth_date && formik.errors.birth_date)}
                                            helperText={formik.touched.birth_date && formik.errors.birth_date}
                                        />
                                    )
                                }/>
                            </Grid>
                            <Grid item xs={6}>
                                <Select
                                    fullWidth
                                    size='small'
                                    value={formik.values.gender}
                                    displayEmpty
                                    onChange={(e) => formik.setFieldValue('gender', e.target.value)}
                                    error={Boolean(formik.touched.gender && formik.errors.gender)}
                                >
                                    <MenuItem disabled value=''>Gender</MenuItem>
                                    {Object.values(Gender).map(gender => (
                                        <MenuItem key={gender} value={gender}>{gender}</MenuItem>
                                    ))}
                                </Select>
                                {Boolean(formik.touched.gender && formik.errors.gender) && (
                                    <FormHelperText sx={{ color: "#d32f2f", margin: "4px 14px 0 !important" }}>
                                        {formik.errors.gender}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    disabled={formik.isSubmitting}
                                    label="Job"
                                    {...formik.getFieldProps('job')}
                                    error={formik.touched.job && Boolean(formik.errors.job)}
                                    helperText={formik.touched.job && formik.errors.job}
                                    size='small'
                                    type='text'
                                    inputProps={{ maxLength: 256 }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    label='Biography'
                                    disabled={formik.isSubmitting}
                                    minRows={5}
                                    {...formik.getFieldProps('biography')}
                                    error={formik.touched.biography && Boolean(formik.errors.biography)}
                                    helperText={formik.touched.biography && formik.errors.biography}
                                    size='small'
                                    type='text'
                                    inputProps={{ maxLength: 1024 }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    disabled={formik.isSubmitting}
                                    control={
                                        <Switch
                                            checked={formik.values.is_active}
                                            onChange={() => formik.setFieldValue('is_active', !formik.values.is_active)}/>
                                    }
                                    label='Active'
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Stack sx={{ width: '100%' }} direction='row' justifyContent={'right'}>
                            <Button type='submit'>{id ? 'Update' : 'Create'}</Button>
                        </Stack>
                    </CardActions>
                </Form>
            </FormikProvider>
        </Card>
    );
}
