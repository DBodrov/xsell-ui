const memo = {
  url: '',
  cache: {},
};

export function getUrlParamByName(name: string) {
  return getUrlParams()[name];
}

export function getUrlParams() {
  if (memo.url === window.location.search) {
    return memo.cache;
  }

  memo.url = window.location.search;
  memo.cache = {};

  memo.url
    .substr(1)
    .split('&')
    .forEach((item) => {
      const [key, value] = item.split('=');
      memo.cache[key] = value === undefined ? null : decodeURIComponent(value);
    });

  return memo.cache;
}
