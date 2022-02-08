import './NewPlace.css';

import Input from '../../../common/components/FormElements/Input/Input';


const NewPlace = () => {
    return (
        <form className="place-form">
            <Input
                element='input'
                type='text'
                label='Title'
                validator={[]}
                errorMessage='Please enter a valid title.'
            />
        </form>
    );
};

export default NewPlace;