import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import {
  Card,
  ImageList,
  ImageListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@mui/material';

import Scrollbar from '../../../../components/Scrollbar';
// sections
import PropTypes from 'prop-types';
import { getClubSessionPhotoBySession } from '../../../../api/club_session_photo';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
ClubSessionPhotoList.propTypes = {};
export default function ClubSessionPhotoList() {
  const navigate = useNavigate();

  const [clubSessionPhotoList, setClubSessionPhotoList] = useState([]);
  const { session_code } = useParams();
  useEffect(() => {
    async function fetchData() {


      const clubSessionPhotos = await getClubSessionPhotoBySession(session_code);
      const records = clubSessionPhotos?.data?.data || [];
      setClubSessionPhotoList(records);

    }

    fetchData();
  }, []);


  const handleDeleteSession = (clubId) => {
    navigate(0);
  };


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