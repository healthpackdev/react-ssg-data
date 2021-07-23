import { useEffect, useContext, useState, createContext } from 'react';
import { useLocation } from 'react-router-dom';
import { UrlToPath } from '@/lib/utils';
import { appMountId } from '@/client/constants';

export const DataContext = createContext<{ location?: string; data?: any }>({});
DataContext.displayName = 'DataContext';

const setAppVisibility = (display) => (document.getElementById(appMountId).style.display = display);

export const useRouteData = <IData = any>(): IData => {
  const __DATA__ = useContext(DataContext);
  const [data, setData] = useState(__DATA__.data);

  const location = useLocation();

  useEffect(() => {
    const locationPath = UrlToPath(location.pathname);

    const cache = window.__DATA_CACHE__[locationPath];
    if (cache) return setData(cache);
    setAppVisibility('none');
    fetch(`/static/data/${locationPath}.json`)
      .then((res) => res.json())
      .then((dataObject) => {
        if (!cache) window.__DATA_CACHE__[locationPath] = dataObject;

        setData(dataObject);
        setAppVisibility('block');
      });
  }, [location]);
  if (location.pathname === __DATA__.location) {
    return __DATA__.data;
  } else {
    return data;
  }
};
