import Spinner from '../views/spinnerView';
import { useEffect } from 'react';
import { logoutUser } from '../../backend/model/user';
import { loggedInUserAtom } from '../../backend/model/user';
import { useSetRecoilState } from 'recoil';

export default function LogoutPresenter(){
    //const user = useRecoilValue(loggedInUserAtom);
    const setLoggedInUser = useSetRecoilState(loggedInUserAtom);

    useEffect(() => {
        setLoggedInUser(null);
        logoutUser()
    }, [])
    return(<Spinner></Spinner>)
}