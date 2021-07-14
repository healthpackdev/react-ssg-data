export const UrlToPath = (pathname: string) => {
  return pathname === '/' ? 'index' : pathname.slice(1);
};
