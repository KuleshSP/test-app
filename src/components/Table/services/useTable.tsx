import {useDebounce} from 'hooks/debounce';
import {useEffect, useState} from 'react';
import useSWR from 'swr';
import {instance} from '_services/axios';
import {TableContextType} from './TableContext';
import moment from 'moment';

const fetcher = (url: string) => instance.get(url).then((res) => res.data);

const useTable = <T, >(getSWRKey: (...args: any) => string): TableContextType<T> => {
  const [searchValue, setSearchValue] = useState('');
  const [searchFieldPath, setSearchFieldPath] = useState<unknown | undefined>(undefined);
  const debouncedSearchValue = useDebounce<string>(searchValue.replace(/\s+/g, ' ').trim(), 300);

  const [filterByField, setFilterByField] = useState<unknown | undefined>(undefined);
  const [filterByFieldPath, setFilterByFieldPath] = useState<unknown | undefined>(undefined);

  const [dateFilter, setDateFilter] = useState<{[key: string]: {from: string; to: string}} | undefined>(undefined);

  const handleChangeDateFilter = (value: string, path: string[]) => {
    const [columnKey, intervalKey] = path;

    setDateFilter(() => {
      if (dateFilter === undefined) return;

      return {...dateFilter, [columnKey]: {...dateFilter[columnKey], [intervalKey]: value}};
    });
  };

  const [filteredData, setFilteredData] = useState<T[]>([]);

  const {data, error, mutate, isLoading} = useSWR<T[]>(() => getSWRKey({debouncedSearchValue, filterByField, filterByFieldPath}), fetcher);

  const isDateFilterEmpty = dateFilter === undefined ? true : Object.entries(dateFilter).reduce((acc, curr) => {
    const [, value] = curr;
    return acc && !(Boolean(value.from) || Boolean(value.to));
  }, true);

  useEffect(() => {
    if (data === undefined || dateFilter === undefined) return;

    let copy = [...data];

    if (searchFieldPath !== undefined && !!debouncedSearchValue) {
      copy = copy.filter((item) => (item[searchFieldPath as keyof T] as string).includes(debouncedSearchValue));
    }
    if (filterByFieldPath !== undefined && filterByField !== undefined) {
      copy = copy.filter((item) => item[filterByFieldPath as keyof T] === filterByField);
    }

    if (isDateFilterEmpty !== true) {
      copy = copy.filter((item) => {
        const isValid = Object.entries(dateFilter).every((filter) => {
          const [key, value] = filter;

          const from = moment(value.from).isValid() ? moment(value.from) <= moment(item[key as keyof T] as string) : true;
          const to = moment(value.to).isValid() ? moment(item[key as keyof T] as string) <= moment(value.to) : true;
          return from && to;
        });

        return isValid;
      });
    }

    setFilteredData(copy);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchValue, filterByField, JSON.stringify(dateFilter)]);

  const mutateData = (cb: (data: T[]) => T[]) => {
    mutate(cb as unknown as T[], {revalidate: false});
  };

  const isFiltersActive = ((!!searchValue || (filterByField !== undefined) || !isDateFilterEmpty));

  return {
    items: (isFiltersActive ? filteredData : data) || [],
    isLoading,
    error,
    searchValue,
    filterByField,
    dateFilter,
    tableActions: {
      setSearchValue,
      setSearchFieldPath,
      setFilterByField,
      setFilterByFieldPath,
      setDateFilter,
      handleChangeDateFilter,
      mutateData,
    },
  };
};

export default useTable;
