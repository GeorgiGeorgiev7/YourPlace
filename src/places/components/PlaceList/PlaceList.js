import './PlaceList.css';

import { Navigate } from 'react-router-dom';

import PlaceItem from '../PlaceItem/PlaceItem';


const PlaceList = ({
    places
}) => {
    if (places.length === 0) {
        return <Navigate to="/pageNotFound"/>;
    }

    return (
        <ul className='place-list'>
            {places.map(place =>
                <PlaceItem key={place.id} place={place} />)}
        </ul>
    );
};

export default PlaceList;
