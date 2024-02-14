import React, {useContext, useState} from 'react';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {useNavigate} from "react-router-dom";
import {AuthContext} from "./AuthContext";
import {useTranslation} from "react-i18next";

function Login() {
    const {t} = useTranslation()
    const navigate = useNavigate();
    const auth = getAuth();

    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)

    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const signIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Logged in")
            setIsLoggedIn(true)
            navigate('/');
        } catch (err) {
            // @ts-ignore
            setError(err.message);
        }
    }

    const handleSignOut = async () => {
        try {
            await auth.signOut();
            console.log('User signed out');
            setIsLoggedIn(false)
            navigate('/');
        } catch (error) {
            console.error('Error signing out: ', error);
        }
    }

    return (
        <div>
            {
                isLoggedIn
                    ?
                    <div>
                        <p> You are logged in </p>
                        <button onClick={handleSignOut}>
                            {t('nav.logout')}
                        </button>
                    </div>
                    :
                    <div>
                        <p> You are not logged in </p>
                        <p>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                            />
                        </p>
                        <p>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            />
                        </p>
                        <button onClick={signIn}>{t('nav.login')}</button>
                        {error && <p>{error}</p>}
                    </div>
            }
        </div>
    );
}

export default Login;