import { useEffect, useContext, useState, createContext } from 'react';
import { useLocation } from 'react-router-dom';
import { UrlToPath } from '@/lib/utils';
import { appMountId } from '@/client/constants';

export const DataContext = createContext<{ location?: string; data?: any }>({});
DataContext.displayName = 'DataContext';

// set display to better UX
const setAppVisibility = (display) => (document.getElementById(appMountId).style.display = display);

export const useRouteData = <IData = any>(): IData => {
  // useContext comes from client and server.
  const __DATA__ = useContext(DataContext);

  // by default set data to __DATA__.data
  const [data, setData] = useState(__DATA__.data);

  const location = useLocation();

  useEffect(() => {
    const locationPath = UrlToPath(location.pathname);

    // prevent rendering twice
    if (data == __DATA__.data) return;

    // if location change get data from static json or use cache.
    if (location.pathname !== __DATA__.location) {
      const cache = window.__DATA_CACHE__[locationPath];
      // if cache exists use it
      if (cache) return setData(cache);

      setAppVisibility('none');

      // send request to /static/data/page_path.json
      fetch(`/static/data/${locationPath}.json`)
        .then((res) => res.json())
        .then((dataObject) => {
          // if cache is empty, set  location's cache.
          if (!cache) window.__DATA_CACHE__[locationPath] = dataObject;

          setData(dataObject);
          setAppVisibility('block');
        });
    }
  }, [location]);

  // if location same with __DATA__.location use __DATA__.data instead of state.
  if (location.pathname === __DATA__.location) {
    return __DATA__.data;
  } else {
    return data;
  }
};
