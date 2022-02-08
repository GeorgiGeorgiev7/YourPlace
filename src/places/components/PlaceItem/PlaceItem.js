import './PlaceItem.css';

import Card from '../../../common/components/UIElements/Card/Card';
import Button from '../FormElements/Button/Button';


const PlaceItem = ({
    place
}) => {
    return (
        <li className='place-item'>
            <Card className='place-item__content'>
                <div className='place-item__image'>
                    <img src={place.imageUrl} alt={place.title} />
                </div>
                <div className='place-item__info'>
                    <h2>{place.title}</h2>
                    <h3>{place.address}</h3>
                    <p>{place.description}</p>
                </div>
                <div className='place-item__actions'>
                    <Button inverse>VIEW ON MAP</Button>
                    <Button to={`/places/${place.id}`}>EDIT</Button>
                    <Button danger >DELETE</Button>
                </div>
            </Card>
        </li>
    );
};

export default PlaceItem;