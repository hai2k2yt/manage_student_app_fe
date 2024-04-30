import { Chip, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import { getClubStudentAbsenceReports } from '../../../../api/absence_report';

const renderStatus = (status) => {
  if (status == 1) {
    return <Chip label="Đang chờ" color="warning" />;
  }
  if (status == 2) {
    return <Chip label="Chấp nhận" color="primary" />;
  }
  if (status == 3) {
    return <Chip label="Từ chối" color="error" />;
  }
}
export default function StudentClubAbsenceReport({studentCode, clubCode}) {
  const [absenceList, setAbsenceList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await getClubStudentAbsenceReports(
        {club_code: clubCode, student_code: studentCode}
      )
      const records = res?.data;
      setAbsenceList(records);
    }
    fetchData();
  }, []);
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Session code</TableCell>
          <TableCell>Reason</TableCell>
          <TableCell align="right">Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {absenceList.map((row) => (
          <TableRow
            key={row?.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row?.session_code}
            </TableCell>
            <TableCell component="th" scope="row">
              {row?.reason}
            </TableCell>
            <TableCell align="right">{renderStatus(row?.status)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}