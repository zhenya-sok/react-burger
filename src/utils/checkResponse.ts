export const checkResponse = (res: Response) => {
    return res.ok ? res.json() : res.json().then((err: Response) => Promise.reject(err));
}
