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
            <form className={'login-form'} onSubmit={handleSubmit}>
                {/*<label htmlFor="email">Email:</label>*/}
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                {/*<label htmlFor="password">Password:</label>*/}
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Login</button>
            </form>
        </section>
    )
}
