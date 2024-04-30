import PropTypes from 'prop-types';
// @mui
import { Box, Checkbox, TableRow, TableCell, TableHead, TableSortLabel, Typography } from '@mui/material';
import { useState } from 'react';

// ----------------------------------------------------------------------

const visuallyHidden = {
  border: 0,
  clip: 'rect(0 0 0 0)',
  height: '1px',
  margin: -1,
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: '1px',
};

StudentClubInfo.propTypes = {
  club_code: PropTypes.string,
  student_code: PropTypes.string,
};

export default function StudentClubInfo({ club_code, student_code, }) {
  const [sessionList, setSessionList] = useState([])


  return (
    <>
      <Typography>

      </Typography>
    </>
  );
}
