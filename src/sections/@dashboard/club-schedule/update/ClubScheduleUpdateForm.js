import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Button, Card, Grid, Stack, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import { FormProvider, RHFSelect, RHFTextField } from '../../../../components/hook-form';
import { showClubSchedule, storeClubSchedule, updateClubSchedule } from '../../../../api/club_schedule';
import { getAllTeachers } from '../../../../api/teacher';
import { showClubSession } from '../../../../api/club_session';

// ----------------------------------------------------------------------

export default function ClubScheduleUpdateForm() {
  const navigate = useNavigate();
  const [teacherList, setTeacherList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const { club_code, schedule_code } = useParams();

  const UpdateScheduleSchema = Yup.object().shape({
    schedule_code: Yup.string().required('Mã thời khóa biểu không được để trống'),
    club_code: Yup.string().required('CLB không được để trống'),
    teacher_code: Yup.string().required('Giáo viên không được để trống'),
    schedule_name: Yup.string().required('Tên thời khóa biểu không được để trống'),
    day_of_week: Yup.string().required('Ngày trong tuần không được để trống'),
    student_fee: Yup
      .number()
      .typeError('Học phí học sinh phải là dạng số')
      .required('Học phí học sinh không được để trống')
      .positive('Học phí học sinh phải lớn hơn 0'),
    teacher_fee: Yup
      .number()
      .typeError('Lương giáo viên phải là dạng số')
      .required('Lương giáo viên không được để trống')
      .positive('Lương giáo viên phải lớn hơn 0')
  });

  const defaultValues = {
    schedule_code: schedule_code,
    club_code: club_code,
    teacher_code: '',
    schedule_name: '',
    day_of_week: '',
    student_fee: '',
    teacher_fee: ''
  };

  const methods = useForm({
    resolver: yupResolver(UpdateScheduleSchema),
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
        const schedules = await getAllTeachers();
        setTeacherList(schedules.data);
      } catch (e) {
        enqueueSnackbar('Lấy danh sách giáo viên thất bại', { variant: 'error' });
        if (typeof e?.errors == 'object') {
          for (let message of Object.values(e?.errors)) {
            enqueueSnackbar(message, { variant: 'error' });
          }
        }
      }
    }

    fetchTeacher();

    async function fetchSchedule() {
      try {
        const schedule = await showClubSchedule(schedule_code);
        const data = schedule.data;
        reset({
          club_code: data.club_code,
          schedule_code: data.schedule_code,
          schedule_name: data.schedule_name,
          teacher_code: data.teacher_code,
          day_of_week: data.day_of_week,
          student_fee: data.student_fee,
          teacher_fee: data.teacher_fee
        });
      } catch (e) {
        enqueueSnackbar('Lấy thông tin thời khóa biểu thất bại!', {variant: 'error'});
      }
    }
    fetchSchedule();
  }, []);

  const onSubmit = async (formData) => {
    try {
      await updateClubSchedule(schedule_code, {
        schedule_name: formData.schedule_name,
        teacher_code: formData.teacher_code,
        day_of_week: formData.day_of_week,
        student_fee: formData.student_fee,
        teacher_fee: formData.teacher_fee
      });
      reset();
      enqueueSnackbar('Cập nhật thời khóa biểu thành công!');
      navigate(`${PATH_DASHBOARD.club.root}/${club_code}/detail`);
    } catch (e) {
      enqueueSnackbar('Cập nhật thời khóa biểu thất bại! ', { variant: 'error' });
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
                <Typography>Mã CLB</Typography>
                <RHFTextField name="club_code" disabled />
              </Stack>
              <Stack direction="column" spacing={1}>
                <Typography>Mã TKB</Typography>
                <RHFTextField name="schedule_code" disabled />
              </Stack>
              <Stack direction="column" spacing={1}>
                <Typography>Tên TKB</Typography>
                <RHFTextField name="schedule_name" />
              </Stack>
              <Stack direction="column" spacing={1}>
                <Typography>Giáo viên</Typography>
                <RHFSelect name="teacher_code">
                  <option key="" value="">
                    -- Chọn giáo viên --
                  </option>
                  {teacherList.map((teacher) => (
                    <option key={teacher.teacher_code} value={teacher.teacher_code}>
                      {teacher.teacher_name}
                    </option>
                  ))}
                </RHFSelect>
              </Stack>
              <Stack direction="column" spacing={1}>
                <Typography>Thứ trong tuần</Typography>
                <RHFSelect name="day_of_week">
                  <option key="" value="">
                    -- Thứ trong tuần --
                  </option>
                  <option value="1">
                    Chủ nhật
                  </option>
                  <option value="2">
                    Thứ hai
                  </option>
                  <option value="3">
                    Thứ ba
                  </option>
                  <option value="4">
                    Thứ tư
                  </option>
                  <option value="5">
                    Thứ năm
                  </option>
                  <option value="6">
                    Thứ sáu
                  </option>
                  <option value="7">
                    Thứ bảy
                  </option>
                </RHFSelect>
              </Stack>
              <Stack direction="column" spacing={1}>
                <Typography>Học phí học sinh</Typography>
                <RHFTextField type='number' name="student_fee" />
              </Stack>
              <Stack direction="column" spacing={1}>
                <Typography>Lương giáo viên</Typography>
                <RHFTextField type='number' name="teacher_fee" />
              </Stack>
              <Stack direction="row" justifyContent="flex-end" spacing={3}>
                <Button variant="outlined" type="submit">Cập nhật</Button>
                <Button variant="outlined" onClick={() => navigate(`${PATH_DASHBOARD.club.root}/${club_code}/detail`)}>Hủy</Button>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
