import './Channels.css'
import CreateChannel from '../CreateChannel/index';
import { useDispatch, useSelector } from 'react-redux';
import * as channelActions from '../../store/channel';
import { useEffect, useState } from 'react';

const UserChannels = () => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const userId = useSelector(state => state.session.user.id);

    useEffect(() => {
        const loaded = async () => {
            dispatch(channelActions.loadAllChannels(userId));
            setIsLoaded(true)
        }
        loaded()
    }, [dispatch]);


    return isLoaded && (
        <div className="u-dms">
            <div className="u-dm-wrapper">
            </div>
        <CreateChannel />
        </div>
    )
}

export default UserChannels;
