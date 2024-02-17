import './styles.css'
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {signupRequest} from "../../redux/modules/auth/actions";
export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        dispatch(signupRequest({
            name,
            email,
            password,
            repeat_password:repeatPassword
        }));
    };
    return (
        <section className={'signup-section'}>
            <form className={'signup-form'} onSubmit={handleSubmit} autoComplete="off">
                <h4>JOIN US</h4>
                <input
                    type="text"
                    id="name"
                    value={name}
                    placeholder={'Name'}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
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
                <input
                    type="password"
                    id="repeat-password"
                    value={repeatPassword}
                    placeholder={'Confirm Password'}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    required
                />
                <button type="submit">Signup</button>
            </form>
        </section>
    )
}
