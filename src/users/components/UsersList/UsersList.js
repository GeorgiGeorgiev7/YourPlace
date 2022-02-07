import styles from './UsersList.module.css';
import UserItem from '../UserItem/UserItem';

const UsersList = ({
    items
}) => {
    if (items.length === 0) {
        return (
            <div className={styles.center}>
                <h2>No users found.</h2>
            </div>
        );
    }

    return (
        <ul className='users-list'>
            {items.map(user =>
                <UserItem key={user.id} user={user} />)}
        </ul>
    );
};

export default UsersList;
