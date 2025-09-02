import moment from 'moment/moment.js';
import { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { api_urls } from '../../utils/api-urls/index.js';
import { HomeSvg, SearchSvg, ViewSvg } from '../../assets/svg';
import CustomPagination from '../../components/features/CustomPagination.jsx';
import RecordNotFound from '../../components/features/RecordNotFound.jsx';
import * as BlogActions from "../../redux/actions/blogAction";

const Blog = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { astroBlogData, astroblogCategoryData } = useSelector(state => state?.blogreducer);

    let [searchParams, setSearchParams] = useSearchParams();
    const query = new URLSearchParams(searchParams);
    const page = query.get('page') || 1;
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const id = searchParams.get('id') || '';

    const handleSearch = async (text) => setSearchParams(`page=1&search=${text.toLowerCase()}&category=${category}&id=${id}`);

    const handleViewBlog = (data) => {
        dispatch(BlogActions?.incrementAstroBlogViewCount({ blogId: data?._id }))
        navigate(`/blog/blog-details?title=${data?.title?.split(' ')?.join('-')?.toLowerCase()}&id=${data?._id}`)
    };

    useEffect(() => {
        //! Dispatching API for Get Blog Category
        dispatch(BlogActions.getAstroblogCategory());
    }, []);

    useEffect(() => {
        //! Dispatching API for Get Blog
        dispatch(BlogActions.getAstroblog({ page, limit: 9, search, categoryId: id }));
    }, [page, search, id]);

    return (
        <>
            <section className='flex gap-3 max-lg:flex-col h-[calc(100vh-100px)]'>
                <div className='flex flex-col p-3 space-y-6 bg-white max-md:pr-0 border-r border-[#B0B0B0] max-md:border-none basis-[15%]'>
                    <div className='flex items-center gap-4 border-b border-[#B0B0B0] border-dashed pb-5 max-lg:hidden'>
                        <div className='bg-black h-14 w-14 rounded-full flex items-center justify-center'><HomeSvg w='35' h='35' /></div>
                        <div>
                            <div className='text-[21px]'>Categories</div>
                            <div className='text-[14px] text-[#B0B0B0]'>Select Topic</div>
                        </div>
                    </div>
                    <div className='flex flex-col max-lg:flex-row text-nowrap gap-3 text-[17px] max-md:py-5 max-lg:overflow-x-scroll'>
                        <Link to={'/blog'}>Home</Link>
                        {astroblogCategoryData?.map((value, index) => (
                            <Link to={`/blog?page=1&search=&category=${value?.blog_category?.split(' ')?.join('-')?.toLowerCase()}&id=${value?._id}`} key={index} className='capitalize'>{value?.blog_category}</Link>
                        ))}
                    </div>
                </div>

                <div className='flex-1 bg-white p-3 space-y-3'>
                    <div className='flex gap-4 flex-wrap'>
                        <div className='rounded-md flex items-center max-sm:w-[90vw]'>
                            <input value={search} onChange={(e) => handleSearch(e?.target?.value)} type='search' placeholder='Let’s find what you’re looking for..' className='border border-[#DDDDDD] outline-none px-3 py-2.5 text-[16px] max-md:text-[16px] rounded-s-[3px] h-full w-[100%] md:w-[200px] lg:w-[400px]' />
                            <button className='bg-primary border border-primary rounded-e-[3px] flex items-center justify-center p-2 px-3 w-[50px] h-full text-white'><SearchSvg w='20' h='20' /></button>
                        </div>
                    </div>

                    <main className='grid md:grid-cols-3 gap-3'>
                        {astroBlogData?.results?.map((value, index) => (
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

                    {astroBlogData?.results?.length <= 0 && (<RecordNotFound />)}

                    {astroBlogData?.results?.length > 0 && (
                        <section className='flex justify-start py-5'>
                            <CustomPagination count="9" totalDocuments={astroBlogData?.totalResults} />
                        </section>
                    )}
                </div>
            </section>
        </>
    )
}

export default Blog;