import PlaceList from "../components/PlaceList/PlaceList";


const PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most greatest skyscrapers in the world!',
        imageUrl: 'https://images.fineartamerica.com/images-medium-large-5/empire-state-building-at-sunset-sylvain-sonnet.jpg',
        address: '20 W 34th St, New York, NY 10001, United States',
        location: {
            lat: 40.7484445,
            lng: -73.9878531
        },
        creatorId: 'uid1'
    },
    
    {
        id: 'p2',
        title: 'Empire State Building',
        description: 'One of the most greatest skyscrapers in the world!',
        imageUrl: 'https://lh5.googleusercontent.com/p/AF1QipOqzJqLshzKnIkL6VlTOaPu6Y2YoEjrGXy79I4E=w408-h271-k-no',
        address: '20 W 34th St, New York, NY 10001, United States',
        location: {
            lat: 40.7484445,
            lng: -73.9878531
        },
        creatorId: 'uid1'
    },
    
    {
        id: 'p3',
        title: 'Empire State Building',
        description: 'One of the most greatest skyscrapers in the world!',
        imageUrl: 'https://static.posters.cz/image/1300/posters/henri-silberman-empire-state-building-i12995.jpg',
        location: {
            lat: 40.7484445,
            lng: -73.9878531
        },
        creatorId: 'uid1'
    }
];

const UserPlaces = () => {
    return <PlaceList places={PLACES} />;
};

export default UserPlaces;