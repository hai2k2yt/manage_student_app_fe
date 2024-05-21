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
import { getClubStudents } from '../../../../api/club';
import { storeAbsenceReport } from '../../../../api/absence_report';

// ----------------------------------------------------------------------

export default function AbsenceReportCreateForm() {
  const navigate = useNavigate();
  const [studentList, setStudentList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const {session_code, club_code} = useParams();

  const CreateAbsenceReportSchema = Yup.object().shape({
    session_code: Yup.string().required('Buổi học không được để trống'),
    student_code: Yup.string().required('Học sinh không được để trống'),
    reason: Yup.string().required('Lý do không được để trống'),
  });

  const defaultValues = {
    session_code: session_code,
    student_code: '',
    reason: ''
  };

  const methods = useForm({
    resolver: yupResolver(CreateAbsenceReportSchema),
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


    async function fetchStudent() {
      try {
        const students = await getClubStudents(club_code);
        setStudentList(students.data)
      } catch (e) {
        enqueueSnackbar('Lấy danh sách học sinh thất bại!', {variant: 'error'});
        if (typeof e?.errors == 'object') {
          for (let message of Object.values(e?.errors)) {
            enqueueSnackbar(message, { variant: 'error' });
          }
        }
      }
    }
    fetchStudent();
  }, []);

  const onSubmit = async (formData) => {
    try {
      const res = await storeAbsenceReport(formData);
      reset();
      enqueueSnackbar('Tạo báo cáo nghỉ thành công!');
      navigate(`${PATH_DASHBOARD.club.root}/${club_code}/session/${session_code}/detail`);
    } catch (e) {
      enqueueSnackbar('Tạo báo cáo nghỉ thất bại!', {variant: 'error'});
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
              <Stack direction='column' spacing={1}>
                <Typography>Buổi học</Typography>
                <RHFTextField name="session_code" disabled />
              </Stack>
              <Stack direction='column' spacing={1}>
                <Typography>Học sinh</Typography>
                <RHFSelect name="student_code">
                  <option key='' value=''>
                    -- Chọn học sinh --
                  </option>
                  {studentList.map((student) => (
                    <option key={student.student_code} value={student.student_code}>
                      {student.name}
                    </option>
                  ))}
                </RHFSelect>
              </Stack>
              <Stack direction='column' spacing={1}>
                <Typography>Lý do</Typography>
                <RHFTextField name="reason" />
              </Stack>
              <Stack direction='row' justifyContent='flex-end' spacing={3}>
                <Button variant="outlined" type="submit">Tạo mới</Button>
                <Button variant="outlined" onClick={() => navigate(`${PATH_DASHBOARD.club.root}/${club_code}/session/${session_code}/detail`)}>Hủy</Button>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
