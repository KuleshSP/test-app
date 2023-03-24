import {TableComponents} from 'components';
import TableProvider from 'components/Table/services/TableProvider';
import {useState} from 'react';
import {FILTER_LIST, SWR_KEYS} from './constants';
import EditModal from './EditModal';
import type {DocumentsTableProps} from './types';

const {TableToolbar, TableSearch, TableFilter, TableDateFilter, Table} = TableComponents;

const DocumentsTable = <T, >(props: DocumentsTableProps<T>) => {
  const {className, documentType, renderHeaderRow, renderTableRow, searchByField, filterByField, changedField, filterByDateFields} = props;
  const [editModalItem, setEditModalItem] = useState<T | undefined>(undefined);

  return (
    <TableProvider<T>
      getSWRKey={() => SWR_KEYS[documentType]}
    >
      <TableToolbar>
        <TableSearch<T> searchByField={searchByField} />
        <TableFilter<T> filterByField={filterByField} options={FILTER_LIST} placeholder='All'/>
        <TableDateFilter<T> filterByDateFields={filterByDateFields} />
      </TableToolbar>

      <Table
        className={className}
        headerRenderer={renderHeaderRow}
        tableRowRenderer={(item: T) => renderTableRow({item, cellProps: {setEditModalItem}})}
      />

      {editModalItem && (
        <EditModal<T>
          row={editModalItem}
          changedField={changedField}
          handleClose={() => setEditModalItem(undefined)}
        />
      )}
    </TableProvider>
  );
};

export default DocumentsTable;
