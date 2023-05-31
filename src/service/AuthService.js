export function getUser() {
    const user = sessionStorage.getItem('user');
    if (!user || user === 'undefined')
        return null;
    else
        return JSON.parse(user);
}
export function getToken() {
    return sessionStorage.getItem('token');
}
export function setUserSession(user, token) {
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('token', token);
}
export function resetUserSession() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
}