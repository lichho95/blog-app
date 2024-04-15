import { useNavigate, useLocation } from 'react-router-dom';
import { getQueryParams } from '../../utils/utils';

const usePersistenceUrl = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = getQueryParams();

  const setUrlParam = (obj: { [key: string]: string }) => {
    let urlString = '';
    Object.keys(obj).forEach((key, index) => {
      if (index !== 0) urlString += '&';
      urlString += `${key}=${encodeURI(obj[key])}`;
    });
    if (navigate && location) {
      const newUrl = `?${urlString}`;
      if (newUrl !== location.search) {
        navigate(newUrl);
      }
    }
  };

  const changeParams = (obj: { [key: string]: string }) => {
    const params = Object.assign({}, getQueryParams(), obj);
    setUrlParam(params);
  };
  return { urlParams, changeParams };
};

export default usePersistenceUrl;
