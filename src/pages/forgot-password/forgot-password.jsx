import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useCallback } from 'react';
import styles from './forgot-password.module.css';
import { useHistory } from 'react-router-dom';
import { forgotPassword } from '../../utils/api';

const ForgotPassword = () => {
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

    const navigateToLogin = useCallback(
        () => {
            history.replace({ pathname: '/login' });
        },
        [history]
    );

    const resetHandle = () => {
        forgotPassword();
        history.replace({ pathname: '/reset-password' });
    }

    return (
        <section className={styles.forgotPasswordWrapper}>
            <h1>Восстановление пароля</h1>

            <div className={`${styles.forgotPasswordInput} mt-6 mb-6`}>
                <Input
                    type={'email'}
                    placeholder={'Укажите e-mail'}
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

            <Button type="primary" size="medium" onClick={() => resetHandle()}>Восстановить</Button>

            <div className="mb-4">
                <span className="text text_type_main-default text_color_inactive">Вспомнили пароль?</span>
                <Button type="secondary" size="large" onClick={() => navigateToLogin()}>Войти</Button>
            </div>
        </section>
    )
}

export default ForgotPassword;
