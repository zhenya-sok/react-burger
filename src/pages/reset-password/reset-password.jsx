import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useCallback } from 'react';
import styles from './reset-password.module.css';
import { useHistory } from 'react-router-dom';
import { resetPassword } from '../../utils/api';

const ResetPassword = () => {
    const [value, setValue] = React.useState('')
    const passwordInputRef = React.useRef(null)
    const onPasswordIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        alert('Icon Click Callback')
    }

    const [emailValue, setEmailValue] = React.useState('')
    const inputRef = React.useRef(null)
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        alert('Icon Click Callback')
    }

    const history = useHistory();

    const navigateToLogin = useCallback(
        () => {
            history.replace({ pathname: '/login' });
        },
        [history]
    );

    const resetHandle = () => {
        resetPassword();
    }

    return (
        <section className={styles.resetPasswordWrapper}>
            <h1>Восстановление пароля</h1>

            <div className={`${styles.loginInput} mt-6 mb-6`}>
                <Input
                    type={'password'}
                    placeholder={'Введите новый пароль'}
                    onChange={e => setValue(e.target.value)}
                    icon={'HideIcon'}
                    value={value}
                    name={'name'}
                    error={false}
                    ref={passwordInputRef}
                    onIconClick={onPasswordIconClick}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                />
            </div>

            <div className={`${styles.resetPasswordInput} mb-6`}>
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
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

            <Button type="primary" size="medium" onClick={() => resetHandle()}>Сохранить</Button>

            <div className="mb-4">
                <span className="text text_type_main-default text_color_inactive">Вспомнили пароль?</span>
                <Button type="secondary" size="large" onClick={() => navigateToLogin()}>Войти</Button>
            </div>
        </section>
    )
}

export default ResetPassword;
