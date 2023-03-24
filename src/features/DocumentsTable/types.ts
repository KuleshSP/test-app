import {ComponentBaseProps} from 'types/components';

export type RenderRowProps<T> = {
  item: T;
  cellProps: {
    setEditModalItem: (row: T | undefined) => void;
  }
};
export type DocumentsTableProps<T> = {
  documentType: 'products' | 'pricePlans' | 'pages';
  renderHeaderRow: () => JSX.Element;
  renderTableRow: (props: RenderRowProps<T>) => JSX.Element;
  searchByField: keyof T;
  filterByField: keyof T;
  changedField: keyof T;
  filterByDateFields: {id: (keyof T); title: string}[];
} & ComponentBaseProps;
