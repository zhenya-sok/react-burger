import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useCallback } from 'react';
import styles from './register.module.css';
import { useHistory } from 'react-router-dom';

const Register = () => {

    const [value, setValue] = React.useState('');
    const onChange = e => {
        setValue(e.target.value)
    }

    const [inputValue, setInputValue] = React.useState('')
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

    return (
        <section className={styles.registerWrapper}>
            <h1>Регистрация</h1>
            <div className={`${styles.registerInput} mt-6 mb-6`}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => setInputValue(e.target.value)}
                    value={inputValue}
                    name={'name'}
                    error={false}
                    ref={inputRef}
                    onIconClick={onIconClick}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                />
            </div>

            <div className={`${styles.registerInput} mb-6`}>
                <Input
                    type={'email'}
                    placeholder={'E-mail'}
                    onChange={e => setInputValue(e.target.value)}
                    value={inputValue}
                    name={'name'}
                    error={false}
                    ref={inputRef}
                    onIconClick={onIconClick}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                />
            </div>

            <div className={`${styles.registerInput} mb-6`}>
                <PasswordInput
                    onChange={onChange}
                    value={value}
                    name={'password'}
                    extraClass="mb-2"
                />
            </div>

            <Button type="primary" size="medium">Зарегестрироваться</Button>

            <div className="mb-4">
                <span className="text text_type_main-default text_color_inactive">Уже зарегестрированы?</span>
                <Button type="secondary" size="large" onClick={() => navigateToLogin()}>Войти</Button>
            </div>
        </section>
    )
}

export default Register;
