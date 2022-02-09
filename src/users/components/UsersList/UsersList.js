import './UsersList.css';

import UserItem from '../UserItem/UserItem';
import Card from '../../../common/components/UIElements/Card/Card';


const UsersList = ({
    items
}) => {
    console.log(items);
    if (items.length === 0) {
        return (
            <div className='center'>
                <Card className='center'>
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
