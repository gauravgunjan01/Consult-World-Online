import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const AstrologerSkeletonCard = () => {
    return (
        <>
            <>
                <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
                    <div className='border border-secondary rounded-md'>
                        <div className='flex max-md:flex-col'>
                            {/* Left Section */}
                            <div className='p-4 flex-1 flex gap-4'>
                                {/* Image */}
                                <div className='min-w-40 max-w-40 max-sm:hidden'>
                                    <Skeleton height={120} width={120} />
                                </div>

                                {/* Info Section */}
                                <div className='flex flex-col gap-3 text-[13.5px] leading-5 w-full'>
                                    <div>
                                        <div className='flex items-center flex-wrap gap-x-4'>
                                            <Skeleton height={20} width={180} />
                                            <Skeleton height={20} width={50} />
                                        </div>
                                        <Skeleton height={14} width={100} />
                                    </div>

                                    <div className='text-[#737373] text-xs space-y-1'>
                                        <div className='flex gap-4 items-center'>
                                            <Skeleton height={12} width={100} />
                                            <Skeleton height={12} width={80} />
                                            <Skeleton height={12} width={60} />
                                        </div>
                                    </div>

                                    <div className='space-y-1'>
                                        <Skeleton height={14} width={180} />
                                        <Skeleton height={14} width={150} />
                                    </div>

                                    <div className='flex gap-2 items-center'>
                                        <Skeleton circle height={16} width={16} />
                                        <Skeleton height={12} width={150} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SkeletonTheme>
            </>
        </>
    )
}

export default AstrologerSkeletonCard;