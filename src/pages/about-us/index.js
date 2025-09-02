import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as StaticPageActions from '../../redux/actions/staticPageAction';

const AboutUs = () => {
    const dispatch = useDispatch();
    const { aboutusData } = useSelector(state => state?.staticPageReducer);

    useEffect(() => {
        dispatch(StaticPageActions.getAboutus());
    }, [dispatch]);

    return (
        <>
            <section className='bg-white p-5'>
                {aboutusData ? (
                    <>
                        <h5 className='font-semibold text-center mb-5 text-xl'>About Us</h5>
                        <div
                            className="space-y-2 text-base leading-relaxed text-justify"
                            dangerouslySetInnerHTML={{
                                __html: aboutusData.replace(
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
                    <p>No about us information available at the moment.</p>
                )}
            </section>
        </>
    );
};

export default AboutUs;