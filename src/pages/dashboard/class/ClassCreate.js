
// @mui
import { Container } from '@mui/material';

// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import ClassNewForm from '../../../sections/@dashboard/e-commerce/ClassNewForm';

// ----------------------------------------------------------------------

export default function ClassCreate() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Class: Create">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading='Create a new class'
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'E-Commerce',
              href: PATH_DASHBOARD.class.root,
            },
            { name: 'New class'},
          ]}
        />

        <ClassNewForm />
      </Container>
    </Page>
  );
}
