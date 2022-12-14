import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './reset-password.module.css';
import { Link, useLocation, Redirect } from 'react-router-dom';
import { resetPassword } from '../../utils/api';

const ResetPassword = () => {
    const location = useLocation();

    const [passwordValue, setPasswordValue] = React.useState('');
    const [textValue, setTextValue] = React.useState('');

    if (location.state) {
        return (
            <section className={styles.resetPasswordWrapper}>
                <h1>Восстановление пароля</h1>

                <form onSubmit={() => resetPassword(passwordValue, textValue)}>
                    <div className={`${styles.loginInput} mt-6 mb-6`}>
                        <Input
                            type={'password'}
                            placeholder={'Введите новый пароль'}
                            onChange={e => setPasswordValue(e.target.value)}
                            icon={'HideIcon'}
                            value={passwordValue}
                            name={'name'}
                            error={false}
                            errorText={'Ошибка'}
                            size={'default'}
                        />
                    </div>

                    <div className={`${styles.resetPasswordInput} mb-6`}>
                        <Input
                            type={'text'}
                            placeholder={'Введите код из письма'}
                            onChange={e => setTextValue(e.target.value)}
                            value={textValue}
                            name={'name'}
                            error={false}
                            errorText={'Ошибка'}
                            size={'default'}
                        />
                    </div>

                    <Button
                        htmlType="submit"
                        type="primary"
                        size="medium"
                        disabled={!passwordValue || !textValue}
                    >
                        Сохранить
                    </Button>
                </form>

                <div className="mt-20 mb-4">
                    <span className="text text_type_main-default text_color_inactive">Вспомнили пароль? </span>
                    <Link to="/login" className={styles.navigateBtn}>Войти</Link>
                </div>
            </section>
        )
    } else {
        return <Redirect to='/forgot-password' />
    }
}

export default ResetPassword;
