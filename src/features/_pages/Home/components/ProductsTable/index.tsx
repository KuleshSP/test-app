import {Button} from 'components';
import {TableComponents} from 'components';
import DocumentsTable from 'features/DocumentsTable';
import moment from 'moment';
import classes from './styles.module.scss';

const {TableHeaderCell, TableCell} = TableComponents;

export type RowType = {id: number; name: string; active: boolean; createdAt: string};
export type RenderRowProps = {
  item: RowType;
  cellProps: {
    setEditModalItem: (row: RowType | undefined) => void;
  }
};

export const HEADERS_LIST = [
  {id: 'name', title: 'Name'},
  {id: 'active', title: 'Status'},
  {id: 'createdAt', title: 'Created'},
  {id: 'edit', title: ''},
];

const renderHeaderRow = () => {
  return (
    <>
      {HEADERS_LIST.map((item) => {
        return (
          <TableHeaderCell key={item.id}>
            {item.title}
          </TableHeaderCell>
        );
      })}
    </>
  );
};

const renderTableRow = (props: RenderRowProps) => {
  const {
    item: {
      name,
      active,
      createdAt,
    },
    cellProps: {
      setEditModalItem,
    },
  } = props;

  return (
    <>
      <TableCell className={classes.nameColumn}>
        {name}
      </TableCell>
      <TableCell>
        {active ? 'Active' : 'Inactive'}
      </TableCell>
      <TableCell>
        {moment(createdAt).format('L, HH:mm')}
      </TableCell>
      <TableCell>
        <Button onClick={() => setEditModalItem(props.item)}>
          Edit
        </Button>
      </TableCell>
    </>
  );
};

export default function ProductsTable() {
  return (
    <DocumentsTable<RowType>
      className={classes.table}
      documentType='products'
      renderHeaderRow={renderHeaderRow}
      renderTableRow={renderTableRow}
      searchByField='name'
      filterByField='active'
      changedField='name'
      filterByDateFields={[{id: 'createdAt', title: 'Created'}]}
    />
  );
}
