import ComingSoonImage from '../../assets/images/common/coming-soon.png'

const ComingSoon = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20">
            <img src={ComingSoonImage} alt="Coming Soon" className="w-80" />
        </div>
    )
}

export default ComingSoon;