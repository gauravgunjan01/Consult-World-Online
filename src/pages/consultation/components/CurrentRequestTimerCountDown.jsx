import moment from 'moment';
import { useSelector } from 'react-redux';

const CurrentRequestTimerCountDown = () => {
    const { currentRequestTimerCountDown } = useSelector(state => state?.consultationReducer);

    const timeFormat = (seconds) => {
        const duration = moment.duration(seconds, 'seconds');
        const hours = Math.floor(duration.asHours());
        const minutes = duration.minutes();
        const secs = duration.seconds();
        const formattedTime = `${hours}:${minutes}:${secs}`;
        return formattedTime;
    }

    return (
        <>
            <div>{currentRequestTimerCountDown ? timeFormat(currentRequestTimerCountDown) : '0:0:0'}</div>
        </>
    )
};

export default CurrentRequestTimerCountDown;