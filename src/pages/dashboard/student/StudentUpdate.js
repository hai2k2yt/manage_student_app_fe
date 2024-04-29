// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import ClassUpdateForm from '../../../sections/@dashboard/class/update/ClassUpdateForm';
import StudentUpdateForm from '../../../sections/@dashboard/student/update/StudentUpdateForm';

// ----------------------------------------------------------------------

export default function StudentUpdate() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Student: Edit">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading='Edit student'
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Student',
              href: PATH_DASHBOARD.student.root,
            },
            { name: 'Edit student' },
          ]}
        />

        <StudentUpdateForm />
      </Container>
    </Page>
  );
}
