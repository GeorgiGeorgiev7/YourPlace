import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from "../../components/PlaceList/PlaceList";

import useHttpClient from '../../../common/hooks/http-hook';

import ErrorModal from '../../../common/components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../../common/components/UIElements/LoadingSpinner/LoadingSpinner';


const UserPlaces = () => {
    const userId = useParams().uid;

    const [places, setPlaces] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        sendRequest(
            `http://localhost:5000/api/places/user/${userId}`
        )
            .then(data => setPlaces(data.places))
            .catch(err => { });
    }, [sendRequest, userId]);


    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className='center'>
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && places && <PlaceList places={places} />}
        </>
    );
};

export default UserPlaces;