// @mui
import { Container } from '@mui/material';

// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { useParams } from 'react-router-dom';
import StudentAbsenceCreateForm from '../../../sections/@dashboard/student/absence-report/StudentAbsenceCreateForm';

// ----------------------------------------------------------------------

export default function AbsenceReportCreate() {
  const { themeStretch } = useSettings();
  const {club_code, student_code} = useParams();

  return (
    <Page title="Student absence: Create">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading='Tạo báo cáo nghỉ'
          links={[
            { name: 'Trang chủ', href: PATH_DASHBOARD.root },
            {
              name: 'Học sinh',
              href: PATH_DASHBOARD.student.root,
            },
            {
              name: 'Chi tiết học sinh',
              href: `${PATH_DASHBOARD.student.root}/${student_code}/detail`,
            },
            { name: 'Tạo báo cáo nghỉ'},
          ]}
        />

        <StudentAbsenceCreateForm />
      </Container>
    </Page>
  );
}
