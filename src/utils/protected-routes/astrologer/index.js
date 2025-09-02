import { Outlet } from 'react-router-dom';
import PleaseLoginAstrologer from '../../../components/features/PleaseLoginAstrologer';
import AstrologerDashboard from '../../../layouts/astrologer-dashboard';

const ProtectedRouteAstrologer = () => {

    if (localStorage.getItem('user_type') !== 'astrologer') {
        return <PleaseLoginAstrologer />;
    }

    return (
        <>
            <AstrologerDashboard />
        </>
    );
};

export default ProtectedRouteAstrologer;