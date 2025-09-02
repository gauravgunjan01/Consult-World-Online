import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Home, Building, FileText, ClipboardList, UserPlus, Wallet, FileInput, FileOutput } from "lucide-react";
import * as AstrologerDashboardActions from "../../../redux/actions/astrologerDashboardAction";

const AstrologerSidebar = () => {
  const { isSidebarOpen, sidebarWidth } = useSelector(state => state?.astrologerDashboardReducer);

  return (
    <>
      <div style={{ width: isSidebarOpen ? `${sidebarWidth}px` : '0px' }} className='transition-all duration-300 bg-primary h-screen text-white overflow-y-auto overflow-x-hidden scroll-smooth custom-scrollbar-zero relative'>
        <section className='p-[100px_15px] flex flex-col gap-8 text-nowrap'>
          {routeName?.map((section, index) => (
            <div key={index} className='flex flex-col gap-[5px]'>
              <p className='text-[13px] p-[0_5px] mb-[5px]'>{section?.title}</p>

              {section?.routes?.map((item, idx) => {
                if (item?.sub_routes) return <SidebarMenu route={item} key={idx} />

                return <NavLink key={idx} to={item?.path} className={({ isActive, isPending }) => isPending ? 'pending' : isActive ? 'flex items-center gap-2.5 text-white py-2 px-2.5 hover:bg-[#2A2F4A] rounded-sm bg-[#2A2F4A] overflow-hidden' : 'flex items-center gap-2.5 text-white py-2 px-2.5 hover:bg-[#2A2F4A] rounded-sm'}>
                  <div className='h-4 w-4'>
                    {item.icon}
                  </div>
                  <p>{item?.label}</p>
                </NavLink>
              })}
            </div>
          ))}
        </section>
      </div>
    </>
  );
};

export default AstrologerSidebar;

const SidebarMenu = ({ route, depth = 0.5 }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isSidebarOpen } = useSelector((state) => state?.astrologerDashboardReducer);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isRouteActive = (route, pathname) => {
    if (route?.path && pathname.startsWith(route?.path)) return true;
    if (route?.sub_routes) {
      return route?.sub_routes?.some((sub) => isRouteActive(sub, pathname));
    }
    return false;
  };

  useEffect(() => {
    const active = isRouteActive(route, location.pathname);
    if (active) {
      setIsMenuOpen(true);
      dispatch(AstrologerDashboardActions.setIsSidebarOpen(true));
    }
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    dispatch(AstrologerDashboardActions.setIsSidebarOpen(true));
  };

  useEffect(() => {
    if (!isSidebarOpen) {
      setIsMenuOpen(false);
    }
  }, [isSidebarOpen]);

  return (
    <>
      <div className="flex justify-between text-white py-2 px-1 hover:bg-[#2A2F4A] rounded-sm cursor-pointer overflow-hidden" onClick={toggleMenu} style={{ paddingLeft: `${depth * 15}px` }}  >
        <div className="flex items-center gap-2.5 p-0.5">
          <div className="">{route?.icon}</div>
          <>
            {isSidebarOpen && (
              <div className="whitespace-nowrap text-[15.5px]">{route?.label}</div>
            )}
          </>
        </div>
        {isSidebarOpen && (
          <div >
            <ChevronDown />
          </div>
        )}
      </div>

      <>
        {isMenuOpen && route?.sub_routes && (
          <div className="space-y-1.5">
            {route?.sub_routes?.map((sub_route, index) =>
              sub_route?.sub_routes ? (
                <SidebarMenu key={index} route={sub_route} depth={depth + 1} />
              ) : (
                <NavLink key={index} to={sub_route?.path} className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "flex items-center gap-2.5 text-white py-2 px-2.5 hover:bg-[#2A2F4A] rounded-sm bg-[#2A2F4A] overflow-hidden" : "flex items-center gap-2.5 text-white py-2 px-2.5 hover:bg-[#2A2F4A] rounded-sm"} style={{ paddingLeft: `${(depth + 1) * 15}px` }}>
                  <div className="">{sub_route?.icon}</div>
                  <div className="whitespace-nowrap text-[15.5px] py-0.5">{sub_route?.label}</div>
                </NavLink>
              )
            )}
          </div>
        )}
      </>
    </>
  );
};

export const routeName = [
  {
    title: "Dashboard",
    routes: [
      { label: "Profile", path: "my-account", icon: <UserPlus style={{ height: '16px', width: '16px' }} /> },
      { label: "Wallet", path: "wallet-history", icon: <UserPlus style={{ height: '16px', width: '16px' }} /> },
    ],
  },
  {
    title: "Message",
    routes: [
      { label: "Message", path: "my-message", icon: <UserPlus style={{ height: '16px', width: '16px' }} /> },
      { label: "Queue Message", path: "queue-list", icon: <Building style={{ height: "16px", width: "16px" }} /> },
    ],
  },
  {
    title: "History",
    routes: [
      { label: "Transaction", path: "transaction-history", icon: <UserPlus style={{ height: '16px', width: '16px' }} /> },
      { label: "Register Puja", path: "register-puja-history", icon: <Building style={{ height: "16px", width: "16px" }} /> },
      { label: "Assigned Puja", path: "assigned-puja-history", icon: <Building style={{ height: "16px", width: "16px" }} /> },
    ],
  },
];