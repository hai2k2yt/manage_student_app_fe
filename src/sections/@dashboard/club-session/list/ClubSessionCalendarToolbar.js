import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Button, IconButton, Stack, Typography } from '@mui/material';
// utils
import { fMonth } from '../../../../utils/formatTime';
// hooks
// components
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------



const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(2.5),
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

// ----------------------------------------------------------------------

ClubSessionCalendarToolbar.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  onToday: PropTypes.func,
  onNextDate: PropTypes.func,
  onPrevDate: PropTypes.func,
};

export default function ClubSessionCalendarToolbar({ date, onToday, onNextDate, onPrevDate }) {

  return (
    <RootStyle>
      <Stack direction="row" alignItems="center" spacing={2}>
        <IconButton onClick={onPrevDate}>
          <Iconify icon="eva:arrow-ios-back-fill" width={20} height={20} />
        </IconButton>

        <Typography variant="h5">{fMonth(date)}</Typography>

        <IconButton onClick={onNextDate}>
          <Iconify icon="eva:arrow-ios-forward-fill" width={20} height={20} />
        </IconButton>
      </Stack>

        <Button size="small" color="error" variant="contained" onClick={onToday}>
          Today
        </Button>

    </RootStyle>
  );
}
