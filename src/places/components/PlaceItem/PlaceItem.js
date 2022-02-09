import './PlaceItem.css';

import { useState, useContext } from 'react';

import AuthContext from '../../../common/context/auth-context';

import Card from '../../../common/components/UIElements/Card/Card';
import Button from '../../../common/components/FormElements/Button/Button';
import Modal from '../../../common/components/UIElements/Modal/Modal';
import Map from '../../../common/components/UIElements/Map/Map';


const PlaceItem = ({
    place
}) => {
    const { isLoggedIn } = useContext(AuthContext);

    const [showMap, setShowMap] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const showConfirmModalHandler = () =>
        setShowConfirmModal(true);
    const closeConfirmModalHandler = () =>
        setShowConfirmModal(false);
    const confirmDeleteHandler = () => {
        closeConfirmModalHandler();
        console.log('Deleting place...');
        // TODO back end service connection
    };

    const showMapHandler = () =>
        setShowMap(true);
    const closeMapHandler = () =>
        setShowMap(false);

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
                    <Map center={place.location} zoom={16} />
                </div>
            </Modal>
            <Modal
                show={showConfirmModal}
                onCancel={closeConfirmModalHandler}
                header='Are you sure?' footerClass='place-item__modal-actions'
                footer={
                    <>
                        <Button inverse onClick={closeConfirmModalHandler}>CANCEL</Button>
                        <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
                    </>
                }
            >
                <p>
                    Are you sure you want to delete this place? Please note that it can not be restored thereafter.
                </p>
            </Modal>
            <li className='place-item'>
                <Card className='place-item__content'>
                    <div className='place-item__image'>
                        <img src={place.image} alt={place.title} />
                    </div>
                    <div className='place-item__info'>
                        <h2>{place.title}</h2>
                        <h3>{place.address}</h3>
                        <p>{place.description}</p>
                    </div>
                    <div className='place-item__actions'>
                        <Button inverse onClick={showMapHandler}>VIEW ON MAP</Button>
                        {isLoggedIn &&
                            <>
                                <Button to={`/places/${place.id}`}>EDIT</Button>
                                <Button danger onClick={showConfirmModalHandler}>DELETE</Button>
                            </>
                        }
                    </div>
                </Card>
            </li>
        </>
    );
};

export default PlaceItem;;;;;;