import { useEffect } from 'react';
import { website_name } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import * as StaticPageActions from '../../redux/actions/staticPageAction';

const PrivacyPolicy = () => {
    const dispatch = useDispatch();
    const { privacyPolicyData } = useSelector(state => state?.staticPageReducer);

    useEffect(() => {
        //! Dispatching API For Getting TermsAndConditions
        dispatch(StaticPageActions.getPrivacyPolicy());
    }, []);

    return (
        <>
            <section className='bg-white p-5'>
                {privacyPolicyData ? (
                    <>
                        <h5 className='font-semibold text-center mb-5 text-xl'>Privacy Policy for {website_name} App</h5>
                        <div
                            className="space-y-2 text-base leading-relaxed text-justify"
                            dangerouslySetInnerHTML={{
                                __html: privacyPolicyData.replace(
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
                    <p>No pivacy policy available at the moment.</p>
                )}
            </section>
        </>
    )
}

export default PrivacyPolicy;