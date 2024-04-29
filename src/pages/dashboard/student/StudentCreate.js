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
          heading='Create student'
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Student',
              href: PATH_DASHBOARD.student.root,
            },
            { name: 'Create student'},
          ]}
        />

        <StudentCreateForm />
      </Container>
    </Page>
  );
}
