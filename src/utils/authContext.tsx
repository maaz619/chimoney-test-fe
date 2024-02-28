"use client"
import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";
// import { getCookie } from 'cookies-next';
import { getMe } from "./services";

export interface LoggedInState {
    token?: string;
    isLoggedIn: boolean;
    user?: any
}

export interface ILoggedInContextType {
    loggedInState: LoggedInState;
    setLoggedInState: Dispatch<SetStateAction<LoggedInState>>;
}

export const LoggedInContext = createContext<ILoggedInContextType>(
    {} as ILoggedInContextType
)

export const LoggedInStateProvider = ({ children }: any) => {
    const [loggedInState, setLoggedInState] = useState<LoggedInState>({
        isLoggedIn: false,
        token: '',
        user: {}
    })
    const jwt = localStorage.getItem('token')

    useEffect(() => {
        // Retrieve JWT token from cookies
        if (jwt && (!loggedInState?.isLoggedIn || !loggedInState.user)) {
            getMe({ token: jwt }).then(userData => userData.json()).then(user => {
                console.log(user)
                setLoggedInState({
                    ...loggedInState, isLoggedIn: true, token: jwt, user
                })
            }).catch(err => console.log(err))
        }

    }, [jwt])
    const value: ILoggedInContextType = {
        loggedInState,
        setLoggedInState
    }
    return (
        <LoggedInContext.Provider value={value}> {children} </LoggedInContext.Provider>
    )
}