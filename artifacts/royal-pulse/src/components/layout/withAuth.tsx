import { useEffect } from 'react';
import { useLocation } from 'wouter';

export function withAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
  return function AuthGuard(props: P) {
    const [location, setLocation] = useLocation();
    
    useEffect(() => {
      const isAuthenticated = sessionStorage.getItem('royal_pulse_admin') === 'true';
      if (!isAuthenticated && location !== '/admin/login') {
        setLocation('/admin/login');
      }
    }, [location, setLocation]);

    // If not authenticated, we still return null initially to prevent flash of content
    const isAuthenticated = sessionStorage.getItem('royal_pulse_admin') === 'true';
    if (!isAuthenticated) return null;

    return <WrappedComponent {...props} />;
  };
}
