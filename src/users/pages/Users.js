import { useState, useEffect } from 'react';
import useHttpClient from '../../common/hooks/http-hook';

import UsersList from "../components/UsersList/UsersList";

import ErrorModal from "../../common/components/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../../common/components/UIElements/LoadingSpinner/LoadingSpinner";



const Users = () => {
    const [users, setUsers] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        sendRequest('http://localhost:5000/api/users')
            .then(data => setUsers(data.users))
            .catch(err => { });
    }, [sendRequest]);

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
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
