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
import { FormProvider, RHFDate, RHFSelect, RHFTextField } from '../../../../components/hook-form';
import { storeClubSession } from '../../../../api/club_session';
import { getAllStudents } from '../../../../api/student';

// ----------------------------------------------------------------------

export default function ClubEnrollmentCreateForm() {
  const navigate = useNavigate();
  const [studentList, setStudentList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const { club_code } = useParams();

  const NewEnrollmentSchema = Yup.object().shape({
    club_code: Yup.string().required('CLB không được để trống'),
    student_code: Yup.string().required('Học sinh không được để trống'),
    from: Yup.string().required('Ngày bắt đầu không được để trốngg'),
  });

  const defaultValues = {
    club_code: club_code,
    student_code: '',
    from: '',
  };

  const methods = useForm({
    resolver: yupResolver(NewEnrollmentSchema),
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

    async function fetchStudents() {
      try {
        const schedules = await getAllStudents(club_code);
        setStudentList(schedules.data);
      } catch (e) {
        enqueueSnackbar('Lấy danh sách học sinh that bại!', {variant: 'error'});
        console.error(e)
      }
    }

    fetchStudents();
  }, []);

  const onSubmit = async (formData) => {
    try {
      const date = new Date(formData.date);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const res = await storeClubSession({ ...formData, date: `${year}-${month}-${day}` });
      reset();
      enqueueSnackbar('Tạo đăng ký CLB thành công!');
      navigate(`${PATH_DASHBOARD.club.root}/${club_code}/detail`);
    } catch (error) {
      enqueueSnackbar('Tạo đăng ký CLB thất bại! ', {variant: 'error'});
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
                <RHFTextField name="club_code" disabled />
              </Stack>
              <Stack direction="column" spacing={1}>
                <Typography>Học sinh</Typography>
                <RHFSelect name="student_code">
                  <option key="" value="">
                    -- Chọn học sinh --
                  </option>
                  {studentList.map((student) => (
                    <option key={student.student_code} value={student.name}>
                      {student.name}
                    </option>
                  ))}
                </RHFSelect>
              </Stack>
              <Stack direction="column" spacing={1}>
                <Typography>Ngày</Typography>
                <RHFDate
                  inputFormat="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  name="from"
                />
              </Stack>
              <Stack direction="row" justifyContent="flex-end" spacing={3}>
                <Button variant="outlined" type="submit">Tạo mới</Button>
                <Button variant="outlined" onClick={() => navigate(`${PATH_DASHBOARD.club.root}/${club_code}/detail`)}>Hủy</Button>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
