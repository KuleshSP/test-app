import {Button, Paper} from 'components';
import {TableComponents} from 'components';
import DocumentsTable from 'features/DocumentsTable';
import classes from 'styles/Pages.module.scss';
import moment from 'moment';

const {TableHeaderCell, TableCell} = TableComponents;

export type RowType = {
  id: number;
  title: string;
  active: boolean;
  updatedAt: string;
  publishedAt: string;
};
export type RenderPagesRowProps = {
  item: RowType;
  cellProps: {
    setEditModalItem: (id: RowType | undefined) => void;
  }
};

export const HEADERS_LIST = [
  {id: 'title', title: 'Title'},
  {id: 'active', title: 'Status'},
  {id: 'updatedAt', title: 'Updated'},
  {id: 'publishedAt', title: 'Published'},
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
      title,
      active,
      updatedAt,
      publishedAt,
    },
    cellProps: {
      setEditModalItem,
    },
  } = props;

  return (
    <>
      <TableCell>
        {title}
      </TableCell>
      <TableCell>
        {active ? 'Active' : 'Inactive'}
      </TableCell>
      <TableCell>
        {moment(updatedAt).format('L, HH:mm')}
      </TableCell>
      <TableCell>
        {moment(publishedAt).format('L, HH:mm')}
      </TableCell>
      <TableCell>
        <Button onClick={() => setEditModalItem(props.item)}>
          Edit
        </Button>
      </TableCell>
    </>
  );
};

export default function Home() {
  return (
    <Paper>
      <DocumentsTable<RowType>
        className={classes.table}
        documentType='pages'
        renderHeaderRow={renderHeaderRow}
        renderTableRow={renderTableRow}
        searchByField='title'
        filterByField='active'
        changedField='title'
        filterByDateFields={[{id: 'updatedAt', title: 'Updated'}, {id: 'publishedAt', title: 'Published'}]}
      />
    </Paper>
  );
}
