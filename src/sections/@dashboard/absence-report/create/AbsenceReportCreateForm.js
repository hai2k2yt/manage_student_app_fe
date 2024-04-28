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
    session_code: Yup.string().required('Session is required'),
    student_code: Yup.string().required('Student is required'),
    reason: Yup.string().required('Reason is required'),
    status: Yup.string().required('Status is required')
  });

  const defaultValues = {
    session_code: session_code,
    student_code: '',
    reason: '',
    status: 1
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
        enqueueSnackbar('Get student list failed!', {variant: 'error'});
        console.error(e)
      }
    }
    fetchStudent();
  }, []);

  const onSubmit = async (formData) => {
    try {
      const res = await storeAbsenceReport(formData);
      reset();
      enqueueSnackbar(res.message || 'Create absence report success!');
      navigate(`${PATH_DASHBOARD.club.root}/${club_code}/session/${session_code}/detail`);
    } catch (e) {
      enqueueSnackbar('Create absence report failed!', {variant: 'error'});
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
                <Typography>Session code</Typography>
                <RHFTextField name="session_code" disabled />
              </Stack>
              <Stack direction='column' spacing={1}>
                <Typography>Student</Typography>
                <RHFSelect name="student_code">
                  <option key='' value=''>
                    -- Choose student --
                  </option>
                  {studentList.map((student) => (
                    <option key={student.student_code} value={student.student_code}>
                      {student.name}
                    </option>
                  ))}
                </RHFSelect>
              </Stack>
              <Stack direction='column' spacing={1}>
                <Typography>Reason</Typography>
                <RHFTextField name="reason" />
              </Stack>
              <Stack direction='column' spacing={1}>
                <Typography>Status</Typography>
                <RHFSelect name="status" disabled>
                  <option key="" value="">
                    -- Choose status --
                  </option>
                  <option key="1" value="1">
                    Pending
                  </option>
                  <option key="2" value="2">
                    Approved
                  </option>
                  <option key="3" value="3">
                    Reject
                  </option>
                </RHFSelect>
              </Stack>
              <Stack direction='row' justifyContent='flex-end' spacing={3}>
                <Button variant="outlined" type="submit">Submit</Button>
                <Button variant="outlined" onClick={() => navigate(`${PATH_DASHBOARD.club.root}/${club_code}/session/${session_code}/detail`)}>Cancel</Button>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}