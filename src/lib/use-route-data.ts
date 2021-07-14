import { useEffect, useContext, useState, createContext } from 'react';
import { useLocation } from 'react-router-dom';
import serialize from 'serialize-javascript';
import { UrlToPath } from '../server/routes/utils';

export const DataContext = createContext<{ chunk_name?: string; data?: any }>({});
DataContext.displayName = 'DataContext';

export const useRouteData = () => {
  const [data, setData] = useState(useContext(DataContext).data);
  const location = useLocation();
  useEffect(() => {
    console.log(location);
    if (window.STATIC_DATA.page_href !== location.pathname) {
      document.body.style.display = 'none';
      fetch(`/static/data/${UrlToPath(location.pathname)}.txt`)
        .then((res) => res.text())
        .then((dataObject) => {
          setData(JSON.parse(serialize(dataObject)));
          document.body.style.display = 'block';
        });
    }
  }, [location]);
  return data;
};

export const staticData = (location: string, data: any) => ({ page_href: location, data });
