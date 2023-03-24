import TableContext, {} from './TableContext';
import useTable from './useTable';

type TableProviderProps = {
  getSWRKey: (...args: any) => string
} & React.PropsWithChildren;

const TableProvider = <T, >(props: TableProviderProps) => {
  const {children, getSWRKey} = props;

  const tableData = useTable<T>(getSWRKey);

  return (
    <TableContext.Provider value={tableData}>
      {children}
    </TableContext.Provider>
  );
};

export default TableProvider;
