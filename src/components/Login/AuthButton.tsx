import {useNavigate} from "react-router-dom";
import {ReactComponent as LockedSvg} from './locked.svg';
import {ReactComponent as UnlockedSvg} from './unlocked.svg';
import React, {useContext} from "react";
import {AuthContext} from "./AuthContext";

const AuthButton: React.FC = () => {
    const navigate = useNavigate();
    const {isLoggedIn} = useContext(AuthContext)

    const handleClick = () => {
        navigate('/login');
    }

    return (
        <span onClick={handleClick}>{isLoggedIn ? <UnlockedSvg/> : <LockedSvg/>}</span>
    );
}
export default AuthButton