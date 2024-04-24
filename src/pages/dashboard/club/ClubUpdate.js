import { useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
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
import ClubUpdateForm from '../../../sections/@dashboard/club/update/ClubUpdateForm';

// ----------------------------------------------------------------------

export default function ClubUpdate() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Edit club">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading='Edit club'
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Club',
              href: PATH_DASHBOARD.club.list,
            },
            { name: 'Edit club' },
          ]}
        />

        <ClubUpdateForm />
      </Container>
    </Page>
  );
}
