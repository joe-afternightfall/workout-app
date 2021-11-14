import { getPageInfo } from './get-current-page-info';
import { appRoutes } from '../configs/constants/app';

describe('Get Current Page Info util', () => {
  it('should return route prop object for dashboard', () => {
    const pageInfo = getPageInfo('/dashboard');

    expect(pageInfo).toBe(appRoutes.DASHBOARD);
  });

  it('should return undefined when not found', () => {
    const pageInfo = getPageInfo('/test-location');

    expect(pageInfo).toBe(undefined);
  });
});
