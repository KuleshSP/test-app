import {DropDownProps} from 'components/Dropdown';
import {ComponentBaseProps} from 'types/components';

export type TableRowItem = {id: number} & {[key: string]: string | number | boolean}
export type TableProps<T> = {
  headerRenderer: () => JSX.Element;
  tableRowRenderer: (item: T) => JSX.Element;
} & ComponentBaseProps;
export type TableRowProps = React.PropsWithChildren;
export type TableCellProps = React.PropsWithChildren & ComponentBaseProps & {colSpan?: number};
export type TableHeaderCellProps = React.PropsWithChildren;
export type TableHeaderProps = React.PropsWithChildren;
export type TableBodyProps = React.PropsWithChildren;
export type TableToolbarType = React.PropsWithChildren & ComponentBaseProps;
export type TableSearchProps<T> = {
  searchByField: keyof T;
}
export type TableFilterType<T> = {filterByField: keyof T} & Pick<DropDownProps, 'options' | 'placeholder'>;
export type TableDateFilterType<T> = {filterByDateFields: {id: (keyof T); title: string}[];}
