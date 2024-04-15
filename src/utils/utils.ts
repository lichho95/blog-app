export const getQueryParams = () => {
  const retData: { [key: string]: string } = {};

  if (!window || !window.location || !window.location.search) {
    return retData;
  }

  const searchStr = window.location.search.split('?')[1];
  const getQueryParamObj = (eachQuery: string) => {
    const qDataArr = eachQuery.split('=');
    retData[qDataArr[0]] = decodeURI(qDataArr[1]);
  };

  if (searchStr.includes('&')) {
    const queryStr = searchStr.split('&');
    queryStr.forEach((eachQuery) => getQueryParamObj(eachQuery));
  } else {
    getQueryParamObj(searchStr);
  }

  return retData;
};

export const getSortObj = (activeSort: string | undefined) => {
  if (!activeSort) {
    return {
      sortVal: '',
      sortOrder: ''
    };
  }

  const activeParts = activeSort.split('-');
  const sortVal = activeParts[0];
  const sortOrder = activeParts[1];

  return {
    sortVal,
    sortOrder
  };
};

export const sortArray = <T>(list: T[], direction: string, property: keyof T): T[] => {
  const sortedList = [...list];

  return sortedList.sort((a, b) => {
    const aValue = a[property] as unknown;
    const bValue = b[property] as unknown;

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      if (direction === 'asc') return aValue - bValue;
      return bValue - aValue;
    } else if (typeof aValue === 'string' && typeof bValue === 'string') {
      if (isValidDate(aValue) && isValidDate(bValue)) {
        const dateA = new Date(aValue);
        const dateB = new Date(bValue);
        if (direction === 'asc') return dateA.getTime() - dateB.getTime();
        return dateB.getTime() - dateA.getTime();
      }
      if (direction === 'asc') return aValue.localeCompare(bValue);
      return bValue.localeCompare(aValue);
    }
    return 1
  });
};

const isValidDate = (str: string) => {
  // Regular expression to match the date format (YYYY-MM-DDTHH:MM:SS.MSZ)
  const dateFormatRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z$/;

  // Check if the string matches the date format
  if (!dateFormatRegex.test(str)) {
    return false;
  }

  // Try to create a Date object from the string
  const date = new Date(str);

  // Check if the date is valid
  return !isNaN(date.getTime());
};
