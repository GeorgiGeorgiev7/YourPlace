import './Auth.css';

import { useState, useContext } from 'react';
import AuthContext from '../../../common/context/auth-context';

import Card from '../../../common/components/UIElements/Card/Card';
import Input from '../../../common/components/FormElements/Input/Input';
import Button from '../../../common/components/FormElements/Button/Button';

import ErrorModal from '../../../common/components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../../common/components/UIElements/LoadingSpinner/LoadingSpinner';

import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../../common/util/validators';

import { useForm } from '../../../common/hooks/form-hook';
import { useNavigate } from 'react-router-dom';


const Auth = () => {
    const navigate = useNavigate();

    const { login } = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();


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
            setIsLoading(true);

            try {
                const response = await fetch(
                    'http://localhost:5000/api/users/signup',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username: formState.inputs.username.value,
                            email: formState.inputs.email.value,
                            password: formState.inputs.password.value
                        })
                    }
                );

                const data = await response.json();
                if (!response.ok) {
                    throw data;
                }

                setIsLoading(false);

                login();
                navigate('/');

            } catch (err) {
                setIsLoading(false);
                console.log(err)
                setError(err.message ||
                    'Something went wrong, please try again.');
            }
        }
    };

    const errorHandler = () => {
        setError(null);
    };


    return (
        <>
            {error &&
                <ErrorModal error={error} onClear={errorHandler} />}
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
                        />}
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
