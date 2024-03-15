import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const navigate = useNavigate()
    const auth = localStorage.getItem('auth') ?  JSON.parse(localStorage.getItem('auth')) : null;

    useEffect(() => {
        if (auth === null) {
            return navigate('/unauthenticated', { replace: true })
        }
    }, [navigate, auth])

    return <Outlet />;
};

export default PrivateRoute;
