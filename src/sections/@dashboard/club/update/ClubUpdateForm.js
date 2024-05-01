import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Button, Card, Grid, Stack, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import { FormProvider, RHFSelect, RHFTextField } from '../../../../components/hook-form';
import { getUser } from '../../../../api/user';
import { showClub, updateClub } from '../../../../api/club';
import { getAllTeachers } from '../../../../api/teacher';

// ----------------------------------------------------------------------

export default function ClubUpdateForm() {
  const navigate = useNavigate();
  const [teacherList, setTeacherList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const { club_code } = useParams();

  const UpdateClubSchema = Yup.object().shape({
    club_code: Yup.string().required('Mã CLB không được để trống'),
    name: Yup.string().required('Tên CLB không được để trống'),
    teacher_code: Yup.string().required('Giáo viên không được để trống'),
  });

  const defaultValues = {
    club_code: '',
    name: '',
    teacher_code: '',
  };

  const methods = useForm({
    resolver: yupResolver(UpdateClubSchema),
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
    async function fetchTeacher() {
      try {
        const teachers = await getAllTeachers();
        setTeacherList(teachers.data);
      } catch (e) {
        enqueueSnackbar('Lấy danh sách giáo viên thất bại!', {variant: 'error'});
        console.error(e)
      }
    }

    fetchTeacher();

    async function fetchClubInfo() {
      try {
        const classDetail = await showClub(club_code);
        const { club_code: clubcode, name, teacher_code } = classDetail.data;
        reset({ club_code: clubcode, name, teacher_code });
      } catch (e) {
        enqueueSnackbar('Lấy thông tin CLB thất bại!', {variant: 'error'});
        console.error(e)
      }
    }
    fetchClubInfo();
  }, []);

  const onSubmit = async (formData) => {
    try {
      const res = await updateClub(club_code, formData);
      reset();
      enqueueSnackbar('Cập nhật CLB thành công!');
      navigate(PATH_DASHBOARD.club.list);
    } catch (error) {
      enqueueSnackbar('Cập nhật CLB thất bại', {variant: 'error'});
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Stack direction="column" spacing={1}>
                <Typography>Mã CLB</Typography>
                <RHFTextField name="club_code" />
              </Stack>
              <Stack direction="column" spacing={1}>
                <Typography>Tên CLB</Typography>
                <RHFTextField name="name" />
              </Stack>
              <Stack direction="column" spacing={1}>
                <Typography>Giáo viên</Typography>
                <RHFSelect name="teacher_code">
                  {teacherList.map((teacher) => (
                    <option key={teacher.teacher_code} value={teacher.teacher_code}>
                      {teacher.teacher_name}
                    </option>
                  ))}
                </RHFSelect>
              </Stack>
              <Stack direction='row' justifyContent='flex-end' spacing={3}>
                <Button variant="outlined" type="submit">Sửa</Button>
                <Button variant="outlined" onClick={() => navigate(PATH_DASHBOARD.club.list)}>Hủy</Button>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
