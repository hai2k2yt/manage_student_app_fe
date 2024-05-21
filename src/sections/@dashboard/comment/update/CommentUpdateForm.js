import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Button, Card, Grid, Stack, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import { FormProvider, RHFTextField } from '../../../../components/hook-form';
import { showComment, updateComment } from '../../../../api/comment';

// ----------------------------------------------------------------------

export default function CommentUpdateForm() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { club_code, session_code, comment_id } = useParams();

  const UpdateCommentSchema = Yup.object().shape({
    session_code: Yup.string().required('Buổi học không được để trống'),
    student_code: Yup.string().required('Học sinh không được để trống'),
    content: Yup.string().required('Nội dung không được để trống'),
  });

  const defaultValues = {
    session_code: '',
    student_code: '',
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
      const { session_code, student_code, content } = commentDetail.data;
      reset({ session_code, student_code, content });
    }

    fetchCommentInfo();
  }, []);

  const onSubmit = async (formData) => {
    try {
      const res = await updateComment(comment_id, { content: formData.content });
      reset();
      enqueueSnackbar( 'Cập nhật đánh giá thành công!');
      navigate(`${PATH_DASHBOARD.club.root}/${club_code}/session/${session_code}/detail`);
    } catch (e) {
      enqueueSnackbar('Cập nhật đánh giá thất bại!', { variant: 'error' });
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
                <Typography>Buổi học</Typography>
                <RHFTextField name="session_code" disabled />
              </Stack>
              <Stack direction="column" spacing={1}>
                <Typography>Học sinh</Typography>
                <RHFTextField name="student_code" disabled />
              </Stack>
              <Stack direction="column" spacing={1}>
                <Typography>Nội dung</Typography>
                <RHFTextField name="content" />
              </Stack>
              <Stack direction="row" justifyContent="flex-end" spacing={3}>
                <Button variant="outlined" type="submit">Cập nhật</Button>
                <Button variant="outlined" onClick={() => navigate(PATH_DASHBOARD.club.list)}>Hủy</Button>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
