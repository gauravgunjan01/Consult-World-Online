import { useEffect } from 'react';
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AstrologerSidebar from '../sidebar/astrologer-sidebar';
import * as AstrologerDashboardActions from '../../redux/actions/astrologerDashboardAction';

const AstrologerDashboard = () => {
    const dispatch = useDispatch();
    const { isSidebarOpen } = useSelector((state) => state?.astrologerDashboardReducer);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 991) {
                dispatch(AstrologerDashboardActions.setSidebarWidth(250));
                dispatch(AstrologerDashboardActions.setIsSidebarOpen(true));
            }
            else {
                dispatch(AstrologerDashboardActions.setSidebarWidth(200));
                dispatch(AstrologerDashboardActions.setIsSidebarOpen(false));
            }
        };
        if (window.innerWidth < 600) dispatch(AstrologerDashboardActions.setIsSidebarOpen(false));

        window.addEventListener("resize", handleResize);
        handleResize(); //* Initial call to handle resizing

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            <div className="flex">
                <AstrologerSidebar />
                <div className="flex-1 h-screen overflow-y-auto custom-scrollbar relative">
                    <main className="text-black min-h-full p-5 relative">
                        <Outlet />
                        <div onClick={() => dispatch(AstrologerDashboardActions.setIsSidebarOpen(!isSidebarOpen))} className="w-[5px] bg-primary h-full absolute left-0 top-0 z-[100] cursor-ew-resize" />
                    </main>
                </div>
            </div>
        </>
    );
};

export default AstrologerDashboard;