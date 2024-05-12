import PropTypes from 'prop-types';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Toolbar, Tooltip, IconButton, Typography, InputAdornment, Button } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';
import InputStyle from '../../../../components/InputStyle';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'flex-start',
  gap: 20,
  padding: theme.spacing(0, 1, 0, 3),
}));

// ----------------------------------------------------------------------

ClubListToolbar.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function ClubListToolbar({filterName, onFilterName}) {
  const [inputValue, setInputValue] = useState(filterName);
  const handleSearch = () => {
    onFilterName(inputValue);
  }

  return (
    <RootStyle>
      <InputStyle
        stretchStart={240}
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        placeholder="Tìm CLB..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          ),
        }}
      />
      <Button variant="outlined" onClick={handleSearch}>Tìm kiếm</Button>
    </RootStyle>
  );
}
