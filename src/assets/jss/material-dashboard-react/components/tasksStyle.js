import {
  defaultFont,
  dangerColor,
  grayColor,
  blackColor
} from '../../material-dashboard-react.js';
import tooltipStyle from './tooltipStyle.js';
const tasksStyle = {
  ...tooltipStyle,
  table: {
    marginBottom: '0',
    overflow: 'visible'
  },
  tableRow: {
    position: 'relative',
    borderBottom: '1px solid ' + grayColor[5]
  },
  tableActions: {
    display: 'flex',
    border: 'none',
    padding: '12px 8px !important',
    verticalAlign: 'middle',
    justifyContent: 'flex-end'
  },
  tableCell: {
    ...defaultFont,
    padding: '8px',
    verticalAlign: 'middle',
    border: 'none',
    lineHeight: '1.42857143',
    fontSize: '14px'
  },
  tableCellRTL: {
    textAlign: 'right'
  },
  tableActionButton: {
    width: '27px',
    height: '27px',
    padding: '0'
  },
  tableActionButtonIcon: {
    width: '17px',
    height: '17px'
  },
  edit: {
    backgroundColor: 'transparent',
    color: blackColor,
    boxShadow: 'none'
  },
  close: {
    backgroundColor: 'transparent',
    color: dangerColor[0],
    boxShadow: 'none'
  },
  bold: {
    fontWeight: 'bold'
  }
};
export default tasksStyle;
