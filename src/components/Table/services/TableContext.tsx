import {createContext, Dispatch, SetStateAction, useContext} from 'react';

export type TableContextType<T> = {
  items: T[];
  isLoading: boolean;
  error: any;
  searchValue: string;
  filterByField: unknown | undefined;
  dateFilter: {[key: string]: {from: string; to: string}} | undefined;
  tableActions: {
    setSearchValue: (value: string) => void;
    setSearchFieldPath: Dispatch<SetStateAction<unknown | undefined>>;
    setFilterByField: (value?: unknown) => void;
    setFilterByFieldPath: Dispatch<SetStateAction<unknown | undefined>>;
    mutateData: (cb: (data: T[]) =>T[]) => void;
    setDateFilter: (value: {[key: string]: {from: string; to: string}} | undefined) => void;
    handleChangeDateFilter: (value: string, path: string[]) => void;
  };
};
const TableContext = createContext<TableContextType<any>>(undefined as any);

export function useTableContext<T>() {
  const context = useContext<TableContextType<T>>(TableContext);
  if (context === undefined) {
    throw new Error('useTableContext must be within Provider');
  }

  return context;
}

export default TableContext;
