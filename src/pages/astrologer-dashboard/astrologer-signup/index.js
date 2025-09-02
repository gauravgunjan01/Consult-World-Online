import React, { useRef, useState } from 'react';
import TopHeaderSection from '../../../components/common/TopHeaderSection';
import PageHeading from '../../../components/common/PageHeading';
import TranslatedText from '../../../components/features/TranslatedText';
import { website_name } from '../../../utils/constants';
import { toaster } from '../../../utils/services/toast-service';
import { Autocomplete } from '@react-google-maps/api';
import { postAPI } from '../../../utils/api-function';

const AstrologerSignup = () => {

    const [inputFieldDetail, setInputFieldDetail] = useState({ first_name: '', last_name: '', display_name: '', phone_number: '', email: '', location: '', latitude: '', longitude: '', experience: '' });
    const { first_name, last_name, display_name, phone_number, email, location, experience } = inputFieldDetail;
    const handleInputFieldDetail = (event) => setInputFieldDetail({ ...inputFieldDetail, [event?.target?.name]: event?.target?.value });

    const autocompleteRef = useRef(null);
    const handlePlaceSelect = () => {
        const place = autocompleteRef.current.getPlace();
        try {
            if (place) {
                const location = place.geometry.location;
                setInputFieldDetail({ ...inputFieldDetail, location: place.formatted_address, latitude: location.lat(), longitude: location.lng(), });
            }
        } catch (error) {
            toaster?.info({ text: 'Select Place' })
        }
    };

    const handleValidation = () => {
        const nameRegex = /^[A-Za-z\s]+$/;
        const phoneRegex = /^[6-9]\d{9}$/; // For Indian mobile numbers
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!first_name || !nameRegex.test(first_name)) {
            toaster.info({ text: 'Please enter a valid name (only letters and spaces).' }, { position: 'top-right' });
            return false;
        }

        if (!phone_number || !phoneRegex.test(phone_number)) {
            toaster.info({ text: 'Please enter a valid 10-digit Indian phone number.' }, { position: 'top-right' });
            return false;
        }

        if (!email || !emailRegex.test(email)) {
            toaster.info({ text: 'Please enter a valid email address.' }, { position: 'top-right' });
            return false;
        }

        if (!experience) {
            toaster.info({ text: 'Please enter your experience.' }, { position: 'top-right' });
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {
        const payload = {
            astrologerName: first_name + ' ' + last_name,
            email,
            phoneNumber: phone_number,
            address: location,
            gender: 'N/A',
            experience,
            city: 'N/A',
            state: 'N/A',
            country: 'N/A',
            pincode: 'N/A',
            dateOfBirth: new Date()
        };

        if (handleValidation()) {
            try {
                const { data } = await postAPI('api/astrologer/add-astrologer-inquiry', payload);
                console.log("Astrologer Signup Data :::", data);

                if (data?.success) {
                    toaster.info({ text: data?.message });
                    setInputFieldDetail({ first_name: '', last_name: '', display_name: '', phone_number: '', email: '', location: '', latitude: '', longitude: '', experience: '' });
                } else {
                    toaster.info({ text: data?.message });
                }

            } catch (error) {
                console.log("Error On Signp :::", error?.response?.data)
            }
        };
    };

    return (
        <>
            <TopHeaderSection />

            <section className='px-[5px] max-md:px-[20px] py-10'>
                <article>
                    <main className='flex items-start gap-[5%] gap-y-10 max-md:flex-col-reverse'>
                        <div className='max-w-[650px] bg-white m-auto px-5 py-8 rounded-md md:min-h-[380px]' style={{ boxShadow: '0 0 5px #E5D18E90' }}>
                            <form className='flex flex-wrap justify-between gap-6'>
                                <div className='basis-[45%] max-md:basis-full flex flex-col gap-1'>
                                    <label className='text-black text-[15px] font-[500]'>First Name</label>
                                    <input name='first_name' value={first_name} onChange={handleInputFieldDetail} type='text' placeholder='First Name' className='w-[100%] outline-none bg-greybg px-5 py-[10px] rounded-md text-sm' />
                                </div>

                                <div className='basis-[45%] max-md:basis-full flex flex-col gap-1'>
                                    <label className='text-black text-[15px] font-[500]'>Last Name</label>
                                    <input name='last_name' value={last_name} onChange={handleInputFieldDetail} type='text' placeholder='Last Name' className='w-[100%] outline-none bg-greybg px-5 py-[10px] rounded-md text-sm' />
                                </div>

                                <div className='basis-[45%] max-md:basis-full flex flex-col gap-1'>
                                    <label className='text-black text-[15px] font-[500]'>Display Name</label>
                                    <input name='display_name' value={display_name} onChange={handleInputFieldDetail} type='text' placeholder='Display Name' className='w-[100%] outline-none bg-greybg px-5 py-[10px] rounded-md text-sm' />
                                </div>

                                <div className='basis-[45%] max-md:basis-full flex flex-col gap-1'>
                                    <label className='text-black text-[15px] font-[500]'>Experience</label>
                                    <input name='experience' value={experience} onChange={handleInputFieldDetail} type='number' placeholder='Experience' className='w-[100%] outline-none bg-greybg px-5 py-[10px] rounded-md text-sm' />
                                </div>

                                <div className='basis-[45%] max-md:basis-full flex flex-col gap-1'>
                                    <label className='text-black text-[15px] font-[500]'>Email</label>
                                    <input name='email' value={email} onChange={handleInputFieldDetail} type='email' placeholder='Email' className='w-[100%] outline-none bg-greybg px-5 py-[10px] rounded-md text-sm' />
                                </div>

                                <div className='basis-[45%] max-md:basis-full flex flex-col gap-1'>
                                    <label className='text-black text-[15px] font-[500]'>Phone Number</label>
                                    <input name='phone_number' value={phone_number} onChange={handleInputFieldDetail} type='number' placeholder='Phone Number' className='w-[100%] outline-none bg-greybg px-5 py-[10px] rounded-md text-sm' />
                                </div>

                                <div className='basis-[100%] max-md:basis-full flex flex-col gap-1'>
                                    <label className='text-black text-[15px] font-[500]'>Place of Birth</label>
                                    <Autocomplete
                                        onLoad={(ref) => (autocompleteRef.current = ref)}
                                        onPlaceChanged={handlePlaceSelect}
                                    >
                                        <input
                                            type='text'
                                            name='location'
                                            value={location}
                                            onChange={handleInputFieldDetail}
                                            className='w-[100%] outline-none bg-greybg px-5 py-[10px] rounded-md text-sm'
                                            placeholder='Enter place of birth'
                                        />
                                    </Autocomplete>
                                </div>

                                <div onClick={handleSubmit} className='basis-full bg-primary text-center text-white font-[500] rounded-lg p-2 py-2.5 text-sm cursor-pointer'>Signup</div>
                            </form>
                        </div>
                    </main>
                </article>
            </section>

            <section className='px-[100px] max-lg:px-[20px] py-[50px] bg-white text-[#616161] text-justify'>
                <TranslatedText text={`Sign up to become an ${website_name} Verified consultant`} className="text-center my-8 text-lg" />

                <div className='flex flex-col gap-2'>
                    <TranslatedText text={`If looking forward to taking your astrology skills online, join India’s largest astrology platform, which brings you a tremendous opportunity to expand your customer base, both nationally and internationally. With 4,50,000+ daily users, and 2.5-million+ monthly users, the ${website_name} app is the most widely used astrology platform in India, with the highest percentage of paid and repeating users awaiting your expertise. ${website_name} was recently awarded the Most Trusted Astrology Platform at the prestigious Zee National Achievers Award.`} />

                    <TranslatedText text={`Having served over 4.3-crore customers, the ${website_name} app is home to 13000+ consultants and offers them a platform to showcase their skills and help them develop a distinctive online presence. The app is available in 20+ languages and welcomes experts across astrological disciplines, including Vedic Astrology, Tarot Reading, Lal Kitab Reading, Numerology, and much more. In fact, to further help you broaden your horizon, ${website_name} brings you as many as three ways to interact and earn from the users - Talk to consultant, Chat with consultant, and Live Sessions.`} />

                    <TranslatedText text={`${website_name} believes in taking everyone together and thus gives both budding and well-experienced consultants a fair chance to show off their skills. The Online consultant registration process is fairly easy, and our customer care executives on the other side shall help you 24/7 just in case you need any assistance.`} />

                    <TranslatedText text={`Having said that, fill out the form on the right to begin your journey with ${website_name}.`} />
                </div>
            </section>
        </>
    )
}

export default AstrologerSignup;