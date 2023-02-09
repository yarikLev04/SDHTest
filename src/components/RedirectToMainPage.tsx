import {
    Outlet,
    useLocation,
    useNavigate
} from 'react-router-dom';
import { useEffect } from 'react';

export function RedirectToMainPage() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/') {
            navigate('/users');
        }
    }, []);

    return (
        <Outlet />
    );
}
