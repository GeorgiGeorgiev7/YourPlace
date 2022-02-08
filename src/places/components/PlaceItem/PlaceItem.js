import './PlaceItem.css';

import { useState } from 'react';

import Card from '../../../common/components/UIElements/Card/Card';
import Button from '../../../common/components/FormElements/Button/Button'
import Modal from '../../../common/components/UIElements/Modal/Modal';
import Map from '../../../common/components/UIElements/Map/Map';


const PlaceItem = ({
    place
}) => {
    const [showMap, setShowMap] = useState(false);

    const openMapHandler = () => setShowMap(true);
    const closeMapHandler = () => setShowMap(false);

    return (
        <>
            <Modal
                show={showMap}
                onCancel={closeMapHandler}
                header={place.address}
                contentClass="place-item__modal-content"
                footerClass="place-item__modal-actions"
                footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
            >
                <div className='map-container'>
                    <Map center={place.coordinates} zoom={16} />
                </div>
            </Modal>
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
                        <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
                        <Button to={`/places/${place.id}`}>EDIT</Button>
                        <Button danger >DELETE</Button>
                    </div>
                </Card>
            </li>
        </>
    );
};

export default PlaceItem;;;;;;