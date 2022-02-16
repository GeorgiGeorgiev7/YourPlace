import './UserItem.css';
import { Link } from 'react-router-dom';

import Avatar from '../../../common/components/UIElements/Avatar/Avatar';
import Card from '../../../common/components/UIElements/Card/Card';

const UserItem = ({
  user
}) => {
  return (
    <li className='user-item'>
      <Card className='user-item__content'>
        <Link to={`/${user.id}/places`}>
          <div className='user-item__image'>
            <Avatar image={'http://localhost:5000/' + user.image} alt="Profile Picture" />
          </div>
          <div className='user-item__info'>
            <h3>
              {user.places.length === 1
                ? `${user.places.length} place`
                : `${user.places.length} places`
              }
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
