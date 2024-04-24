import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
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
import { getUser, showUser } from '../../../api/user';
import { showClub } from '../../../api/club';

// ----------------------------------------------------------------------

export default function UserUpdateForm() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const {id} = useParams();

  const UpdateUserSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    name: Yup.string().required('Display name is required'),
    role: Yup.string().required('Role is required'),
  });

  const defaultValues = {
    username: '',
    name: '',
    role: '',
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
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
    async function fetchUserInfo() {
      const userDetail = await showUser(id);
      const { username, name, role } = userDetail.data;
      reset({ username, name, role });
    }
    fetchUserInfo();
  }, []);

  const onSubmit = async (formData) => {
    try {
      // const res = await registerUser(formData);
      // reset();
      // enqueueSnackbar(res.message || 'Create success!');
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
