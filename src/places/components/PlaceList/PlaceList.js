import './PlaceList.css';

import PlaceItem from '../PlaceItem/PlaceItem';
import Button from '../../../common/components/FormElements/Button/Button';
import Card from '../../../common/components/UIElements/Card/Card';


const PlaceList = ({
    places
}) => {
    if (places.length === 0) {
        return (
            <div className='place-list center'>
                <Card>
                    <h2>No places found. Maybe create one?</h2>
                    <Button to='/places/new'>Share Place</Button>
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
