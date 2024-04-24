import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Card, Grid, Stack, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import { FormProvider, RHFDate, RHFSelect, RHFTextField } from '../../../../components/hook-form';
import { getUser } from '../../../../api/user';
import { getSessionByClub, storeClubSession } from '../../../../api/club_session';
import { getScheduleByClub } from '../../../../api/club_schedule';
import { getClubStudents } from '../../../../api/club';
import { storeAbsenceReport } from '../../../../api/absence_report';

// ----------------------------------------------------------------------

export default function AbsenceReportCreateForm() {
  const navigate = useNavigate();
  const [sessionList, setSessionList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const {id, session_id} = useParams();

  const CreateAbsenceReportSchema = Yup.object().shape({
    club_session_id: Yup.string().required('Session is required'),
    student_id: Yup.string().required('Student is required'),
    reason: Yup.string().required('Reason is required'),
  });

  const defaultValues = {
    club_session_id: '',
    student_id: '',
    reason: '',
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

    async function fetchSession() {
      const schedules = await getSessionByClub(id);
      setSessionList(schedules.data.data)
    }
    fetchSession();

    async function fetchStudent() {
      const schedules = await getClubStudents(id);
      setStudentList(schedules.data.data)
    }
    fetchStudent();
  }, []);

  const onSubmit = async (formData) => {
    try {
      const res = await storeAbsenceReport(formData);
      reset();
      enqueueSnackbar(res.message || 'Create absence report success!');
      navigate(PATH_DASHBOARD.club.list);
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
                <Typography>Session name</Typography>
                <RHFTextField name="name"/>
              </Stack>
              <Stack direction='column' spacing={1}>
                <Typography>Schedule</Typography>
                <RHFSelect name="schedule_id">
                  <option key='' value=''>
                    -- Choose schedule --
                  </option>
                  {sessionList.map((schedule) => (
                    <option key={schedule.id} value={schedule.id}>
                      {schedule.id}
                    </option>
                  ))}
                </RHFSelect>
              </Stack>
              <Stack direction='column' spacing={1}>
                <Typography>Date</Typography>
                <RHFDate
                  name="date"
                />
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
