import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC } from 'react';
import styles from './forgot-password.module.css';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { forgotPassword } from '../../utils/api';

const ForgotPassword: FC = () => {
    const [emailValue, setEmailValue] = React.useState('');

    const history = useHistory();
    const location = useLocation();

    const resetHandle = (email: string) => {
        forgotPassword(email);
        history.replace({ pathname: "/reset-password", state: { background: `${location.pathname}` } });
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
                    errorText={'Ошибка'}
                    size={'default'}
                />
            </div>

            <Button
                htmlType="button"
                type="primary"
                size="medium"
                disabled={!emailValue}
                onClick={() => resetHandle(emailValue)}>
                Восстановить
            </Button>

            <div className="mt-20 mb-4">
                <span className="text text_type_main-default text_color_inactive">Вспомнили пароль? </span>
                <Link to="/login" className={styles.navigateBtn}>Войти</Link>
            </div>
        </section>
    )
}

export default ForgotPassword;
