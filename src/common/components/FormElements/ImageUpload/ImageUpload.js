import { useRef, useState, useEffect } from 'react';
import Button from '../Button/Button';
import './ImageUpload.css';




const ImageUpload = props => {
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);

    const filePickerRef = useRef();

    const pickImageHandler = () => {
        filePickerRef.current.click();
    };

    const pickedImageHandler = ev => {
        let pickedFile, fileIsValid;
        if (ev.target.files?.length === 1) {
            pickedFile = ev.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        } else {
            setIsValid(false);
            fileIsValid = false;
        }

        props.onInput(props.id, pickedFile, fileIsValid);
    };

    useEffect(() => {
        if (!file) return;

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };

        fileReader.readAsDataURL(file);

    }, [file]);

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
                    {previewUrl
                        ? <img src={previewUrl} alt="Preview" />
                        : <p>Please pick an image</p>
                    }
                </div>
                <Button type="button" onClick={pickImageHandler}>
                    Pick Image
                </Button>
            </div>
            {!isValid && <p>{props.errorText}</p>}
        </div>
    );
};

export default ImageUpload;