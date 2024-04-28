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
    club_code: Yup.string().required('Club name is required'),
    name: Yup.string().required('Club name is required'),
    teacher_code: Yup.string().required('Teacher is required'),
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
        enqueueSnackbar('Get teacher list failed', {variant: 'error'});
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
        enqueueSnackbar('Get club info failed', {variant: 'error'});
        console.error(e)
      }
    }
    fetchClubInfo();
  }, []);

  const onSubmit = async (formData) => {
    try {
      const res = await updateClub(club_code, formData);
      reset();
      enqueueSnackbar(res.message || 'Update club success!');
      navigate(PATH_DASHBOARD.club.list);
    } catch (error) {
      enqueueSnackbar('Update club failed', {variant: 'error'});
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
                <Typography>Club code</Typography>
                <RHFTextField name="club_code" />
              </Stack>
              <Stack direction="column" spacing={1}>
                <Typography>Club name</Typography>
                <RHFTextField name="name" />
              </Stack>
              <Stack direction="column" spacing={1}>
                <Typography>Teacher</Typography>
                <RHFSelect name="teacher_code">
                  {teacherList.map((teacher) => (
                    <option key={teacher.teacher_code} value={teacher.teacher_code}>
                      {teacher.teacher_name}
                    </option>
                  ))}
                </RHFSelect>
              </Stack>
              <Stack direction='row' justifyContent='flex-end' spacing={3}>
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
