import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import { Card, ImageList, ImageListItem } from '@mui/material';

import Scrollbar from '../../../../components/Scrollbar';
// sections
import { getClubSessionPhotoBySession } from '../../../../api/club_session_photo';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
ClubSessionPhotoList.propTypes = {};
export default function ClubSessionPhotoList() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [clubSessionPhotoList, setClubSessionPhotoList] = useState([]);
  const { session_code } = useParams();
  useEffect(() => {
    async function fetchData() {
      try {
        const clubSessionPhotos = await getClubSessionPhotoBySession(session_code);
        const records = clubSessionPhotos?.data?.data || [];
        setClubSessionPhotoList(records);
      } catch (e) {
        enqueueSnackbar('Lấy danh sách ảnh buổi học thất bại', {variant: 'error'});
        console.error(e)
      }
    }
    fetchData();
  }, []);

  return (
    <Card>
      <Scrollbar>
        <ImageList sx={{ height: 450 }} cols={3} rowHeight={150}>
          {clubSessionPhotoList.map((item) => (
            <ImageListItem key={item.photo_url}>
              <img
                src={(process.env.SERVER_HOST_API || 'http://localhost:8000/') + item.photo_url}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Scrollbar>
    </Card>
  );
}

// ----------------------------------------------------------------------