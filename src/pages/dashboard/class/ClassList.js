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
// components
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { ClassListHead, ClassListToolbar, ClassMoreMenu } from '../../../sections/@dashboard/class/list';
import { destroyClass, getClasses } from '../../../api/class';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'class_code', label: 'Mã lớp học', alignRight: false, sortable: true },
  { id: 'class_name', label: 'Tên lớp học', alignRight: false, sortable: true },
  { id: 'teacher.name', label: 'Giáo viên', alignRight: false, sortable: false },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function ClassList() {
  const { themeStretch } = useSettings();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [classList, setClassList] = useState([]);
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
      const users = await getClasses(params);
      const records = users?.data?.records || [];
      setTotal(users?.data?.total || 0)
      setClassList(records);
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

  const handleDeleteClass = async (class_code) => {
    try {
      await destroyClass(class_code);
      navigate(0);
      enqueueSnackbar('Xóa lớp học thành công')
    } catch (e) {
      enqueueSnackbar('Xóa lớp học thất bại', {variant: 'error'})
      console.error(e)
    }
  };

  const emptyRows = _page > 0 ? Math.max(0, _limit - classList.length) : 0;

  const isNotFound = !classList.length && Boolean(filterName);

  return (
    <Page title="Class: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Danh sách lớp học"
          links={[
            { name: 'Trang chủ', href: PATH_DASHBOARD.root },
            { name: 'Lớp học', href: PATH_DASHBOARD.class.root },
            { name: 'Danh sách' },
          ]}
        />

        <Card>
          <ClassListToolbar
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ClassListHead
                  order={_order}
                  orderBy={_sort}
                  headLabel={TABLE_HEAD}
                  rowCount={classList.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {classList.map((row) => {
                    const { class_code, class_name, teacher: {teacher_name} } = row;

                    return (
                      <TableRow
                        hover
                        key={class_code}
                        tabIndex={-1}
                        role="checkbox"

                      >
                        <TableCell align="left">{class_code}</TableCell>
                        <TableCell align="left">{class_name}</TableCell>
                        <TableCell align="left">{teacher_name}</TableCell>
                        <TableCell align="right">
                          <ClassMoreMenu onDelete={() => handleDeleteClass(class_code)} classCode={class_code} />
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