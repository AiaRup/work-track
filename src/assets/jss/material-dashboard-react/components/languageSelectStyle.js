import { grayColor } from '../../material-dashboard-react.js';

const languageSelectStyle = {
  icon: {
    display: 'none'
  },
  selectOptions: {
    background: grayColor[5],
    border: 0,
    borderRadius: '40px',
    padding: 6,
    '&:before': {
      border: 0
    },
    '&:after': {
      border: 0
    },
    '&:hover': {
      border: 0,
      '&:before': {
        border: 0
      }
    },
    '& .MuiSelect-filled.MuiSelect-filled': {
      paddingRight: 10,
      background: 'transparent'
    }
  },
  option: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  }
};

export default languageSelectStyle;
