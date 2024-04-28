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
import { showComment, updateComment } from '../../../../api/comment';

// ----------------------------------------------------------------------

export default function CommentUpdateForm() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { club_code, session_code, comment_id } = useParams();

  const UpdateCommentSchema = Yup.object().shape({
    student_code: Yup.string().required('Student code is required'),
    student_name: Yup.string().required('Club name is required'),
    content: Yup.string().required('Teacher is required'),
  });

  const defaultValues = {
    student_code: '',
    student_name: '',
    content: '',
  };

  const methods = useForm({
    resolver: yupResolver(UpdateCommentSchema),
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

    async function fetchCommentInfo() {
      const commentDetail = await showComment(comment_id);
      const { student_code, student: {name}, content } = commentDetail.data;
      reset({ student_code, student_name: name, content });
    }

    fetchCommentInfo();
  }, []);

  const onSubmit = async (formData) => {
    try {
      const res = await updateComment(comment_id, { content: formData.content });
      reset();
      enqueueSnackbar(res.message || 'Update comment success!');
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
              <Stack direction="column" spacing={1}>
                <Typography>Student code</Typography>
                <RHFTextField name="student_code" disabled />
              </Stack>
              <Stack direction="column" spacing={1}>
                <Typography>Student name</Typography>
                <RHFTextField name="student_name" disabled />
              </Stack>
              <Stack direction="column" spacing={1}>
                <Typography>Content</Typography>
                <RHFTextField name="content" />
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
