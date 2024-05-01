import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { Card, Chip, Grid, Stack, TextField, Typography, Autocomplete, InputAdornment, Button } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import {
  FormProvider,
  RHFSwitch,
  RHFSelect,
  RHFEditor,
  RHFTextField,
  RHFRadioGroup,
  RHFUploadMultiFile,
} from '../../../components/hook-form';
import { getAllUser, getUser } from '../../../api/user';
import { storeClass } from '../../../api/class';
import { getAllTeachers } from '../../../api/teacher';

// ----------------------------------------------------------------------

export default function ClassNewForm() {
  const navigate = useNavigate();
  const [teacherList, setTeacherList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
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
    resolver: yupResolver(NewProductSchema),
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
        setTeacherList(teachers.data)
      } catch (e) {
        enqueueSnackbar('Lấy danh sách giáo viên thất bại!', {variant: 'error'});
        console.error(e)
      }
    }
    fetchTeacher();
  }, []);

  const onSubmit = async (formData) => {
    try {
      const res = await storeClass(formData);
      reset();
      enqueueSnackbar(res.message || 'Tạo lớp học thành công!');
      navigate(PATH_DASHBOARD.class.list);
    } catch (error) {
      enqueueSnackbar('Tạo lớp học thất bại!', {variant: 'error'});
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
                <Typography>Mã lớp học</Typography>
                <RHFTextField name="class_code"/>
              </Stack>
              <Stack direction='column' spacing={1}>
                <Typography>Tên lớp học</Typography>
                <RHFTextField name="class_name"/>
              </Stack>
              <Stack direction='column' spacing={1}>
                <Typography>Giáo viên</Typography>
                <RHFSelect name="teacher_code">
                  <option key='' value=''>
                    -- Chọn giáo viên --
                  </option>
                  {teacherList.map((teacher) => (
                    <option key={teacher.teacher_code} value={teacher.teacher_code}>
                      {teacher.teacher_name}
                    </option>
                  ))}
                </RHFSelect>
              </Stack>
              <Stack direction='row' justifyContent='flex-end' spacing={3}>
                <Button variant="outlined" type="submit">Tạo</Button>
                <Button variant="outlined" onClick={() => navigate(PATH_DASHBOARD.class.list)}>Hủy</Button>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
