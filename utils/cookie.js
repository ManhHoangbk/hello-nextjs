import cookie from 'js-cookie';

export const TOKEN = 'token'

export const setCookie = (key, value) => {
    if (process.browser) {
      console.log('process.browser ', key , ' value ', value)
      cookie.set(key, value, {
        expires: 1,
        path: '/'
      });
    }
};

export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1
    });
  }
};

export const getCookie = (key, req) => {
  let x = process.browser
  ? getCookieFromBrowser(key)
  : getCookieFromServer(key, req)
  return x;
};

const getCookieFromBrowser = key => {
  return cookie.get(key);
};

const getCookieFromServer = (key, req) => {
  if (!req.headers || !req.headers.cookie) {
    return undefined;
  }
  const rawCookie = req.headers.cookie
    .split(';')
    .find(c => c.trim().startsWith(`${key}=`));
  if (!rawCookie) {
    return undefined;
  }
  return rawCookie.split('=')[1]
};