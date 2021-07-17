import { blackColor } from '../../material-dashboard-react';

const buttonStyle = {
  floatingButton: {
    position: 'sticky',
    bottom: '20px',
    left: 'calc(100vw)',
    backgroundColor: blackColor,
    '&:hover,&:focus,&:visited': {
      backgroundColor: '#333333'
    }
  }
};
export default buttonStyle;
