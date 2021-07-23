// / to index - /profile to profile
export const UrlToPath = (pathname: string) => {
  return pathname === '/' ? 'index' : pathname.slice(1);
};

// generate a chunkName.
export const chunkName = (chunk: string) => {
  return chunk.replace(/[^a-zA-Z0-9_!§$()=\-^°]+/g, '-');
};
