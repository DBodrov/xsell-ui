import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { auditService } from 'services';

export function usePageView() {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '/anketa') {
      return;
    } else {
      auditService.pageView(location.pathname, { toBE: true });
    }
  }, [location.pathname]);
}
