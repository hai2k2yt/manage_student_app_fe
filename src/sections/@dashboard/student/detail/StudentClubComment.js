import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import { getClubStudentComments } from '../../../../api/comment';

export default function StudentClubComment({studentCode, clubCode}) {
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await getClubStudentComments(
        {club_code: clubCode, student_code: studentCode}
      )
      const records = res?.data;
      setCommentList(records);
    }
    fetchData();
  }, []);
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Mã buổi học</TableCell>
          <TableCell>Nội dung</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {commentList.map((row) => (
          <TableRow
            key={row?.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row?.session_code}
            </TableCell>
            <TableCell component="th" scope="row">
              {row?.content}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}