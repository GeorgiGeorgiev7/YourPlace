import './Auth.css';

import { useState, useContext } from 'react';
import useHttpClient from '../../../common/hooks/http-hook';
import AuthContext from '../../../common/context/auth-context';

import Card from '../../../common/components/UIElements/Card/Card';
import Input from '../../../common/components/FormElements/Input/Input';
import Button from '../../../common/components/FormElements/Button/Button';

import ErrorModal from '../../../common/components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../../common/components/UIElements/LoadingSpinner/LoadingSpinner';

import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../../common/util/validators';

import { useForm } from '../../../common/hooks/form-hook';

import ImageUpload from '../../../common/components/FormElements/ImageUpload/ImageUpload';


const Auth = () => {
    const { login } = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false);

    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData({
                ...formState.inputs,
                username: undefined
            }, formState.inputs.email.isValid &&
            formState.inputs.password.isValid);
        } else {
            setFormData({
                ...formState.inputs,
                username: {
                    value: '',
                    isValid: false
                }
            }, false);
        }
        setIsLoginMode(prevMode => !prevMode);
    };

    const authSubmitHandler = async e => {
        e.preventDefault();

        if (!isLoginMode) {
            try {
                const data = await sendRequest(
                    'http://localhost:5000/api/users/signup',
                    'POST',
                    {
                        'Content-Type': 'application/json'
                    },
                    JSON.stringify({
                        username: formState.inputs.username.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    })

                );
                
                login(data.user.id);
            } catch (err) {
                // no login()
            }

        } else {
            try {
                const data = await sendRequest(
                    'http://localhost:5000/api/users/login',
                    'POST',
                    {
                        'Content-Type': 'application/json'
                    },
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    })

                );
                login(data.user.id);
            } catch (err) {
                // no signup()
            }
        };
    };

    return (
        <>
            {error &&
                <ErrorModal error={error} onClear={clearError} />}
            <Card Card className="authentication">
                {isLoading && <LoadingSpinner asOverlay />}
                <h2>Login Required</h2>
                <hr />
                <form onSubmit={authSubmitHandler}>
                    {!isLoginMode &&
                        <Input
                            element='input'
                            id='username'
                            type='text'
                            label='Username'
                            validators={[VALIDATOR_REQUIRE()]}
                            errorMessage='Please choose a username.'
                            onInput={inputHandler}
                        />
                    }
                    {!isLoginMode &&
                        <ImageUpload center id="image" />
                    }
                    <Input
                        element="input"
                        id="email"
                        type="email"
                        label="E-mail"
                        validators={[VALIDATOR_EMAIL()]}
                        errorMessage="Please enter a valid email address."
                        onInput={inputHandler}
                    />
                    <Input
                        element="input"
                        id="password"
                        type="password"
                        label="Password"
                        validators={[VALIDATOR_MINLENGTH(8)]}
                        errorMessage="Please enter a valid password (at least 8 characters)."
                        onInput={inputHandler}
                    />
                    <Button
                        type="submit"
                        disabled={!formState.isValid}
                    >
                        {isLoginMode ? 'LOGIN' : 'SIGN UP'}
                    </Button>
                </form>
                <Button inverse onClick={switchModeHandler}>
                    SWITCH TO {isLoginMode ? 'SIGN UP' : 'LOGIN'}
                </Button>
            </Card>
        </>
    );
};

export default Auth;
