import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AdminRoute = () => {
    const auth = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null;
    const navigate = useNavigate();

    useEffect(() => {
        if (auth === null) {
            return navigate('/unauthenticated', { replace: true });
        } else if (auth.user.role != 'admin') {
            return navigate('/unauthorized', { replace: true });
        }
    }, [auth, navigate]);

    return <Outlet />;
};

export default AdminRoute