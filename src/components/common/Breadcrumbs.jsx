import { useLocation, Link } from 'react-router-dom';
import { HomeSvg, RightArrowHeadSvg } from '../../assets/svg';

const Breadcrumbs = () => {
    const location = useLocation();
    const pathParts = location.pathname.split('/').filter(Boolean);

    const isDynamicSegment = (part) => {
        return /^[0-9a-fA-F]{24}$/.test(part); // Adjust this if you use UUID or numeric IDs
    };

    // Find index of dynamic part if any
    const dynamicIndex = pathParts.findIndex(isDynamicSegment);

    const generatePath = (index) => {
        return '/' + pathParts.slice(0, index + 1).join('/');
    };

    const formattedPath = pathParts.map((part, index) => {
        const isLast = index === pathParts.length - 1;
        const isDynamic = isDynamicSegment(part);
        const isParentOfDynamic = index === dynamicIndex - 1;

        const label = part.replace(/-/g, ' ');

        const shouldLink = !isLast && !isDynamic && !isParentOfDynamic;

        return (
            <span key={index} className="flex items-center">
                <p className='-mt-0.5'><RightArrowHeadSvg stroke_width={3} h={25} w={25} /></p>
                {shouldLink ? (
                    <Link
                        to={generatePath(index)}
                        className="text-white capitalize"
                    >
                        {label}
                    </Link>
                ) : (
                    <span className="text-white capitalize">{label}</span>
                )}
            </span>
        );
    });

    return (
        <>
            <div className='h-[72px] max-lg:h-[50px] bg-secondary'></div>
            {location?.pathname !== '/' && (
                <div className='bg-secondary flex items-center px-5 lg:px-10 text-white py-0.5 capitalize space-x-1'>
                    <Link to="/" className='flex items-center'>
                        <p>Home</p>
                        <p className='-mt-1'><HomeSvg h={20} w={20} /></p>
                    </Link>
                    {formattedPath}
                </div>
            )}
        </>
    );
};

export default Breadcrumbs;