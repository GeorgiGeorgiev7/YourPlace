import styles from './UsersList.module.css';

import UserItem from '../UserItem/UserItem';
import Card from '../../../common/components/UIElements/Card/Card';


const UsersList = ({
    items
}) => {
    if (items.length === 0) {
        return (
            <div className={styles.center}>
                <Card className={styles.center}>
                    <h2>No users found.</h2>
                </Card>
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
