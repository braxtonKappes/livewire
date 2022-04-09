import React from "react";
import { useSelector } from "react-redux";
import CreateServerModal from "../CreateServer";
import { Link } from "react-router-dom";
import './ServerList.css'

const ServerNav = () => {
    const userServers = useSelector(state => Object.values(state.server.userServers))

    return (
        <div className="sb">
            <div className="sb-icon-wrapper">
            {userServers.slice(0, 1).map(server => (
                    <Link key={server.id} to={`/@me/${server.id}`}>
                        <img src={server.icon} alt="" className="sb-server-icon" />
                    </Link>
                ))}
                {userServers.slice(1).map(server => (
                    <Link key={server.id} to={`/servers/${server.id}`}>
                        <img src={server.icon} alt="" className="sb-server-icon" />
                    </Link>
                ))}
            </div>
            <CreateServerModal />
        </div>
    );
};

export default ServerNav;