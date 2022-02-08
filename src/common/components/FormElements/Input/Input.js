import './Input.css';

import { useReducer } from 'react';

import { validate } from '../../../util/validators';


const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.value,
                isValid: validate(action.value, action.validators)
            };
        default:
            return state;
    }
};


const Input = (props) => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: '',
        isValid: true
    });

    const changeHandler = e => {
        dispatch({
            type: 'CHANGE',
            value: e.target.value,
            validators: props.validators
        });
    };

    const element =
        props.element === 'input'
            ? <input
                id={props.id}
                type={props.type}
                placeholder={props.placeholder}
                onChange={changeHandler}
                value={inputState.value}
            />
            : <textarea
                id={props.id}
                rows={props.rows || 3}
                onChange={changeHandler}
                value={inputState.value}
            />;

    return (
        <div className={
            `form-control 
            ${!inputState.isValid && 'form-control--invalid'}`
        }>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isValid &&
                <p>{props.errorMessage}</p>}
        </div>
    );
};

export default Input;
