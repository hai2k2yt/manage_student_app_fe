import PropTypes from 'prop-types';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Typography } from '@mui/material';
// utils
import { fNumber } from '../../../../utils/formatNumber';
// components

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 24,
  height: 24,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.success.main,
  backgroundColor: alpha(theme.palette.success.main, 0.16),
}));

// ----------------------------------------------------------------------

AppWidgetSummary.propTypes = {
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default function AppWidgetSummary({ title, total }) {

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{title}</Typography>

        <Typography variant="h3">{fNumber(total)}</Typography>
      </Box>

    </Card>
  );
}
