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
    username: Yup.string().required('Tên đăng nhập không được để trống'),
    password: Yup.string().required('Mật khẩu không được để trống'),
    name: Yup.string().required('Tên người dùng không được để trống'),
    password_confirmation: Yup.string().required('Mật khẩu xác nhận không được để trống'),
    role: Yup.string().required('Quyền không được để trống'),
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
      enqueueSnackbar('Tạo người dùng thành công!');
      navigate(PATH_DASHBOARD.user.list);
    } catch (error) {
      enqueueSnackbar('Tạo người dùng that bại!', {variant: 'error'});
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
                <RHFTextField name="username"/>
              </Stack>
              <Stack direction='column' spacing={1}>
                <Typography>Mật khẩu</Typography>
                <RHFTextField type='password' name="password"/>
              </Stack>
              <Stack direction='column' spacing={1}>
                <Typography>Mật khẩu xác nhận</Typography>
                <RHFTextField type='password' name="password_confirmation"/>
              </Stack>
              <Stack direction='column' spacing={1}>
                <Typography>Tên người dùng</Typography>
                <RHFTextField name="name"/>
              </Stack>
              <Stack direction='column' spacing={1}>
                <Typography>Quyền</Typography>
                <RHFSelect name="role">
                  <option key="5" value="">
                    -- Chọn quyền --
                  </option>
                  <option key="1" value="1">
                    Quản trị hệ thống
                  </option>
                  <option key="2" value="2">
                    Phụ huynh
                  </option>
                  <option key="3" value="3">
                    Giáo viên
                  </option>
                  <option key="4" value="4">
                    Hành chính kế toán
                  </option>
                </RHFSelect>
              </Stack>
              <Stack direction="row" justifyContent="flex-end" spacing={3}>
                <Button variant="outlined" type="submit">Tạo</Button>
                <Button variant="outlined" onClick={() => navigate(PATH_DASHBOARD.user.list)}>Hủy</Button>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
