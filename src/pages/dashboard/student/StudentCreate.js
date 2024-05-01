// @mui
import { Container } from '@mui/material';

// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import StudentCreateForm from '../../../sections/@dashboard/student/create/StudentCreateForm';

// ----------------------------------------------------------------------

export default function StudentCreate() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Student: Create">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading='Tạo học sinh'
          links={[
            { name: 'Trang chủ', href: PATH_DASHBOARD.root },
            {
              name: 'Học sinh',
              href: PATH_DASHBOARD.student.root,
            },
            { name: 'Tạo mới'},
          ]}
        />

        <StudentCreateForm />
      </Container>
    </Page>
  );
}
