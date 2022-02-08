import './Auth.css';

import Card from '../../../common/components/UIElements/Card/Card';
import Input from '../../../common/components/FormElements/Input/Input';
import Button from '../../../common/components/FormElements/Button/Button';

import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../../common/util/validators';

import { useForm } from '../../../common/hooks/form-hook';


const Auth = () => {
    const [formState, inputHandler] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false);

    const authSubmitHandler = e => {
        e.preventDefault();
        console.log(formState.inputs);
        // TODO rest service connection
    };


    return (
        <Card className="authentication">
            <h2>Login Required</h2>
            <hr />
            <form onSubmit={authSubmitHandler}>
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
                    LOGIN
                </Button>
            </form>
        </Card>
    );
};

export default Auth;
