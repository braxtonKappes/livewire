import './ChannelsList.css'
import CreateChannel from '../CreateChannel/index';
import { useDispatch, useSelector } from 'react-redux';
import * as messageActions from '../../store/message'

const ServerChannels = () => {
    const dispatch = useDispatch();
    const channels = useSelector(state => Object.values(state.channel.allChannels))

    return (
        <div className="sc">
        <CreateChannel />
            <div className="sc-wrapper">
                {channels.map(channel => (
                    <div key={channel.id} className="sc-channels">
                        <div className="channel-wrapper">
                            <p className='channel-icon'>#</p>
                            <div className='sc-name' onClick={() => dispatch(messageActions.fetchMessages(channel.id))}>{channel.name}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ServerChannels;
