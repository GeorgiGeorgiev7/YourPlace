import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../../common/components/FormElements/Button/Button";
import Input from "../../../common/components/FormElements/Input/Input";
import Card from '../../../common/components/UIElements/Card/Card';
import ErrorModal from '../../../common/components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../../common/components/UIElements/LoadingSpinner/LoadingSpinner';
import { useForm } from '../../../common/hooks/form-hook';
import useHttpClient from '../../../common/hooks/http-hook';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../../common/util/validators";
import '../PlaceForm.css';
import AuthContext from '../../../common/context/auth-context';


const UpdatePlace = () => {
    const navigate = useNavigate();
    const { userId } = useContext(AuthContext);
    const placeId = useParams().pid;

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [loadedPlace, setLoadedPlace] = useState();

    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false,
        },
        description: {
            value: '',
            isValid: false
        }
    }, false);

    useEffect(() => {
        sendRequest(`http://localhost:5000/api/places/${placeId}`)
            .then(data => {
                const place = data.place;

                setLoadedPlace(place);
                setFormData({
                    title: {
                        value: place.title,
                        isValid: true,
                    },
                    description: {
                        value: place.description,
                        isValid: true
                    }
                },
                    true
                );
            })
            .catch(err => { });
    }, [sendRequest, placeId, setFormData]);


    const submitHandler = e => {
        e.preventDefault();

        sendRequest(`http://localhost:5000/api/places/${placeId}`,
            'PATCH',
            {
                'Content-Type': 'application/json'
            },
            JSON.stringify({
                title: formState.inputs.title.value,
                description: formState.inputs.description.value
            }))
            .then(data => navigate(`/${userId}/places`))
            .catch(err => { });

    };

    if (isLoading) {
        return (
            <div className='center'>
                <LoadingSpinner />
            </div>
        );
    }

    if (!loadedPlace) {
        return (
            <div className='center'>
                <Card>
                    <h2>Could not find place.</h2>
                </Card>
            </div>
        );
    }

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            {!isLoading && loadedPlace &&
                <form className="place-form" onSubmit={submitHandler}>
                    <Input
                        id='title'
                        element='input'
                        type='text'
                        label='Title'
                        validators={[VALIDATOR_REQUIRE()]}
                        errorMessage='Please enter a valid title.'
                        onInput={inputHandler}
                        initialValue={loadedPlace.title}
                        initialIsValid={true}
                    />
                    <Input
                        id='description'
                        element='textarea'
                        label='Description'
                        validators={[VALIDATOR_MINLENGTH(10)]}
                        errorMessage='Please enter a valid description (at least 10 characters).'
                        onInput={inputHandler}
                        initialValue={loadedPlace.description}
                        initialIsValid={true}
                    />
                    <Button type='submit' disabled={!formState.isValid}>
                        UPDATE PLACE
                    </Button>
                </form>}
        </>
    );
};

export default UpdatePlace;
