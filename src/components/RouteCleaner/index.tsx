import { useEffect } from 'react';
import { showMessage } from '../../adapters/showMessage';
import { useLocation } from 'react-router';

export function RouteCleaner() {
  const location = useLocation();

  useEffect(() => {
    showMessage.dismiss();
  }, [location]);

  return null;
}
