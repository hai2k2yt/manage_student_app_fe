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
import { updateProfile } from '../../../api/user';
import useAuth from '../../../hooks/useAuth';
import { changePassword } from '../../../api/auth';

// ----------------------------------------------------------------------

export default function ProfileChangePasswordForm() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const {user } = useAuth();

  const UpdateProfileSchema = Yup.object().shape({
    current_password: Yup.string().required('Mật khẩu hiện tại không được để trống'),
    new_password: Yup.string().required('Mật khẩu mới không được để trống'),
    new_password_confirm: Yup.string().required('Mật khẩu xác nhận không được để trống')
      .oneOf([Yup.ref('new_password')], 'Mật khẩu xác nhận không trùng khớp'),
  });

  const defaultValues = {
    current_password: '',
    new_password: '',
    new_password_confirm: '',
  };

  const methods = useForm({
    resolver: yupResolver(UpdateProfileSchema),
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

  const onSubmit = async (formData) => {
    try {
      const res = await changePassword({
        current_password: formData.current_password,
        new_password: formData.new_password
        });
      reset();
      enqueueSnackbar('Đổi mật khẩu thành công!');
      navigate(PATH_DASHBOARD.general.app);
    } catch (error) {
      enqueueSnackbar('Đổi mật khẩu thất bại', {variant: 'error'});
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
                <Typography>Mật khẩu hiện tại</Typography>
                <RHFTextField type='password' name="current_password" />
              </Stack>
              <Stack direction='column' spacing={1}>
                <Typography>Mật khẩu mới</Typography>
                <RHFTextField type='password' name="new_password"/>
              </Stack>
              <Stack direction='column' spacing={1}>
                <Typography>Xác nhận mật khẩu mới</Typography>
                <RHFTextField type='password' name="new_password_confirm"/>
              </Stack>

              <Stack direction="row" justifyContent="flex-end" spacing={3}>
                <Button variant="outlined" type="submit">Đổi mật khẩu</Button>
                <Button variant="outlined" onClick={() => navigate(PATH_DASHBOARD.general.app)}>Hủy</Button>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
