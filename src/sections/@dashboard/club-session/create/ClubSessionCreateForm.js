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
import { getScheduleByClub } from '../../../../api/club_schedule';

// ----------------------------------------------------------------------

export default function ClubSessionCreateForm() {
  const navigate = useNavigate();
  const [scheduleList, setScheduleList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const { club_code } = useParams();

  const NewSessionSchema = Yup.object().shape({
    session_code: Yup.string().required('Mã buổi học không được để trống'),
    session_name: Yup.string().required('Tên buổi học không được để trống'),
    schedule_code: Yup.string().required('Thời khóa biểu không được để trống'),
    date: Yup.string().required('Ngày không được để trống'),
  });

  const defaultValues = {
    session_code: '',
    session_name: '',
    schedule_code: '',
    date: '',
  };

  const methods = useForm({
    resolver: yupResolver(NewSessionSchema),
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
      try {
        const schedules = await getScheduleByClub(club_code);
        setScheduleList(schedules.data.data);
      } catch (e) {
        enqueueSnackbar('Lấy danh sách thời khóa biểu thất bại', {variant: 'error'});
        console.error(e)
      }
    }

    fetchSchedule();
  }, []);

  const onSubmit = async (formData) => {
    try {
      const date = new Date(formData.date);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const res = await storeClubSession({ ...formData, date: `${year}-${month}-${day}` });
      reset();
      enqueueSnackbar('Tạo buổi học CLB thành công!');
      navigate(`${PATH_DASHBOARD.club.root}/${club_code}/detail`);
    } catch (error) {
      enqueueSnackbar('Tạo buổi học CLB thất bại! ', {variant: 'error'});
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
                <Typography>Mã buổi học</Typography>
                <RHFTextField name="session_code" />
              </Stack>
              <Stack direction="column" spacing={1}>
                <Typography>Tên buổi học</Typography>
                <RHFTextField name="session_name" />
              </Stack>
              <Stack direction="column" spacing={1}>
                <Typography>Thời khóa biểu</Typography>
                <RHFSelect name="schedule_code">
                  <option key="" value="">
                    -- Chọn thời khóa biểu --
                  </option>
                  {scheduleList.map((schedule) => (
                    <option key={schedule.schedule_code} value={schedule.schedule_code}>
                      {schedule.schedule_name}
                    </option>
                  ))}
                </RHFSelect>
              </Stack>
              <Stack direction="column" spacing={1}>
                <Typography>Ngày</Typography>
                <RHFDate
                  inputFormat="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  name="date"
                />
              </Stack>
              <Stack direction="row" justifyContent="flex-end" spacing={3}>
                <Button variant="outlined" type="submit">Tạo mới</Button>
                <Button variant="outlined" onClick={() => navigate(PATH_DASHBOARD.club.list)}>Hủy</Button>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
