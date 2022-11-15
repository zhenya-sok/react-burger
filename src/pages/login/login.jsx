import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect } from 'react';
import styles from './login.module.css';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../services/actions/authActions';

const Login = () => {
    const [emailValue, setEmailValue] = React.useState('')

    const [passwordValue, setPasswordValue] = React.useState('');

    const onPasswordChange = e => {
        setPasswordValue(e.target.value)
    }

    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    const isAuth = useSelector((state) => !!state.authReducer.token);
    
    useEffect(() => {
        isAuth && history.replace({pathname: `${location.state}`});
    }, [isAuth])

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(login({
            email: emailValue,
            password: passwordValue
        }))
    }
    
    return (
        <section className={styles.loginWrapper}>
            <h1>Вход</h1>

            <form onSubmit={handleSubmit}>
                <div className={`${styles.loginInput} mt-6 mb-6`}>
                    <Input
                        type={'email'}
                        placeholder={'E-mail'}
                        onChange={e => setEmailValue(e.target.value)}
                        value={emailValue}
                        name={'name'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="ml-1"
                    />
                </div>

                <div className={`${styles.loginInput} mb-6`}>
                    <PasswordInput
                        onChange={onPasswordChange}
                        value={passwordValue}
                        name={'password'}
                        extraClass="mb-2"
                    />
                </div>

                <Button htmlType="submit" 
                    type="primary" 
                    size="medium" 
                    disabled={!emailValue || !passwordValue}>
                    Войти
                </Button>
            </form>

            <div className="mt-20 mb-4">
                <span className="text text_type_main-default text_color_inactive">Вы новый пользователь? </span>
                <Link to='/register' className={styles.navigateBtn}>
                    Зарегестрироваться
                </Link>
            </div>
            <div>
                <span className="text text_type_main-default text_color_inactive">Забыли пароль? </span>
                <Link to="/forgot-password" className={styles.navigateBtn}>
                    Восстановить пароль
                </Link>
            </div>
        </section>
    )
}

export default Login;
