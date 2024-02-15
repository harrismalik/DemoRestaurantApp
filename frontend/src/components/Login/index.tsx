import './styles.css'
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {loginRequest} from "../../redux/modules/auth/actions";
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        dispatch(loginRequest({
            email,
            password
        }));
    };
    return (
        <section className={'login-section'}>
            <form className={'login-form'} onSubmit={handleSubmit} autoComplete="off">
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
                <button type="submit">Login</button>
            </form>
        </section>
    )
}
