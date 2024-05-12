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

// ----------------------------------------------------------------------

export default function ProfileUpdateForm() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const {user } = useAuth();

  const UpdateProfileSchema = Yup.object().shape({
    username: Yup.string().required('Tên đăng nhập không được để trống'),
    name: Yup.string().required('Tên người dùng không được để trống'),
    role: Yup.string().required('Quyền không được để trống'),
  });

  const defaultValues = {
    username: '',
    name: '',
    role: '',
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


  useEffect(() => {
    reset(defaultValues);
    const { username, name, role } = user;
    reset({ username, name, role });
  }, []);

  const onSubmit = async (formData) => {
    try {
      const res = await updateProfile({ name: formData.name });
      reset();
      enqueueSnackbar('Cập nhật thông tin cá nhân thành công!');
      navigate(PATH_DASHBOARD.general.app);
    } catch (error) {
      enqueueSnackbar('Cập nhật thông tin cá nhân thất bại', {variant: 'error'});
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
                <Typography>Tên đăng nhập</Typography>
                <RHFTextField name="username" disabled/>
              </Stack>
              <Stack direction='column' spacing={1}>
                <Typography>Tên người dùng</Typography>
                <RHFTextField name="name"/>
              </Stack>
              <Stack direction='column' spacing={1}>
                <Typography>Quyền</Typography>
                <RHFSelect name="role" disabled>
                  <option key="1" value="1">
                    Quản trị viên
                  </option>
                  <option key="2" value="2">
                    Phụ huynh
                  </option>
                  <option key="3" value="3">
                    Giáo viên
                  </option>
                  <option key="4" value="4">
                    Kế toán
                  </option>
                </RHFSelect>
              </Stack>
              <Stack direction="row" justifyContent="flex-end" spacing={3}>
                <Button variant="outlined" type="submit">Cập nhật</Button>
                <Button variant="outlined" onClick={() => navigate(PATH_DASHBOARD.general.app)}>Hủy</Button>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
