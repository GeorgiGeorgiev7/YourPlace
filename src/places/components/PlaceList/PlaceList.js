import './PlaceList.css';

import PlaceItem from '../PlaceItem/PlaceItem';
import Button from '../../../common/components/FormElements/Button/Button';
import Card from '../../../common/components/UIElements/Card/Card';
import { useContext } from 'react';
import AuthContext from '../../../common/context/auth-context';


const PlaceList = ({
    places,
    onDelete
}) => {

    const { isLoggedIn } = useContext(AuthContext);

    if (places.length === 0) {
        return (
            <div className='place-list center'>
                <Card>
                    {isLoggedIn
                        ?
                        <>
                            <h2>No places found. Maybe create one?</h2>
                            <Button to='/places/new'>Share Place</Button>
                        </>
                        :
                        <>
                            <h2>This user hasn't published any places yet</h2>
                        </>
                    }
                </Card>
            </div>
        );
    }


    return (
        <ul className='place-list'>
            {places.map(place =>
                <PlaceItem
                    key={place.id}
                    place={place}
                    onDelete={onDelete}
                />)}
        </ul>
    );
};

export default PlaceList;
