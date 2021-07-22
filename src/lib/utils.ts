export const UrlToPath = (pathname: string) => {
  if (!pathname) return pathname;
  return pathname === '/' ? 'index' : pathname.slice(1);
};

export const chunkName = (chunk: string) => {
  return chunk.replace(/[^a-zA-Z0-9_!§$()=\-^°]+/g, '-');
};
