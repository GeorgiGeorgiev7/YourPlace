import style from './UsersList.module.css';
import UserItem from '../UserItem/UserItem';

const UsersList = ({
    items
}) => {
    if (items.length === 0) {
        return (
            <div className={style.center}>
                <h2>No users found.</h2>
            </div>
        );
    }

    return (
        <ul>
            {items.map(user =>
                <UserItem key={user.id} user={user} />)}
        </ul>
    );
};

export default UsersList;