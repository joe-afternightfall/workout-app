import {
  mobileRoutes,
  MobileRouteProp,
} from '../configs/constants/mobile-routes';

export const getPageInfo = (location: string): MobileRouteProp | undefined => {
  const found = Object.keys(mobileRoutes).find((route) => {
    if (mobileRoutes[route].path === location) {
      return mobileRoutes[route];
    }
  });

  if (found !== undefined) {
    return mobileRoutes[found];
  }
};
