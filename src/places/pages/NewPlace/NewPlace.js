import '../PlaceForm.css';

import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../../common/hooks/form-hook';
import useHttpClient from '../../../common/hooks/http-hook';

import AuthContext from '../../../common/context/auth-context';

import Input from '../../../common/components/FormElements/Input/Input';
import Button from '../../../common/components/FormElements/Button/Button';
import ErrorModal from '../../../common/components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../../common/components/UIElements/LoadingSpinner/LoadingSpinner';
import ImageUpload from '../../../common/components/FormElements/ImageUpload/ImageUpload';

import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../../common/util/validators';


const NewPlace = () => {
    const navigate = useNavigate();
    const { userId } = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [formState, inputHandler] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        },
        address: {
            value: '',
            isValid: false
        },
        image: {
            value: null,
            isValid: false
        }
    }, false);

    const submitHandler = async e => {
        e.preventDefault();

        try {
            const formData = new FormData();

            formData.append('title', formState.inputs.title.value);
            formData.append('description', formState.inputs.description.value);
            formData.append('address', formState.inputs.address.value);
            formData.append('creator', userId);
            formData.append('image', formState.inputs.image.value);

            await sendRequest(
                'http://localhost:5000/api/places',
                'POST',
                {},
                formData
            );

            navigate('/');
        } catch (err) {

        }
    };

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}
            <form className="place-form" onSubmit={submitHandler}>
                <Input
                    id='title'
                    element='input'
                    type='text'
                    label='Title'
                    validators={[VALIDATOR_REQUIRE()]}
                    errorMessage='Please enter a valid title.'
                    onInput={inputHandler}
                />
                <Input
                    id='description'
                    element='textarea'
                    label='Description'
                    validators={[VALIDATOR_MINLENGTH(10)]}
                    errorMessage='Please enter a valid description (at least 10 characters).'
                    onInput={inputHandler}
                />
                <Input
                    id='address'
                    element='input'
                    label='Address'
                    validators={[VALIDATOR_REQUIRE()]}
                    errorMessage='Please enter a valid address.'
                    onInput={inputHandler}
                />
                <ImageUpload
                    center
                    id="image"
                    onInput={inputHandler}
                    errorText="Please provide an image."
                />
                <Button type='submit' disabled={!formState.isValid}>
                    ADD PLACE
                </Button>
            </form>
        </>
    );
};

export default NewPlace;
