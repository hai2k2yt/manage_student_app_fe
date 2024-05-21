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
import { showUser, updateUser } from '../../../api/user';

// ----------------------------------------------------------------------

export default function UserUpdateForm() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  const UpdateUserSchema = Yup.object().shape({
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
      try {
        const userDetail = await showUser(id);
        const { username, name, role } = userDetail.data;
        reset({ username, name, role });
      } catch (e) {
        enqueueSnackbar('Lấy thông tin người dùng that bại', { variant: 'error' });
        if (typeof e?.errors == 'object') {
          for (let message of Object.values(e?.errors)) {
            enqueueSnackbar(message, { variant: 'error' });
          }
        }
      }
    }

    fetchUserInfo();
  }, []);

  const onSubmit = async (formData) => {
    try {
      const res = await updateUser(id, formData);
      reset();
      enqueueSnackbar('Cập nhật người dùng thành công!');
      navigate(PATH_DASHBOARD.user.list);
    } catch (e) {
      enqueueSnackbar('Cập nhật người dùng thất bại', { variant: 'error' });
      if (typeof e?.errors == 'object') {
        for (let message of Object.values(e?.errors)) {
          enqueueSnackbar(message, { variant: 'error' });
        }
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Stack direction="column" spacing={1}>
                <Typography>Tên đăng nhập</Typography>
                <RHFTextField disabled name="username" />
              </Stack>
              <Stack direction="column" spacing={1}>
                <Typography>Tên người dùng</Typography>
                <RHFTextField name="name" />
              </Stack>
              <Stack direction="column" spacing={1}>
                <Typography>Quyền</Typography>
                <RHFSelect name="role">
                  <option key="5" value="">
                    -- Chọn quyền --
                  </option>
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
                <Button variant="outlined" onClick={() => navigate(PATH_DASHBOARD.user.list)}>Hủy</Button>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
