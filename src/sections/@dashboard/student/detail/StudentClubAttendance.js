import { Chip, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getAttendances, getClubStudentAttendances } from '../../../../api/attendance';
const renderPresent = (absence) => {
  if(absence == 1) {
    return <Chip label="Có mặt" color="primary" />
  }
  if(absence == 2) {
    return <Chip label="Nghỉ phép" color="warning" />
  }if(absence == 3) {
    return <Chip label="Vắng mặt" color="error" />
  }
}

export default function StudentClubAttendance({ studentCode, clubCode }) {
  const [attendance, setAttendance] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await getClubStudentAttendances(
        { club_code: clubCode, student_code: studentCode },
      );
      const records = res?.data;
      setAttendance(records);
    }
    fetchData();
  }, []);


  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Mã buổi học</TableCell>
          <TableCell align="right">Trạng thái</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {attendance?.map((row) => (
          <TableRow
            key={row?.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row?.session_code}
            </TableCell>
            <TableCell align="right">{renderPresent(row?.present)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}