import React, { useState } from 'react';
import { PersonSvg } from '../../assets/svg';
import TopHeaderSection from '../common/TopHeaderSection';
import CustomerLoginModal from '../modal/CustomerLoginModal';
import { generateTokenByRequestPermission } from '../../config/firebase-config';

const PleaseLoginCustomer = () => {
    // Todo : Customer Login Start
    const [loginCustomerModal, setLoginCustomerModal] = useState(false);

    const handleOpenLoginCustomerModal = async () => {
        console.log('Astrologer login button clicked');

        if (!("Notification" in window)) {
            alert("This browser does not support desktop notifications.");
        } else if (Notification.permission === "granted") {
            generateTokenByRequestPermission();
            setLoginCustomerModal(true)

        } else if (Notification.permission === "denied") {
            alert("You have blocked notifications. Please enable them in your browser settings.");

        } else if (Notification.permission === "default") {
            console.log('Requesting Notification Permission');
            const permission = await Notification.requestPermission();
        }
    };
    const handleCloseLoginCustomerModal = () => setLoginCustomerModal(false);

    return (
        <>
            <TopHeaderSection />

            <div className="flex items-center justify-center min-h-[400px] bg-greyBg">
                <div className="bg-white flex flex-col items-center gap-2 p-6 rounded-lg shadow-md">
                    <h1 className="text-secondary text-xl font-semibold">Please Login First</h1>
                    <p className="text-grey text-sm mb-2">You need to be logged as a customer to access this content.</p>
                    <button onClick={handleOpenLoginCustomerModal} className='flex items-center gap-2 cursor-pointer bg-primary text-white px-4 py-1.5 rounded-full text-[15px]'><div className='-mt-0.5'><PersonSvg /></div><div>Login</div></button>
                </div>
            </div>

            {/* Customer Modal */}
            <CustomerLoginModal isOpen={loginCustomerModal} handleCloseModal={handleCloseLoginCustomerModal} />
        </>
    );
}

export default PleaseLoginCustomer;