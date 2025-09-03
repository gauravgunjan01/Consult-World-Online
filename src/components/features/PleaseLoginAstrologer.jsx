import { useDispatch } from 'react-redux';
import { PersonSvg } from '../../assets/svg';
import TopHeaderSection from '../common/TopHeaderSection';
import { generateTokenByRequestPermission } from '../../config/firebase-config';
import * as AuthActions from '../../redux/actions/authAction';

const PleaseLoginAstrologer = () => {
    const dispatch = useDispatch();
    
    // Todo : Astrolger Login Start
    const handleOpenLoginAstrologerModal = async () => {
        console.log('Astrologer login button clicked');

        if (!("Notification" in window)) {
            alert("This browser does not support desktop notifications.");
        } else if (Notification.permission === "granted") {
            generateTokenByRequestPermission();
            dispatch(AuthActions.toggleAstrologerLoginModal(true));

        } else if (Notification.permission === "denied") {
            alert("You have blocked notifications. Please enable them in your browser settings.");

        } else if (Notification.permission === "default") {
            console.log('Requesting Notification Permission');
            const permission = await Notification.requestPermission();
        }
    };

    return (
        <>
            <TopHeaderSection />

            <div className="flex items-center justify-center min-h-screen bg-greyBg">
                <div className="bg-white flex flex-col items-center gap-2 p-6 rounded-lg shadow-md shadow-primary">
                    <h1 className="text-secondary text-xl font-semibold">Please Login First</h1>
                    <p className="text-grey text-sm mb-2">You need to be logged as a astrologer to access this content.</p>
                    <button onClick={handleOpenLoginAstrologerModal} className='flex items-center gap-2 cursor-pointer bg-primary text-white px-4 py-1.5 rounded-full text-[15px]'><div className='-mt-0.5'><PersonSvg /></div><div>Login</div></button>
                </div>
            </div>
        </>
    );
}

export default PleaseLoginAstrologer;