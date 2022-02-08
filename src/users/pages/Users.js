import UsersList from "../components/UsersList/UsersList";


const Users = () => {
    const USERS = [
        {
            id: 'uid1',
            name: 'Gogo',
            imageUrl: 'https://scontent-otp1-1.xx.fbcdn.net/v/t39.30808-6/240863747_2732935983595447_1828249937804235462_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=GPLs_w3mp38AX933buS&_nc_ht=scontent-otp1-1.xx&oh=00_AT9piO08pQGs52SUPXSScoBiuhFtXkW--S4v27ZQ2nTcJw&oe=62076372',
            placeCount: 5
        }
    ];

    return <UsersList items={USERS} />;
};

export default Users;
