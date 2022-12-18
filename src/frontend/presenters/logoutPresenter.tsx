import react from 'react';
import Spinner from '../views/spinnerView';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { loggedInUserAtom } from '../../backend/model/user';
import { logoutUser } from '../../backend/model/user';
import { useNavigate } from 'react-router-dom';

export default function LogoutPresenter(props:any){
    //const user = useRecoilValue(loggedInUserAtom);
    const navigate = useNavigate();
    
    useEffect(() => {
        logoutUser()
        navigate("/");
    }, [])
    return(<Spinner></Spinner>)
}