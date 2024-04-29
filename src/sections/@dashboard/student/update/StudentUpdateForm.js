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
import { getAllClasses, showClass, updateClass } from '../../../../api/class';
import { getAllTeachers } from '../../../../api/teacher';
import { showStudent, updateStudent } from '../../../../api/student';

// ----------------------------------------------------------------------

export default function StudentUpdateForm() {
  const navigate = useNavigate();
  const [parentList, setParentList] = useState([]);
  const [classList, setClassList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const { student_code } = useParams();


  const UpdateStudentSchema = Yup.object().shape({
    student_code: Yup.string().required('Student code is required'),
    name: Yup.string().required('Name is required'),
    user_id: Yup.string().nullable(),
    class_code: Yup.string().nullable(),
  });

  const defaultValues = {
    student_code: '',
    name: '',
    user_id: '',
    class_code: '',
  };

  const methods = useForm({
    resolver: yupResolver(UpdateStudentSchema),
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

    async function fetchClasses() {
      try {
        const classes = await getAllClasses();
        setClassList(classes?.data);
      } catch (e) {
        enqueueSnackbar('Get classes failed!', { variant: 'error' });
      }
    }

    fetchClasses();

    async function fetchParents() {
      try {
        const parents = await getUser({ role: 2 });
        setParentList(parents?.data?.records);
      } catch (e) {
        enqueueSnackbar('Get parents failed!', { variant: 'error' });
      }
    }

    fetchParents();

    async function fetchStudentInfo() {
      try {
        const studentDetail = await showStudent(student_code);
        const { student_code: code, name, user_id, class_code } = studentDetail.data;
        reset({ student_code: code, name, user_id, class_code });
      } catch (e) {
        enqueueSnackbar('Get student info failed', { variant: 'error' });
        console.error(e);
      }
    }

    fetchStudentInfo();
  }, []);

  const onSubmit = async (formData) => {
    try {
      const body = {
        name: formData.name,
        user_id: formData.user_id,
        class_code: formData.class_code
      }
      const res = await updateStudent(student_code, body);
      reset();
      enqueueSnackbar(res.message && 'Update student success!');
      navigate(PATH_DASHBOARD.student.list);
    } catch (error) {
      enqueueSnackbar('Update student failed!', { variant: 'error' });
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
                <Typography>Student code</Typography>
                <RHFTextField name="student_code" disabled />
              </Stack>
              <Stack direction="column" spacing={1}>
                <Typography>Name</Typography>
                <RHFTextField name="name" />
              </Stack>
              <Stack direction="column" spacing={1}>
                <Typography>Teacher</Typography>
                <RHFSelect name="user_id">
                  <option key="" value="">
                    -- Choose parent --
                  </option>
                  {parentList.map((parent) => (
                    <option key={parent.id} value={parent.id}>
                      {parent.name}
                    </option>
                  ))}
                </RHFSelect>
              </Stack>
              <Stack direction="column" spacing={1}>
                <Typography>Class</Typography>
                <RHFSelect name="class_code">
                  <option key="" value="">
                    -- Choose class --
                  </option>
                  {classList.map((studentClass) => (
                    <option key={studentClass.class_code} value={studentClass.class_code}>
                      {studentClass.class_name}
                    </option>
                  ))}
                </RHFSelect>
              </Stack>
              <Stack direction="row" justifyContent="flex-end" spacing={3}>
                <Button variant="outlined" type="submit">Submit</Button>
                <Button variant="outlined" onClick={() => navigate(PATH_DASHBOARD.student.list)}>Cancel</Button>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
