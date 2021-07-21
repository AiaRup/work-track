import { dashboardRoutes as routes } from '../Router';
import { FormattedMessage } from 'react-intl';

export const useRouteName = () => {
  let name = '';
  routes.forEach((route) => {
    if (window.location.href.indexOf(route.path) !== -1) {
      name = route.name;
    }
  });
  return name || <FormattedMessage id='dashboard' />;
};
