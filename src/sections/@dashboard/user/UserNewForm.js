import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Button, Card, Grid, Stack, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { FormProvider, RHFSelect, RHFTextField } from '../../../components/hook-form';
import { registerUser } from '../../../api/auth';

// ----------------------------------------------------------------------

export default function UserNewForm() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
    name: Yup.string().required('Display name is required'),
    password_confirmation: Yup.string().required('Password confirm is required'),
    role: Yup.string().required('Role is required'),
  });

  const defaultValues = {
    username: '',
    password: '',
    name: '',
    password_confirmation: '',
    role: '',
  };

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;


  useEffect(() => {
    reset(defaultValues);
  }, []);

  const onSubmit = async (formData) => {
    try {
      const res = await registerUser(formData);
      reset();
      enqueueSnackbar(res.message || 'Create success!');
      navigate(PATH_DASHBOARD.user.list);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Stack direction='column' spacing={1}>
                <Typography>Username</Typography>
                <RHFTextField name="username"/>
              </Stack>
              <Stack direction='column' spacing={1}>
                <Typography>Password</Typography>
                <RHFTextField type='password' name="password"/>
              </Stack>
              <Stack direction='column' spacing={1}>
                <Typography>Password confirmation</Typography>
                <RHFTextField type='password' name="password_confirmation"/>
              </Stack>
              <Stack direction='column' spacing={1}>
                <Typography>Display name</Typography>
                <RHFTextField name="name"/>
              </Stack>
              <Stack direction='column' spacing={1}>
                <Typography>Role</Typography>
                <RHFSelect name="role">
                  <option key="1" value="1">
                    Admin
                  </option>
                  <option key="2" value="2">
                    Parent
                  </option>
                  <option key="3" value="3">
                    Teacher
                  </option>
                  <option key="4" value="4">
                    Accounting
                  </option>
                </RHFSelect>
              </Stack>
              <Stack direction="row" justifyContent="flex-end" spacing={3}>
                <Button variant="outlined" type="submit">Submit</Button>
                <Button variant="outlined" onClick={() => navigate(PATH_DASHBOARD.user.list)}>Cancel</Button>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
