import { useEffect, useState } from 'react';
import api from '../axios/axios';
import {  useAuthMutation } from '../redux/admin/adminApi';

export const useAuthentication = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const isLogin = async () => {
            try {
                const response = await api.get('/auth', { withCredentials: true });
                if (response.data.status) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                setIsLoggedIn(false);
                console.error('Error checking authentication:', error);
            } finally {
                setIsLoading(false);
            }
        };

        isLogin();
    }, []);

    return { isLoading, isLoggedIn };
};

export const useAdminAuthentication = () => {
    const [isFetching, setIsFetching] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [auth] = useAuthMutation();

    useEffect(() => {
        const checkAdminAuthentication = async () => {
            try {
                setIsFetching(true);
                const response = await auth({}).unwrap();
                console.log(response,'authResponse');
                
                if (response.status) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                setIsLoggedIn(false);
                console.error('Error checking authentication:', error);
            } finally {
                setIsFetching(false); 
            }
        };

        checkAdminAuthentication();

    }, []);

    return { isFetching, isLoggedIn };
};