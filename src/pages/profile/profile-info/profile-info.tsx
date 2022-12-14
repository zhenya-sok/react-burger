import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC, useEffect } from 'react';
import styles from './profile-info.module.css';
import { getUser, updateUser } from '../../../services/actions/authActions';
import { useDispatch, useSelector } from '../../../utils/hooks/hooks';

const ProfileInfo: FC = () => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.authReducer.user);

    const [nameValue, setNameValue] = React.useState('');
    const [emailValue, setEmailValue] = React.useState('');
    const [passwordValue, setPasswordValue] = React.useState('');

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch])

    useEffect(() => {
        if (!user) return
        setNameValue(user.name);
        setEmailValue(user.email);
    }, [user])

    const cancelСhanges = () => {
        user && setNameValue(user.name);
        user && setEmailValue(user.email);
    }

    const saveNewUserData: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        dispatch(updateUser({
            name: nameValue,
            email: emailValue
        }));
    }

    return (
        <form onSubmit={saveNewUserData} className={styles.profileInfoWrapper}>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={e => setNameValue(e.target.value)}
                icon={'EditIcon'}
                value={nameValue}
                name={'name'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
            />

            <Input
                type={'text'}
                placeholder={'Логин'}
                onChange={e => setEmailValue(e.target.value)}
                icon={'EditIcon'}
                value={emailValue}
                name={'name'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
            />

            <Input
                type={'text'}
                placeholder={'Пароль'}
                onChange={e => setPasswordValue(e.target.value)}
                icon={'EditIcon'}
                value={passwordValue}
                name={'name'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
            />

            {((user && user.name) !== nameValue || (user && user.email) !== emailValue) &&
                <div className={styles.buttonsBlock}>
                    <div className={styles.cancelBtn}>
                        <Button htmlType="reset" type="secondary" size="medium" onClick={() => cancelСhanges()}>
                            Отмена
                        </Button>
                    </div>
                    <Button htmlType="submit" type="primary" size="medium">
                        Сохранить
                    </Button>
                </div>
            }
        </form>
    )
}

export default ProfileInfo;
