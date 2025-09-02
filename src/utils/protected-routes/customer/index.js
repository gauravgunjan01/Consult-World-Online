import PleaseLoginCustomer from '../../../components/features/PleaseLoginCustomer';

const ProtectedRouteCustomer = ({ children }) => {

    // if (localStorage.getItem('user_type') !== 'customer') {
    //     return <PleaseLoginCustomer />;
    // }

    return children;
};

export default ProtectedRouteCustomer;