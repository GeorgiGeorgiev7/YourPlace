import './PlaceItem.css';

import { useState, useContext } from 'react';
import useHttpClient from '../../../common/hooks/http-hook';

import AuthContext from '../../../common/context/auth-context';

import Card from '../../../common/components/UIElements/Card/Card';
import Button from '../../../common/components/FormElements/Button/Button';
import Modal from '../../../common/components/UIElements/Modal/Modal';
import Map from '../../../common/components/UIElements/Map/Map';

import ErrorModal from '../../../common/components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../../common/components/UIElements/LoadingSpinner/LoadingSpinner';


const PlaceItem = ({
    place,
    onDelete
}) => {

    const { userId } = useContext(AuthContext);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [showMap, setShowMap] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const showConfirmModalHandler = () =>
        setShowConfirmModal(true);
    const closeConfirmModalHandler = () =>
        setShowConfirmModal(false);

    const confirmDeleteHandler = () => {
        closeConfirmModalHandler();

        sendRequest(`http://localhost:5000/api/places/${place.id}`, 'DELETE')
            .then(() => onDelete(place.id))
            .catch(err => {  });
    };

    const showMapHandler = () =>
        setShowMap(true);
    const closeMapHandler = () =>
        setShowMap(false);

    return (
        <>
            <ErrorModal error={error} onCancel={clearError} />
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
                    {isLoading && <LoadingSpinner asOverlay />}
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
                        {userId === place.creator &&
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