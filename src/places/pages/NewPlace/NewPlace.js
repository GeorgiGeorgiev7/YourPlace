import './NewPlace.css';

import { useCallback, useReducer } from 'react';

import Input from '../../../common/components/FormElements/Input/Input';
import Button from '../../../common/components/FormElements/Button/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../../common/util/validators';


const formReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true;

            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid &&
                        state.inputs[inputId].isValid;
                }
            }

            const res = {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {
                        value: action.value,
                        isValid: action.isValid
                    }
                },
                isValid: formIsValid
            };
            return res;

        default:
            return state;
    }
};


const NewPlace = () => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            }
        },
        isValid: false
    });

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: 'INPUT_CHANGE',
            value,
            isValid,
            inputId: id
        });
    }, []);

    return (
        <form className="place-form">
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
            <Button type='submit' disabled={!formState.isValid}>
                ADD PLACE
            </Button>
        </form>
    );
};

export default NewPlace;
