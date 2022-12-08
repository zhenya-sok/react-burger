export interface IUserData {
    email: string;
    password: string;
    name: string;
    user: IUserData;
    accessToken?: string;
}

export interface IUserLogin {
    email: string;
    password: string;
}

export interface IUser {
    name: string;
    email: string;
}

export interface IRegisrerUser {
    email: string;
    password: string;
    name: string;
    user?: IUser;
    accessToken?: string;
}

export interface ITest {
    email: string;
    password: string;
    name: string;
}
