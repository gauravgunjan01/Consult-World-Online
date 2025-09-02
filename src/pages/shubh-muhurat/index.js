import React from 'react';
import { Link } from 'react-router-dom';
import ComingSoon from '../../components/common/ComingSoon';
import TopHeaderSection from '../../components/common/TopHeaderSection';

const ShubhMuhurat = () => {

    return (
        <>
            <TopHeaderSection />

            {/* <div className="flex items-center justify-center py-20 max-md:min-h-96">
                <div className="flex flex-col gap-8 items-center">
                    <p className="text-2xl max-md:text-lg text-primary">Coming Soon.</p>
                    <Link to="/" className="px-8 py-3 bg-white text-primary font-semibold rounded-lg shadow-md hover:bg-primary hover:text-white transition-all duration-500 ease-in">Go Home</Link>
                </div>
            </div> */}

            <div className="flex items-center justify-center py-20 max-md:min-h-96">
                <ComingSoon />
            </div>
        </>
    );
};

export default ShubhMuhurat;