import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useCallback } from 'react';
import styles from './login.module.css';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [emailValue, setEmailValue] = React.useState('')
    const inputRef = React.useRef(null)
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        alert('Icon Click Callback')
    }

    const [passwordValue, setPasswordValue] = React.useState('');
    const onChange = e => {
        setPasswordValue(e.target.value)
    }

    const history = useHistory();

    const navigateToRegister = useCallback(
        () => {
            history.replace({ pathname: '/register' });
        },
        [history]
    );

    const navigateToForgotPassword = useCallback(
        () => {
            history.replace({ pathname: '/forgot-password' });
        },
        [history]
    );

    return (
        <section className={styles.loginWrapper}>
            <h1>Вход</h1>

            <div className={`${styles.loginInput} mt-6 mb-6`}>
                <Input
                    type={'email'}
                    placeholder={'E-mail'}
                    onChange={e => setEmailValue(e.target.value)}
                    value={emailValue}
                    name={'name'}
                    error={false}
                    ref={inputRef}
                    onIconClick={onIconClick}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                />
            </div>

            <div className={`${styles.loginInput} mb-6`}>
                <PasswordInput
                    onChange={onChange}
                    value={passwordValue}
                    name={'password'}
                    extraClass="mb-2"
                />
            </div>

            <Button type="primary" size="medium">Войти</Button>

            <div className="mb-4">
                <span className="text text_type_main-default text_color_inactive">Вы новый пользователь?</span>
                
                <span className={styles.registerBtn}>
                    <Button type="secondary" size="large" onClick={() => navigateToRegister()}>
                        Зарегестрироваться
                    </Button>
                </span>

            </div>
            <div>
                <span className="text text_type_main-default text_color_inactive">Забыли пароль?</span>
                <Button type="secondary" size="large" onClick={() => navigateToForgotPassword()}>Восстановить пароль</Button>
            </div>
        </section>
    )
}

export default Login;
