import '../PlaceForm.css';

import { useForm } from '../../../common/hooks/form-hook';

import Input from '../../../common/components/FormElements/Input/Input';
import Button from '../../../common/components/FormElements/Button/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../../common/util/validators';


const NewPlace = () => {
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
        }
    }, false);

    const submitHandler = e => {
        e.preventDefault();
        console.log(formState.inputs);
        // TODO: Send it to the rest service
    };

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
            <Button type='submit' disabled={!formState.isValid}>
                ADD PLACE
            </Button>
        </form>
    );
};

export default NewPlace;
