import { useEffect } from 'react';
import { website_name } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import * as StaticPageActions from '../../redux/actions/staticPageAction';

const TermsOfUse = () => {
    const dispatch = useDispatch();
    const { termsAndConditionData } = useSelector(state => state?.staticPageReducer);

    useEffect(() => {
        const user_type = localStorage.getItem('user_type');
        const pageType = user_type === 'astrologer' ? 'Astrologer' : 'Customer';
        dispatch(StaticPageActions.getTermsAndCondition({ type: pageType }));
    }, [dispatch]);

    return (
        <>
            <section className='bg-white p-5'>
                {termsAndConditionData ? (
                    <>
                        <h5 className='font-semibold text-center mb-5 text-xl'>Terms of Use for {website_name} App</h5>
                        <div
                            className="space-y-2 text-base leading-relaxed text-justify"
                            dangerouslySetInnerHTML={{
                                __html: termsAndConditionData.replace(
                                    /(<ul>)/g,
                                    '<ul class="list-disc pl-6 space-y-2">'
                                ).replace(
                                    /(<li>)/g,
                                    '<li class="text-gray-700 leading-relaxed">'
                                ).replace(
                                    /(<p>)/g,
                                    '<p class="">'
                                ).replace(
                                    /(<strong>)/g,
                                    '<strong class="font-semibold text-black">'
                                )
                            }}
                        />
                    </>
                ) : (
                    <p>No terms and conditions available at the moment.</p>
                )}
            </section>
        </>
    );
};

export default TermsOfUse;