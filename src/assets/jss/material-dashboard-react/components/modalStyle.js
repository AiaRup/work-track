import { primaryColor } from '../../material-dashboard-react.js';

const modalStyle = {
  modal: {
    minWidth: 300,
    maxWidth: 600,
    margin: '0 auto'
  },
  title: {
    margin: 0,
    padding: '20px'
  },
  content: {
    padding: '20px'
  },
  actions: {
    padding: '20px'
  },
  closeButton: {
    position: 'absolute',
    right: '10px',
    top: '10px',
    color: primaryColor[0]
  },
  formControl: {
    margin: '10px',
    minWidth: 120
  }
};
export default modalStyle;
