import { ApplicationRouteProp, appRoutes } from '../configs/constants/app';

export const getPageInfo = (
  location: string
): ApplicationRouteProp | undefined => {
  const found = Object.keys(appRoutes).find((route) => {
    if (appRoutes[route].path === location) {
      return appRoutes[route];
    }
  });

  if (found !== undefined) {
    return appRoutes[found];
  }
};
