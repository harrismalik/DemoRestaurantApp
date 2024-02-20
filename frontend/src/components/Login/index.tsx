import './styles.css'
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginRequest} from "../../redux/modules/auth/actions";
import {selectIsAuthError} from "../../redux/modules/auth/selectors";
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authFailed, setAuthFailed] = useState(false);
    const [attempt, setAttempt] = useState(false);
    const dispatch = useDispatch();
    const error = useSelector(selectIsAuthError)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setAuthFailed(false)
        dispatch(loginRequest({
            email,
            password
        }))
        setAttempt(true)
    };

    useEffect(() => {
        if(error && attempt) {
            setAuthFailed(true)
            setAttempt(false)
        }
    },[error,attempt])

    return (
        <section className={'login-section'}>
            <form className={'login-form'} onSubmit={handleSubmit} autoComplete="off">
                <h4>LOGIN</h4>
                {authFailed && <h4 className={'error'}>Please enter correct credentials or sign up</h4>}
                <input
                    type="email"
                    id="email"
                    value={email}
                    placeholder={'Email'}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    id="password"
                    value={password}
                    placeholder={'Password'}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button>Let's go</button>
            </form>
        </section>
    )
}
