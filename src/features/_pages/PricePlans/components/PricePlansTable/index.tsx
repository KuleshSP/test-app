import {Button} from 'components';
import {TableComponents} from 'components';
import DocumentsTable from 'features/DocumentsTable';
import classes from 'styles/PricePlans.module.scss';
import moment from 'moment';

const {TableHeaderCell, TableCell} = TableComponents;

export type RowType = {
  id: number;
  description: string;
  active: boolean;
  createdAt: string;
  removedAt: string;
};
export type RenderPagesRowProps = {
  item: RowType;
  cellProps: {
    setEditModalItem: (id: RowType | undefined) => void;
  }
};

export const HEADERS_LIST = [
  {id: 'description', title: 'Description'},
  {id: 'active', title: 'Status'},
  {id: 'createdAt', title: 'Created'},
  {id: 'removedAt', title: 'Removed'},
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


const renderTableRow = (props: RenderPagesRowProps) => {
  const {
    item: {
      description,
      active,
      createdAt,
      removedAt,
    },
    cellProps: {
      setEditModalItem,
    },
  } = props;

  return (
    <>
      <TableCell>
        {description}
      </TableCell>
      <TableCell>
        {active ? 'Active' : 'Inactive'}
      </TableCell>
      <TableCell>
        {moment(createdAt).format('L, HH:mm')}
      </TableCell>
      <TableCell>
        {moment(removedAt).format('L, HH:mm')}
      </TableCell>
      <TableCell>
        <Button onClick={() => setEditModalItem(props.item)}>
          Edit
        </Button>
      </TableCell>
    </>
  );
};

export default function PricePlansTable() {
  return (
    <DocumentsTable<RowType>
      className={classes.table}
      documentType='pricePlans'
      renderHeaderRow={renderHeaderRow}
      renderTableRow={renderTableRow}
      searchByField='description'
      filterByField='active'
      changedField='description'
      filterByDateFields={[{id: 'createdAt', title: 'Created'}, {id: 'removedAt', title: 'Removed'}]}
    />
  );
}
