import { createPortal } from 'react-dom';

import './Backdrop.css';


const Backdrop = ({
    onClick
}) => {
    const content =
        <p className='backdrop' onClick={onClick}></p>;

    return createPortal(content,
        document.getElementById('backdrop-hook'));
};


export default Backdrop;
