import './ImageUpload.css';

import { useRef } from 'react';

import Button from '../Button/Button';


const ImageUpload = props => {
    const filePickerRef = useRef();

    const pickImageHandler = () => {
        filePickerRef.current.click();
    };

    const pickedImageHandler = ev => {
        console.log(ev.target);
    };

    return (
        <div className='form-control'>
            <input
                id={props.id}
                style={{ display: 'none' }}
                type="file"
                accept=".jpg,.png,.jpeg"
                ref={filePickerRef}
                onChange={pickedImageHandler}
            />
            <div className={`image-upload ${props.center && 'center'}`}>
                <div className='image-upload__preview'>
                    <img src="" alt="" />
                </div>
                <Button type="button" onClick={pickImageHandler}>Pick Image</Button>
            </div>
        </div>
    );
};

export default ImageUpload;