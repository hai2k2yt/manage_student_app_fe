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
import { showClass, updateClass } from '../../../../api/class';
import { getAllTeachers } from '../../../../api/teacher';

// ----------------------------------------------------------------------

export default function ClassUpdateForm() {
  const navigate = useNavigate();
  const [teacherList, setTeacherList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const { class_code } = useParams();


  const UpdateClassSchema = Yup.object().shape({
    class_code: Yup.string().required('Mã lớp học không được để trống'),
    class_name: Yup.string().required('Tên lớp học không được để trống'),
    teacher_code: Yup.string().required('Giáo viên không được để trống'),
  });

  const defaultValues = {
    class_code: '',
    class_name: '',
    teacher_code: '',
  };

  const methods = useForm({
    resolver: yupResolver(UpdateClassSchema),
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
        enqueueSnackbar('Lấy danh sách giáo viên thất bại!', { variant: 'error' });
        if (typeof e?.errors == 'object') {
          for (let message of Object.values(e?.errors)) {
            enqueueSnackbar(message, { variant: 'error' });
          }
        }
      }
    }

    fetchTeacher();

    async function fetchClassInfo() {
      try {
        const classDetail = await showClass(class_code);
        const { class_name, teacher_code } = classDetail.data;
        reset({ class_code, class_name, teacher_code });
      } catch (e) {
        enqueueSnackbar('Lấy thông tin lớp học thất bại!', { variant: 'error' });
        if (typeof e?.errors == 'object') {
          for (let message of Object.values(e?.errors)) {
            enqueueSnackbar(message, { variant: 'error' });
          }
        }
      }
    }

    fetchClassInfo();
  }, []);

  const onSubmit = async (formData) => {
    try {
      const res = await updateClass(class_code, formData);
      reset();
      enqueueSnackbar(res.message && 'Cập nhật lớp học thành công!');
      navigate(PATH_DASHBOARD.class.list);
    } catch (e) {
      enqueueSnackbar('Cập nhật lớp học thất bại!', { variant: 'error' });
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
                <Typography>Mã lớp học</Typography>
                <RHFTextField name="class_code" disabled />
              </Stack>
              <Stack direction="column" spacing={1}>
                <Typography>Tên lớp học</Typography>
                <RHFTextField name="class_name" />
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
              <Stack direction="row" justifyContent="flex-end" spacing={3}>
                <Button variant="outlined" type="submit">Cập nhật</Button>
                <Button variant="outlined" onClick={() => navigate(PATH_DASHBOARD.class.list)}>Hủy</Button>
              </Stack>
            </Stack>

          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
