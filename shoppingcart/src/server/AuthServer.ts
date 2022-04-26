import ActionBase from './ActionBase';

const actionBase = ActionBase.getInstance();

export const loginAuth = async (user: any): Promise<any> => {
    const result = await actionBase.post<any>('/account/login', user);
    return result;
};

export const logoutAuth = async () => {
    await actionBase.post<any>('/logout/');
};