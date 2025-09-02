import NotFoundImage from '../../assets/images/common/not-found.png'

const DataNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20">
            <img src={NotFoundImage} alt="Data Not Found" className="w-1/2 max-w-xs" />
        </div>
    )
}

export default DataNotFound;