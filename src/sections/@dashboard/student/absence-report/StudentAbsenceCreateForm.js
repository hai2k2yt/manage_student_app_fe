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
import { getSessionByClub } from '../../../../api/club_session';

// ----------------------------------------------------------------------

export default function StudentAbsenceCreateForm() {
  const navigate = useNavigate();
  const [sessionList, setSessionList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const {student_code, club_code} = useParams();

  const StudentCreateAbsenceSchema = Yup.object().shape({
    session_code: Yup.string().required('Buổi học không được để trống'),
    student_code: Yup.string().required('Học sinh không được để trống'),
    reason: Yup.string().required('Lý do không được để trống'),
  });

  const defaultValues = {
    session_code: '',
    student_code: student_code,
    reason: ''
  };

  const methods = useForm({
    resolver: yupResolver(StudentCreateAbsenceSchema),
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
        const sessions = await getSessionByClub(club_code);
        setSessionList(sessions?.data?.records)
      } catch (e) {
        enqueueSnackbar('Lấy buổi học thất bại!', {variant: 'error'});
        console.error(e)
      }
    }
    fetchStudent();
  }, []);

  const onSubmit = async (formData) => {
    try {
      const res = await storeAbsenceReport(formData);
      reset();
      enqueueSnackbar('Tạo báo cáo nghỉ thành công!');
      navigate(`${PATH_DASHBOARD.student.root}/${student_code}/detail`);
    } catch (e) {
      enqueueSnackbar('Tạo báo cáo nghỉ thất bại!', {variant: 'error'});
      console.error(e)
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
                <RHFSelect name="session_code">
                  <option key='' value=''>
                    -- Chọn buổi học --
                  </option>
                  {sessionList?.map((session) => (
                    <option key={session.session_code} value={session.session_code}>
                      {session.session_name}
                    </option>
                  ))}
                </RHFSelect>
              </Stack>
              <Stack direction='column' spacing={1}>
                <Typography>Mã học sinh</Typography>
                <RHFTextField name="student_code" disabled />
              </Stack>
              <Stack direction='column' spacing={1}>
                <Typography>Lý do</Typography>
                <RHFTextField name="reason" />
              </Stack>
              <Stack direction='row' justifyContent='flex-end' spacing={3}>
                <Button variant="outlined" type="submit">Tạo</Button>
                <Button variant="outlined" onClick={() => navigate(`${PATH_DASHBOARD.student.root}/${student_code}/detail`)}>Hủy</Button>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
