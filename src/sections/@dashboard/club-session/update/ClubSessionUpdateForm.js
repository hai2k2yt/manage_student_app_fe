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
import { showClubSession, storeClubSession, updateClubSession } from '../../../../api/club_session';
import { getScheduleByClub } from '../../../../api/club_schedule';

// ----------------------------------------------------------------------

export default function ClubSessionUpdateForm({ currentProduct }) {
  const navigate = useNavigate();
  const [scheduleList, setScheduleList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const { club_code, session_code } = useParams();

  const UpdateSessionSchema = Yup.object().shape({
    session_code: Yup.string().required('Session name is required'),
    session_name: Yup.string().required('Session name is required'),
    schedule_code: Yup.string().required('Schedule is required'),
    date: Yup.string().required('Date is required'),
  });

  const defaultValues = {
    session_code: '',
    session_name: '',
    schedule_code: '',
    date: '',
  };

  const methods = useForm({
    resolver: yupResolver(UpdateSessionSchema),
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
    async function fetchSchedule() {
      const schedules = await getScheduleByClub(club_code);
      setScheduleList(schedules.data.data)
    }
    fetchSchedule();

    async function fetchSession() {
      const session = await showClubSession(session_code);
      console.log(session.data)
      const data = session.data;
      reset({
        session_code: data.session_code,
        session_name: data.session_name,
        schedule_code: data.schedule_code,
        date: data.date,
      });
    }
    fetchSession();
  }, []);

  const onSubmit = async (formData) => {
    try {
      const date = new Date(formData.date);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const res = await updateClubSession(
        session_code,
        {
          session_name: formData.session_name,
          schedule_code: formData.schedule_code,
          date: `${year}-${month}-${day}`,
        });
      reset();
      enqueueSnackbar(res.message || 'Update session success!');
      navigate(`${PATH_DASHBOARD.club.root}/${club_code}/detail`);
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
              <Stack direction="column" spacing={1}>
                <Typography>Session code</Typography>
                <RHFTextField name="session_code" disabled/>
              </Stack>
              <Stack direction="column" spacing={1}>
                <Typography>Session name</Typography>
                <RHFTextField name="session_name" />
              </Stack>
              <Stack direction="column" spacing={1}>
                <Typography>Schedule</Typography>
                <RHFSelect name="schedule_code">
                  <option key="" value="">
                    -- Choose schedule --
                  </option>
                  {scheduleList.map((schedule) => (
                    <option key={schedule.schedule_code} value={schedule.schedule_code}>
                      {schedule.schedule_name}
                    </option>
                  ))}
                </RHFSelect>
              </Stack>
              <Stack direction="column" spacing={1}>
                <Typography>Date</Typography>
                <RHFDate
                  inputFormat="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  name="date"
                />
              </Stack>
              <Stack direction="row" justifyContent="flex-end" spacing={3}>
                <Button variant="outlined" type="submit">Submit</Button>
                <Button variant="outlined" onClick={() => navigate(PATH_DASHBOARD.club.list)}>Cancel</Button>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
