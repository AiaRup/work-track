import { dashboardRoutes as routes } from '../Router';

export const useRouteName = () => {
  let name = '';
  routes.forEach((route) => {
    if (window.location.href.indexOf(route.layout + route.path) !== -1) {
      name = routes.rtlActive ? route.rtlName : route.name;
    }
  });
  return name;
};
