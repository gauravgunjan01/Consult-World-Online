import React, { useState } from 'react';
import Modal from 'react-modal';
import ReactStars from 'react-stars';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import * as ConsultationActions from '../../redux/actions/consultationAction';
import { api_urls } from '../../utils/api-urls';
import { useNavigate } from 'react-router-dom';
import { CrossSvg } from '../../assets/svg';

Modal.setAppElement('#root');

const CallRating = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { astrologerRatingVisibility } = useSelector(state => state.consultationReducer);
    console.log("Call Rating Page ::: ", astrologerRatingVisibility);

    const [description, setDescription] = useState('');
    const [star, setStar] = useState(0);

    const handleCloseRating = () => {
        dispatch(ConsultationActions.setAstrologerRatingVisibility({ data: null, ratingVisible: false, type: null, serviceId: null }));
        setDescription('');
        setStar(0);
        navigate('/', { replace: true });
    };

    const ratingChanged = (newRating) => setStar(newRating);

    const handleRating = async () => {
        const payload = {
            customerId: localStorage.getItem('current_user_id'),
            astrologerId: astrologerRatingVisibility?.data?._id,
            ratings: star,
            comments: description,
            type: astrologerRatingVisibility?.type,
            callId: astrologerRatingVisibility?.serviceId
        };

        console.log("Rating Payload: ", payload);

        try {
            const { data } = await axios.post(api_urls + 'api/admin/add-review', payload);
            console.log('Rating Data:', data);
        } catch (error) {
            console.error('Error adding review:', error);
        }

        handleCloseRating();
    };

    return (
        <>
            <div className='fixed inset-0 z-[1000] bg-transparent'>
                <div className='fixed z-10 bottom-0 w-full p-5 bg-[#FFFCD1] flex flex-col gap-5 items-center justify-center'>
                    <div className='text-lg font-[500] -mb-5'>Your Review</div>
                    <div onClick={() => handleCloseRating()} className='bg-red-500 text-white rounded-full p-1 cursor-pointer absolute right-5 top-5'><CrossSvg /></div>
                    <ReactStars count={5} value={star} onChange={ratingChanged} size={40} color2={'green'} className='m-0' />

                    <textarea value={description} placeholder='Write you review here....' onChange={(e) => setDescription(e.target.value)} rows={3} className='w-[80%] max-md:w-full outline-none rounded-md border p-4' />

                    <div onClick={handleRating} className='bg-primary text-black text-sm py-2 px-5 rounded-md text-center cursor-pointer'>Submit</div>
                </div >
            </div>
        </>
    );
};

export default CallRating;