import { useState, useEffect } from 'react';

import UsersList from "../components/UsersList/UsersList";

import ErrorModal from "../../common/components/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../../common/components/UIElements/LoadingSpinner/LoadingSpinner";


const Users = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [users, setUsers] = useState();

    useEffect(() => {
        const sendReq = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('http://localhost:5000/api/users');
                const data = await response.json();

                if (!response.ok) {
                    throw data;
                }

                setIsLoading(false);
                setUsers(data.users);
            } catch (err) {
                setIsLoading(false);
                setError(err.message);
            }
        };

        sendReq();
    }, []);

    const errorHandler = () => {
        setError(null);
    };

    return (
        <>
            <ErrorModal error={error} onClear={errorHandler} />
            {isLoading && (
                <div className='center'>
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && users && <UsersList items={users} />}
        </>
    );
};

export default Users;
