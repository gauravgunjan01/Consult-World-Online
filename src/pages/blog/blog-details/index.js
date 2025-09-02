import moment from "moment";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { api_urls } from '../../../utils/api-urls/index.js';
import { FacebookSvg, HomeSvg, InstagramSvg, LinkedinSvg, ViewSvg, YoutubeSvg } from "../../../assets/svg/index.js";
import TopHeaderSection from '../../../components/common/TopHeaderSection.jsx';
import * as BlogActions from "../../../redux/actions/blogAction";

const BlogDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const blogId = searchParams.get('id');

    const dispatch = useDispatch();
    const { astroblogCategoryData, recentAstroBlogData, astroBlogDetailsData: blogData } = useSelector(state => state?.blogreducer);

    const handleViewBlog = (data) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        dispatch(BlogActions?.incrementAstroBlogViewCount({ blogId: data?._id }))
        navigate(`/blog/blog-details?title=${data?.title?.split(' ')?.join('-')?.toLowerCase()}&id=${data?._id}`)
        dispatch(BlogActions.getRecentAstroblog({ page: 1, limit: 4 }));
    };

    useEffect(() => {
        // window.scrollTo({ top: 0, behavior: 'smooth' })

        //! Dispatching API for Get Blog Category
        dispatch(BlogActions.getAstroblogCategory());

        //! Dispatching API for Get Recent Blog
        dispatch(BlogActions.getRecentAstroblog({ page: 1, limit: 4 }));
    }, []);

    useEffect(() => {

        //! Dispatching API For Getting Blog Details
        dispatch(BlogActions?.getAstroblogDetails({ blogId }));
    }, [blogId]);

    return (
        <>
            <section className="space-y-3">
                <section className='text-center bg-white rounded-b-[3px]'>
                    <h1 className='text-[30px] max-md:text-[25px] font-[500] tracking-wider'>Blog</h1>
                    <p className='text-[#ADADAD] text-[24px] max-md:text-[20px] font-[500] tracking-wide'>{blogData?.title}</p>
                </section>

                <section className='flex max-md:flex-col-reverse gap-5 p-3 rounded-[3px] bg-white'>
                    <div className='flex-1 space-y-3'>
                        <img src={api_urls + 'uploads/' + blogData?.image} className="w-full rounded-[3px] object-contain" />
                        <h2 className="text-[23px] font-semibold">{blogData?.title}</h2>

                        <div className='flex gap-2.5 items-center'>
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                <FacebookSvg w={30} h={30} />
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                <InstagramSvg w={30} h={30} />
                            </a>
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                                <LinkedinSvg w={30} h={30} />
                            </a>
                            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                                <YoutubeSvg w={30} h={30} />
                            </a>
                        </div>

                        <div className="text-[#272727] flex flex-col gap-10">
                            <p
                                className="space-y-1 text-base leading-relaxed text-justify"
                                dangerouslySetInnerHTML={{
                                    __html: blogData?.description.replace(
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
                            <p className="text-black" > Posted On - {moment(blogData?.createdAt).format("MMMM DD, YYYY")} | Posted By - {blogData?.created_by} |  Read By - {blogData?.viewsCount}</p>
                        </div>
                    </div>

                    <div className='flex flex-col pl-5 max-md:pl-0 border-l border-[#B0B0B0] max-md:border-none basis-[15%]'>
                        <div className='flex items-center gap-4 border-b border-[#B0B0B0] border-dashed pb-5 max-lg:hidden'>
                            <div className='bg-black h-14 w-14 rounded-full flex items-center justify-center'><HomeSvg w='35' h='35' /></div>
                            <div>
                                <div className='text-[21px]'>Categories</div>
                                <div className='text-[14px] text-[#B0B0B0]'>Select Topic</div>
                            </div>
                        </div>
                        <div className='flex flex-col items-end max-lg:flex-row text-nowrap gap-3 pt-8 text-[17px] max-md:py-5 max-lg:overflow-x-scroll'>
                            <Link to={'/blog'}>Home</Link>
                            {astroblogCategoryData?.map((value, index) => (
                                <Link to={`/blog?page=1&search=&category=${value?.blog_category?.split(' ')?.join('-')?.toLowerCase()}&id=${value?._id}`} key={index} className="capitalize">{value?.blog_category}</Link>
                            ))}
                        </div>
                    </div>
                </section>

                <section className='p-3 space-y-3 bg-white rounded-t-[3px]'>
                    <h3 className='text-[30px] max-md:text-[25px] font-[500] tracking-wider text-center mb-5'>Recent Blog</h3>

                    <main className='grid md:grid-cols-2 lg:grid-cols-4 gap-3'>
                        {recentAstroBlogData && recentAstroBlogData?.map((value, index) => (
                            <div key={index} onClick={() => handleViewBlog(value)} className='relative bg-white flex flex-col border border-secondary rounded-[3px] cursor-pointer'>
                                <img src={api_urls + 'uploads/' + value?.image} className='h-[150px] rounded-t-[3px] object-center' />
                                <div className='absolute top-[10px] right-[10px] flex items-center justify-between px-4 w-[95px] h-[23px] rounded-[18px] text-sm bg-white text-[#C9C9C9]'><ViewSvg /> <span className='text-black'>{value?.viewsCount}</span></div>

                                <div className="px-3 pt-2.5 pb-4 text-[#545353] flex flex-col gap-2">
                                    <h2 className="text-primary font-medium line-clamp-2">{value?.title}</h2>
                                    <div className="flex items-center justify-between text-[14px]">
                                        <p>{value?.created_by}</p>
                                        <p>{moment(value?.createdAt)?.format('MMMM DD, YYYY')}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </main>
                </section>
            </section>
        </>
    );

}

export default BlogDetails;