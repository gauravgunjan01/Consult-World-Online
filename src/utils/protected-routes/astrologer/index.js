import { Outlet } from 'react-router-dom';
import PleaseLoginAstrologer from '../../../components/features/PleaseLoginAstrologer';
import AstrologerDashboard from '../../../layouts/astrologer-dashboard';
import { user_role } from '../../constants';

const ProtectedRouteAstrologer = () => {

    if (localStorage.getItem(user_role) !== 'Astrologer') {
        return <PleaseLoginAstrologer />;
    }

    return (
        <>
            <AstrologerDashboard />
        </>
    );
};

export default ProtectedRouteAstrologer;