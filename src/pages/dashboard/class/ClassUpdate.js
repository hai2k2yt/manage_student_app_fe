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

// ----------------------------------------------------------------------

export default function ClassUpdate() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Ecommerce: Edit class">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading='Edit class'
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Class',
              href: PATH_DASHBOARD.class.root,
            },
            { name: 'Edit class' },
          ]}
        />

        <ClassUpdateForm />
      </Container>
    </Page>
  );
}
