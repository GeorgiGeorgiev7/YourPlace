import './PlaceList.css';

import Card from '../../../common/components/UIElements/Card/Card';
import PlaceItem from '../PlaceItem/PlaceItem';


const PlaceList = ({
    places
}) => {
    if (places.length === 0) {
        return (
            <div className='place-list center'>
                <Card>
                    <h2>No places found.</h2>
                </Card>
            </div>
        );
    }

    return (
        <ul className='place-list'>
            {places.map(place =>
                <PlaceItem key={place.id} place={place} />)}
        </ul>
    );
};

export default PlaceList;
