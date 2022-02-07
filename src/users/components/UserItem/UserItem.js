import style from './UserItem.module.css';
import { Link } from 'react-router-dom';

import Avatar from '../../../common/components/UIElements/Avatar/Avatar';
import Card from '../../../common/components/UIElements/Card/Card';

const UserItem = ({
  user
}) => {
  return (
    <li className={style['user-item']}>
      <Card className={style['user-item__content']}>
        <Link to={`/${user.id}/places`}>
          <div className={style['user-item__image']}>
            <Avatar image={user.img} alt={user.name} />
          </div>
          <div className={style['user-item__info']}>
            <h2>{user.name}</h2>
            <h3>
              {user.placeCount}
              {user.placeCount === 1 ? ' Place' : ' Places'}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
