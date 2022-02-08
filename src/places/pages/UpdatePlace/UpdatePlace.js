import '../PlaceForm.css';

import { useEffect } from 'react';
import { useParams, Navigate } from "react-router-dom";
import { useForm } from '../../../common/hooks/form-hook';

import Input from "../../../common/components/FormElements/Input/Input";
import Button from "../../../common/components/FormElements/Button/Button";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../../common/util/validators";


const PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the greatest skyscrapers in the world!',
        imageUrl: 'https://images.fineartamerica.com/images-medium-large-5/empire-state-building-at-sunset-sylvain-sonnet.jpg',
        address: '20 W 34th St, New York, NY 10001, United States',
        coordinates: {
            lat: 40.7484445,
            lng: -73.9878531
        },
        creatorId: 'uid1'
    },

    {
        id: 'p2',
        title: 'Empire State Building',
        description: 'One of the greatest skyscrapers in the world!',
        imageUrl: 'https://lh5.googleusercontent.com/p/AF1QipOqzJqLshzKnIkL6VlTOaPu6Y2YoEjrGXy79I4E=w408-h271-k-no',
        address: '20 W 34th St, New York, NY 10001, United States',
        coordinates: {
            lat: 40.7484445,
            lng: -73.9878531
        },
        creatorId: 'uid2'
    },

    {
        id: 'p3',
        title: 'Empire State Building',
        description: 'One of the greatest skyscrapers in the world!',
        imageUrl: 'https://static.posters.cz/image/1300/posters/henri-silberman-empire-state-building-i12995.jpg',
        address: '20 W 34th St, New York, NY 10001, United States',
        coordinates: {
            lat: 40.7484445,
            lng: -73.9878531
        },
        creatorId: 'uid1'
    }
];

const UpdatePlace = () => {
    const params = useParams();
    const placeId = params.pid;

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

    const place = PLACES.filter(place => place.id === placeId)[0];

    useEffect(() => {
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
    }, [setFormData, place]);

    const submitHandler = e => {
        e.preventDefault();
        console.log(formState.inputs);
        // TODO: Send it to the rest service
    };

    if (!place) {
        return <Navigate to="/pageNotFound" />;
    }

    if (!formState.inputs.title.value) {
        // temporary work around
        return (
            <div className='center'>
                <h2>Loading...</h2>
            </div>
        );
    }

    return (
        <form className="place-form" onSubmit={submitHandler}>
            <Input
                id='title'
                element='input'
                type='text'
                label='Title'
                validators={[VALIDATOR_REQUIRE()]}
                errorMessage='Please enter a valid title.'
                onInput={inputHandler}
                initialValue={formState.inputs.title.value}
                initialIsValid={formState.inputs.title.isValid}
            />
            <Input
                id='description'
                element='textarea'
                label='Description'
                validators={[VALIDATOR_MINLENGTH(10)]}
                errorMessage='Please enter a valid description (at least 10 characters).'
                onInput={inputHandler}
                initialValue={formState.inputs.description.value}
                initialIsValid={formState.inputs.description.isValid}
            />
            <Button type='submit' disabled={!formState.isValid}>
                UPDATE PLACE
            </Button>
        </form>
    );
};

export default UpdatePlace;
