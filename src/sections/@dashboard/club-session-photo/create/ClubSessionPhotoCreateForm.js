import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Button, Card, Grid, Stack, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
  RHFUploadMultiFile,
  RHFUploadSingleFile,
} from '../../../../components/hook-form';
import { getClubStudents } from '../../../../api/club';
import { storeAbsenceReport } from '../../../../api/absence_report';
import { storeClubSessionPhoto } from '../../../../api/club_session_photo';

// ----------------------------------------------------------------------

export default function ClubSessionPhotoCreateForm() {
  const navigate = useNavigate();
  const [studentList, setStudentList] = useState([]);
  const [photo, setPhoto] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const {session_code, club_code} = useParams();

  const CreateAbsenceReportSchema = Yup.object().shape({
    session_code: Yup.string().required('Buổi học không được để trống'),
    photo_url: Yup.mixed().required('Ảnh không được để trống'),
  });

  const defaultValues = {
    session_code: session_code,
    photo_url: null,

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

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setPhoto(file);
        setValue(
          'photo_url',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
      console.log(file)

    },
    [setValue]
  );

  useEffect(() => {
    reset(defaultValues);

  }, []);

  const onSubmit = async (formData) => {
    try {
      let data = new FormData();

      data.append('session_code', formData.session_code);
      data.append('photo_url', formData.photo_url);
      const res = await storeClubSessionPhoto(data);
      reset();
      enqueueSnackbar(res.message || 'Thêm ảnh thành công!');
      navigate(`${PATH_DASHBOARD.club.root}/${club_code}/session/${session_code}/detail`);
    } catch (e) {
      enqueueSnackbar('Thêm ảnh thất bại!', {variant: 'error'});
      console.error(e)
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Stack direction='column' spacing={1}>
                <Typography>Mã buổi học</Typography>
                <RHFTextField name="session_code" disabled />
              </Stack>
              <Stack direction='column' spacing={1}>
                <Typography>Ảnh</Typography>
                <RHFUploadSingleFile
                  name='photo_url'
                  accept="image/*"
                  maxSize={3145728}
                  onDrop={handleDrop}
                />
              </Stack>
              <Stack direction='row' justifyContent='flex-end' spacing={3}>
                <Button variant="outlined" type="submit">Thêm</Button>
                <Button variant="outlined" onClick={() => navigate(`${PATH_DASHBOARD.club.root}/${club_code}/session/${session_code}/detail`)}>Hủy</Button>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
