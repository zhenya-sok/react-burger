import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './register.module.css';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../services/actions/authActions';

const Register = () => {
    const [nameValue, setNameValue] = React.useState('');
    const [emailValue, setEmailValue] = React.useState('');
    const [passwordValue, setPasswordValue] = React.useState('');

    const dispatch = useDispatch();
    const history = useHistory();

    const onPasswordChange = e => {
        setPasswordValue(e.target.value)
    }

    const registerUser = () => {
        dispatch(register({
            email: emailValue,
            password: passwordValue,
            name: nameValue
        }))
        history.replace({ pathname: "/" });
    }

    return (
        <section className={styles.registerWrapper}>
            <h1>Регистрация</h1>
            <div className={`${styles.registerInput} mt-6 mb-6`}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => setNameValue(e.target.value)}
                    value={nameValue}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                />
            </div>

            <div className={`${styles.registerInput} mb-6`}>
                <Input
                    type={'email'}
                    placeholder={'E-mail'}
                    onChange={e => setEmailValue(e.target.value)}
                    value={emailValue}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                />
            </div>

            <div className={`${styles.registerInput} mb-6`}>
                <PasswordInput
                    onChange={onPasswordChange}
                    value={passwordValue}
                    name={'password'}
                    extraClass="mb-2"
                />
            </div>

            <Button 
                type="primary"
                size="medium"
                disabled={!emailValue || !passwordValue || !passwordValue}
                onClick={() => registerUser()}>
                Зарегестрироваться
            </Button>

            <div className="mt-20 mb-4">
                <span className="text text_type_main-default text_color_inactive">Уже зарегестрированы? </span>
                <Link to="/login" className={styles.navigateBtn}>Войти</Link>
            </div>
        </section>
    )
}

export default Register;
