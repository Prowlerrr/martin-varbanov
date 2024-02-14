import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {auth, firestore} from "../../firebase";
import {doc, setDoc} from "firebase/firestore";
import {useTranslation} from "react-i18next";

const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const {t} = useTranslation()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');

    const signIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Logged in")
            navigate('/');
        } catch (err) {
            // @ts-ignore
            setError(err.message);
        }
    }

    const signUp = async () => {
        const auth = getAuth();
        try {
            console.log("try create user")
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Storing the username related to this user into Firestore
            await setDoc(doc(firestore, "users", user.uid), {
                username: username,
            });

        } catch (error) {
            // @ts-ignore
            console.log(error.message);
        }
    }

    return (
        <div>
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
            <p>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
            </p>
            <button onClick={signUp}>{t('nav.signup')}</button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default SignUp;