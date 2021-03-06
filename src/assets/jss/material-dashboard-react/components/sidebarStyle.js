import {
  drawerWidth,
  transition,
  boxShadow,
  defaultFont,
  whiteColor,
  grayColor,
  blackColor,
  hexToRgb
} from '../../material-dashboard-react.js';

const sidebarStyle = (theme) => ({
  drawerPaper: {
    border: 'none',
    position: 'fixed',
    top: '0',
    bottom: '0',
    left: '0',
    zIndex: '1',
    background: blackColor,
    opacity: 0.9,
    ...boxShadow,
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'fixed',
      height: '100%'
    },
    [theme.breakpoints.down('sm')]: {
      width: drawerWidth,
      ...boxShadow,
      position: 'fixed',
      display: 'block',
      top: '0',
      height: '100vh',
      right: '0',
      left: 'auto',
      zIndex: '1032',
      visibility: 'visible',
      overflowY: 'visible',
      borderTop: 'none',
      textAlign: 'left',
      paddingRight: '0px',
      paddingLeft: '0',
      transform: `translate3d(${drawerWidth}px, 0, 0)`,
      ...transition
    }
  },
  drawerPaperRTL: {
    [theme.breakpoints.up('md')]: {
      left: 'auto !important',
      right: '0 !important'
    },
    [theme.breakpoints.down('sm')]: {
      left: '0  !important',
      right: 'auto !important'
    }
  },
  logo: {
    position: 'relative',
    padding: '15px 15px',
    zIndex: '4',
    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: '0',
      height: '1px',
      right: '15px',
      width: 'calc(100% - 30px)',
      backgroundColor: 'rgba(' + hexToRgb(grayColor[6]) + ', 0.3)'
    }
  },
  closeIcon: {
    '&:hover': {
      cursor: 'pointer'
    }
  },
  logoLink: {
    ...defaultFont,
    textTransform: 'uppercase',
    padding: '5px 0',
    fontSize: '18px',
    textAlign: 'left',
    fontWeight: '400',
    lineHeight: '30px',
    textDecoration: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    '&,&:hover': {
      color: whiteColor
    }
  },
  logoLinkRTL: {
    textAlign: 'right'
  },
  logoImage: {
    width: '30px',
    display: 'inline-block',
    maxHeight: '30px',
    marginLeft: '10px',
    marginRight: '15px'
  },
  img: {
    width: '35px',
    top: '22px',
    position: 'absolute',
    verticalAlign: 'middle',
    border: '0'
  },
  background: {
    position: 'absolute',
    zIndex: '1',
    height: '100%',
    width: '100%',
    display: 'block',
    top: '0',
    left: '0',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    '&:after': {
      position: 'absolute',
      zIndex: '3',
      width: '100%',
      height: '100%',
      content: '""',
      display: 'block',
      background: blackColor,
      opacity: '.8'
    }
  },
  list: {
    marginTop: '20px',
    paddingLeft: '0',
    paddingTop: '0',
    paddingBottom: '0',
    marginBottom: '20px',
    listStyle: 'none',
    position: 'unset'
  },
  item: {
    position: 'relative',
    display: 'block',
    textDecoration: 'none',
    '&:hover,&:focus,&:visited,&': {
      color: whiteColor
    }
  },
  itemLink: {
    width: 'auto',
    transition: 'all 300ms linear',
    margin: '10px 15px 0',
    borderRadius: '3px',
    position: 'relative',
    display: 'block',
    padding: '10px 15px',
    backgroundColor: 'transparent',
    ...defaultFont
  },
  itemIcon: {
    width: '24px',
    height: '30px',
    fontSize: '24px',
    lineHeight: '30px',
    float: 'left',
    marginRight: '15px',
    textAlign: 'center',
    verticalAlign: 'middle',
    color: 'rgba(' + hexToRgb(whiteColor) + ', 0.8)'
  },
  itemIconRTL: {
    marginRight: '3px',
    marginLeft: '15px',
    float: 'right'
  },
  itemText: {
    ...defaultFont,
    margin: '0',
    lineHeight: '30px',
    fontSize: '14px',
    color: whiteColor
  },
  itemTextRTL: {
    textAlign: 'right'
  },
  whiteFont: {
    color: whiteColor
  },
  gray: {
    backgroundColor: grayColor[0],
    boxShadow:
      '0 2px 4px -10px rgba(' +
      hexToRgb(grayColor[0]) +
      ',.28), 0 4px 20px 0 rgba(' +
      hexToRgb(blackColor) +
      ',.12), 0 7px 8px -5px rgba(' +
      hexToRgb(grayColor[0]) +
      ',.2)',
    '&:hover,&:focus': {
      backgroundColor: grayColor[0],
      boxShadow:
        '0 2px 4px -10px rgba(' +
        hexToRgb(grayColor[0]) +
        ',.28), 0 4px 20px 0 rgba(' +
        hexToRgb(blackColor) +
        ',.12), 0 7px 8px -5px rgba(' +
        hexToRgb(grayColor[0]) +
        ',.2)'
    }
  },
  sidebarWrapper: {
    position: 'relative',
    // height: 'calc(100vh - 75px)',
    overflow: 'auto',
    width: '260px',
    zIndex: '4',
    overflowScrolling: 'touch',
    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: '0',
      height: '1px',
      right: '15px',
      width: 'calc(100% - 30px)',
      backgroundColor: 'rgba(' + hexToRgb(grayColor[6]) + ', 0.3)'
    }
  },
  activePro: {
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      width: '100%',
      bottom: '13px'
    }
  },
  languageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: '20px',
    position: 'relative',
    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: '0',
      height: '1px',
      right: '15px',
      width: 'calc(100% - 30px)',
      backgroundColor: 'rgba(' + hexToRgb(grayColor[6]) + ', 0.3)'
    }
  },
  languageButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: blackColor,
    color: whiteColor
  },
  flag: {
    width: '30px',
    marginRight: '10px'
  },
  logoutButton: {
    display: 'block',
    marginTop: '20px',
    color: whiteColor,
    marginLeft: '35px',
    padding: 0,
    textTransform: 'capitalize',
    fontSize: '14px',
    fontFamily: 'Roboto',
    fontWeight: 300,
    lineHeight: '30px'
  },
  logoutIcon: {
    marginRight: '15px'
  }
});

export default sidebarStyle;
