import Spinner from '../views/spinnerView';
import { useEffect } from 'react';
import { logoutUser } from '../../backend/model/user';
import { useNavigate } from 'react-router-dom';

export default function LogoutPresenter(){
    //const user = useRecoilValue(loggedInUserAtom);
    const navigate = useNavigate();
    
    useEffect(() => {
        logoutUser()
        navigate("/");
    }, [])
    return(<Spinner></Spinner>)
}