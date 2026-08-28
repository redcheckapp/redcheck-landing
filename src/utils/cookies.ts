export const setSharedCookie = (name, value) => {
    document.cookie = `${name}=${value}; domain=.redcheckapp.com; path=/; max-age=31536000; SameSite=Lax`;
};

export const getSharedCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
};