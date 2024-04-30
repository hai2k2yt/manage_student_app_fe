import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {
  Card,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// _mock_
// components
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { useSnackbar } from 'notistack';
import { destroyStudent, getStudents } from '../../../api/student';
import StudentListToolbar from '../../../sections/@dashboard/student/list/StudentListToolbar';
import StudentMoreMenu from '../../../sections/@dashboard/student/list/StudentMoreMenu';
import StudentListHead from '../../../sections/@dashboard/student/list/StudentListHead';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'student_code', label: 'Student code', alignRight: false, sortable: true },
  { id: 'name', label: 'Student name', alignRight: false, sortable: true },
  { id: 'class.class_name', label: 'Class name', alignRight: false, sortable: false },
  { id: 'parent.name', label: 'Parent name', alignRight: false, sortable: false },
  { id: '', label: '', alignRight: false, sortable: false },
];

// ----------------------------------------------------------------------

export default function StudentList() {
  const { themeStretch } = useSettings();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [studentList, setStudentList] = useState([]);
  const [_page, setPage] = useState(0);
  const [_order, setOrder] = useState('asc');
  const [_sort, setSort] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [_limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);

  useEffect( () => {
    async function fetchData() {
      const params = {
        _page: _page + 1,
        _limit,
        _order,
        _sort,
        name_like: filterName
      }
      const students = await getStudents(params);
      const records = students?.data?.records || [];
      setTotal(students?.data?.total || 0)
      setStudentList(records);
    }
    fetchData();
  }, [_page, _limit, _order, _sort, filterName]);

  const handleRequestSort = (event, property) => {
    const isAsc = _sort === property && _order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setSort(property);
  };



  const handleChangeRowsPerPage = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleDeleteStudent = async (student_code) => {
    try {
      await destroyStudent(student_code);
      navigate(0);
      enqueueSnackbar('Delete student successfully')
    } catch (e) {
      enqueueSnackbar('Delete student failed', {variant: 'error'})
      console.error(e)
    }
  };

  const emptyRows = _page > 0 ? Math.max(0, _limit - studentList.length) : 0;

  const isNotFound = !studentList.length && Boolean(filterName);

  return (
    <Page title="Student: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Student List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Student', href: PATH_DASHBOARD.student.root },
            { name: 'List' },
          ]}
        />

        <Card>
          <StudentListToolbar
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <StudentListHead
                  order={_order}
                  orderBy={_sort}
                  headLabel={TABLE_HEAD}
                  rowCount={studentList.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {studentList.map((row) => {
                    const { student_code, name, class: student_class, parent } = row;

                    return (
                      <TableRow
                        hover
                        key={student_code}
                        tabIndex={-1}
                        role="checkbox"

                      >
                        <TableCell align="left">{student_code}</TableCell>
                        <TableCell align="left">{name}</TableCell>
                        <TableCell align="left">{student_class?.class_name || 'No data'}</TableCell>
                        <TableCell align="left">
                          {parent?.name || 'No data'}
                        </TableCell>
                        <TableCell align="right">
                          <StudentMoreMenu onDelete={() => handleDeleteStudent(student_code)} studentCode={student_code} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={total}
            rowsPerPage={_limit}
            page={_page}
            onPageChange={(e, page) => setPage(page)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------