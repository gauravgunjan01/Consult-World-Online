import { FaCalendarDay, FaCalendarWeek, FaCalendarAlt, FaCalendar } from 'react-icons/fa';

const icons = {
  daily: <FaCalendarDay />,
  weekly: <FaCalendarWeek />,
  monthly: <FaCalendarAlt />,
  yearly: <FaCalendar />,
};

const TabNav = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 rounded-b-[3px] bg-white p-3">
      {tabs.map(tab => (
        <button key={tab} onClick={() => onTabChange(tab)} className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all border ${activeTab === tab ? 'bg-black text-white border-black shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300'}`}>
          {icons[tab]} {tab}
        </button>
      ))}
    </div>
  );
};

export default TabNav;