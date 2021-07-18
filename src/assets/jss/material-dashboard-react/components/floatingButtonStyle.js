import { blackColor } from '../../material-dashboard-react';

const buttonStyle = {
  floatingButton: {
    position: 'sticky',
    bottom: '60px',
    zIndex: 10,
    left: 'calc(100vw)',
    backgroundColor: blackColor,
    '&:hover,&:focus,&:visited': {
      backgroundColor: '#333333'
    }
  }
};
export default buttonStyle;
