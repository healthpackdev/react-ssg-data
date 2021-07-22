import { useEffect, useContext, useState, createContext } from 'react';
import { useLocation } from 'react-router-dom';
import { UrlToPath } from '@/lib/utils';
import { appMountId } from '@/client/constants';

export const DataContext = createContext<{ data?: any }>({});
DataContext.displayName = 'DataContext';

const setAppVisibility = (display) => (document.getElementById(appMountId).style.display = display);

export const useRouteData = () => {
  const [data, setData] = useState(useContext(DataContext).data);
  const location = useLocation();
  useEffect(() => {
    const locationPath = UrlToPath(location.pathname);

    if (window.__DATA__.page_href !== location.pathname) {
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
    }
  }, [location]);
  return data;
};
