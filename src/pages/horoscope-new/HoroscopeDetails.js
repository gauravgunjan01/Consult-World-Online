import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import TopHeaderSection from '../../components/common/TopHeaderSection';
import * as AstrologyApiActions from '../../redux/actions/astrologyApiAction';
import TabNav from './TabNav';
import TagsBarChart from './TagsBarChart';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeading from '../../components/common/PageHeading';

const HoroscopeDetails = () => {
  const { zodiacSign } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  console.log("Location State", location?.state);
  const zodiacImage = location?.state?.zodiacImage;
  const { isLoading } = useSelector(state => state?.commonReducer);
  const { horoscopeData } = useSelector(state => state?.astrologyApiReducer);
  const [searchParams, setSearchParams] = useSearchParams();

  const renderTabs = ['daily', 'weekly', 'monthly', 'yearly'];
  const defaultTab = searchParams.get('tab') || 'daily';
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    dispatch(AstrologyApiActions.getHoroscope({ sign: zodiacSign }));
  }, [dispatch, zodiacSign]);

  useEffect(() => {
    setSearchParams({ tab: activeTab });
  }, [activeTab]);

  const chartData = horoscopeData?.tags?.[activeTab]
    ? Object.entries(horoscopeData.tags[activeTab]).map(([key, value]) => ({
      name: key,
      value,
    }))
    : [];

  return (
    <>
      <section className='space-y-3'>
        <div className='bg-white p-3 rounded-b-[3px]'>
          <main className='flex justify-between items-center max-md:flex-wrap gap-5'>
            <PageHeading title={'Horoscope Details'} />
          </main>
        </div>

        <TabNav tabs={renderTabs} activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Content */}
        {isLoading ? (
          <main className='flex flex-col gap-7 bg-white p-3 rounded-[3px]'>
            {Array(5).fill('').map((_, index) => (
              <div className='flex flex-col gap-2' key={index}>
                <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
                  <div className='h-5'><Skeleton height={'100%'} /></div>
                  <div className='h-5'><Skeleton height={'100%'} /></div>
                  <div className='h-5'><Skeleton height={'100%'} /></div>
                </SkeletonTheme>
              </div>
            ))}
          </main>
        ) : (
          <AnimatePresence mode="wait">
            <motion.main
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className='bg-white p-3 rounded-[3px] flex flex-col gap-10 text-[15.5px] text-gray-800 text-justify'
            >
              {/* Horoscope HTML */}
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: horoscopeData?.[activeTab] }} />

              {/* Bar Chart */}
              <TagsBarChart data={chartData} />
            </motion.main>
          </AnimatePresence>
        )}
      </section>
    </>
  );
};

export default HoroscopeDetails;
