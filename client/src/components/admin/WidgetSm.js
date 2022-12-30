import { useEffect, useState } from 'react';
import { axoisInstance } from '../../util/ApiBaseUrlInstance';
import './styles/WidgetSm.scss';
import { Visibility } from "@material-ui/icons";

function WidgetSm() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await axoisInstance.get("users?new=true");
                setUsers(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getUsers();

        console.log(users);
    }, []);
    return (
        <div className="widgetSm admin">
            <span className="widgetSmTitle">New Join Members</span>
            <ul className="widgetSmList">
                {users.map((user) => (
                    <li className="widgetSmListItem" key={user._id}>
                        <img
                            src={
                                user.img ||
                                "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                            }
                            alt=""
                            className="widgetSmImg"
                        />
                        <div className="widgetSmUser">
                            <span className="widgetSmUsername">{user.username}</span>
                            <span className="widgetSmUserTitle">{user.email}</span>
                        </div>
                        <button className="widgetSmButton">
                            <Visibility className="widgetSmIcon" />
                            Display
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default WidgetSm