import { primaryColor } from '../../material-dashboard-react.js';

const modalStyle = {
  modal: {
    minWidth: 300,
    maxWidth: 600,
    margin: '0 auto'
  },
  titleWrapper: {
    margin: 0,
    padding: '20px'
  },
  title: {
    paddingRight: '32px',
    fontSize: '18px',
    margin: 0
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
  display: {
    borderRight: '1px solid rgba(0, 0, 0, 0.2)',
    width: '40px',
    height: '58px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
    position: 'relative',
    '&:last-of-type': {
      borderRight: 'none'
    }
  },
  codeWrapper: {
    display: 'flex',
    justifyContent: 'center',
    margin: '30px 0'
  },
  wrap: {
    border: '1px solid rgba(0, 0, 0, 0.2)',
    position: 'relative',
    display: 'flex',
    width: '240px'
  },
  input: {
    position: 'absolute',
    border: 'none',
    fontSize: '32px',
    textAlign: 'center',
    backgroundColor: 'transparent',
    outline: 'none',
    padding: 0
  },
  shadows: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    boxShadow: '0 0 0 4px rgba(156, 39, 176, 0.28)'
  },
  anotherCode: {
    border: 0,
    backgroundColor: 'transparent',
    color: primaryColor[1],
    textAlign: 'left',
    padding: 0,
    '&:hover': {
      cursor: 'pointer'
    }
  }
};
export default modalStyle;
