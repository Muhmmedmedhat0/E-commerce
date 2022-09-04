import { useEffect, useState } from 'react';
import './widgetSm.css';
import { Visibility } from '@material-ui/icons';
import { Link } from 'react-router-dom'
export default function WidgetSm() {
  const user = JSON.parse(sessionStorage?.getItem('persist:user'))?.userInfo;
  const currentUser = user && JSON.parse(user);
  const TOKEN = currentUser?.token;
  
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/api/users/?new=true',
          {
            method: 'GET',
            headers: { Authorization: `Bearer ${TOKEN}` },
          }
        );
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        if (error) {
          setError(error);
        }
      }
    };
    getUsers();
  }, [setUsers, TOKEN]);
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {error ? 'something went wrong' : users && users.map((user) => (
              <li className="widgetSmListItem" key={user._id}>
                <img src={ user.img || 'https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif'}
                  alt={user.userName} className="widgetSmImg"/>
                <div className="widgetSmUser"> <span className="widgetSmUsername">{user.userName}</span></div>
            <button className="widgetSmButton"><Visibility className="widgetSmIcon" />
              <Link to={`user/${user._id}`} className='link'>
                Display
              </Link>
            </button>
              </li>
            ))}
      </ul>
    </div>
  );
}
