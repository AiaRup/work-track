import {
  dangerBoxShadow,
  dangerColor,
  grayColor,
  roseColor,
  whiteColor,
  roseBoxShadow
} from '../../material-dashboard-react';

const profileSettingsStyle = (theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    '& label.Mui-focused': {
      color: grayColor[0]
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: grayColor[0]
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: grayColor[0]
      },
      '&.Mui-focused fieldset': {
        borderColor: grayColor[0]
      }
    }
  },
  input: { marginBottom: theme.spacing(3) },
  submit: {
    marginBottom: theme.spacing(3),
    background:
      'linear-gradient(60deg, ' + dangerColor[1] + ', ' + dangerColor[2] + ')',
    ...dangerBoxShadow,
    color: whiteColor
  },
  savePassword: {
    marginBottom: theme.spacing(3),
    background:
      'linear-gradient(60deg, ' + roseColor[1] + ', ' + roseColor[2] + ')',
    ...roseBoxShadow,
    color: whiteColor
  }
});

export default profileSettingsStyle;
