import './NewPlace.css';

import Input from '../../../common/components/FormElements/Input/Input';
import { VALIDATOR_REQUIRE } from '../../../common/util/validators';


const NewPlace = () => {
    return (
        <form className="place-form">
            <Input
                element='input'
                type='text'
                label='Title'
                validators={[VALIDATOR_REQUIRE()]}
                errorMessage='Please enter a valid title.'
            />
        </form>
    );
};

export default NewPlace;