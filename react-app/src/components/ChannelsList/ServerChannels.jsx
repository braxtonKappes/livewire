import './ChannelsList.css'
// import CreateChannel from '../CreateChannel/index';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const ServerChannels = () => {
    const { serverId } = useParams();
    const server = useSelector(state => (state.server.userServers))
    useSelector(state => state.server)

    let channels;
    if (Object.keys(server).length) {
        channels = Object.values(server[serverId].channels)
    }

    return channels && (
        <div className="c">
            <div className="c-wrapper">
                {channels.map(channel => (
                    <div key={channel.id} className="c-channels">
                        <Link>{`# ${channel.name}`}</Link>
                    </div>
                ))}
            </div>
        {/* <CreateChannel /> */}
        </div>
    )
}

export default ServerChannels;
