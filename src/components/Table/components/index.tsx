import React, {useEffect, useState} from 'react';
import {useTableContext} from '../services/TableContext';
import cx from 'classnames';
import classes from './styles.module.scss';
import TextInput from 'components/TextInput';
import {ISearch, IFilter} from 'icons';
import Typography from 'components/Typography';
import Dropdown from 'components/Dropdown';
import type {
  TableProps,
  TableRowProps,
  TableCellProps,
  TableHeaderCellProps,
  TableHeaderProps,
  TableBodyProps,
  TableToolbarType,
  TableSearchProps,
  TableFilterType,
  TableRowItem,
  TableDateFilterType,
} from '../services/types';
import Button from 'components/Button';
import Backdrop from 'components/Backdrop';
import moment from 'moment';
import ErrorMessage from 'components/ErrorMessage';

const Table = <T, >(props: TableProps<T>): JSX.Element => {
  const {
    className,
    headerRenderer,
    tableRowRenderer,
  } = props;
  const {items, isLoading, error} = useTableContext<T>();

  if (error) {
    return (
      <Typography>Error</Typography>
    );
  }

  return (
    <table className={cx(classes.table, className)}>
      <TableHead>
        <TableRow>
          {headerRenderer()}
        </TableRow>
      </TableHead>

      <TableBody>
        {items && (
          <>
            {isLoading === false && items.length === 0 ?
             (<TableRow>
               <TableCell className={classes.noItemsMessage} colSpan={10}>
                  There is no items
               </TableCell>
             </TableRow>) :
              (<>
                {items.map((item) => {
                  return (
                    <TableRow key={(item as TableRowItem).id}>
                      {tableRowRenderer(item)}
                    </TableRow>
                  );
                })}
              </>)}
          </>
        )}
      </TableBody>
    </table>
  );
};

const TableRow = (props: TableRowProps) => {
  const {children} = props;

  return (
    <tr>{children}</tr>
  );
};

const TableCell = (props: TableCellProps) => {
  const {colSpan, children, className} = props;

  return (
    <td className={className} colSpan={colSpan}>
      {typeof children === 'string' ?
       (<Typography>{children}</Typography>) :
       <>{children}</>
      }
    </td>
  );
};

const TableHeaderCell = (props: TableHeaderCellProps) => {
  const {children} = props;

  return (
    <td>
      <Typography variant='h6'>
        {children}
      </Typography>
    </td>
  );
};

const TableHead = (props: TableHeaderProps) => {
  const {children} = props;

  return (
    <thead>{children}</thead>
  );
};

const TableBody = (props: TableBodyProps) => {
  const {children} = props;

  return (
    <tbody>{children}</tbody>
  );
};


const TableToolbar = (props: TableToolbarType) => {
  const {children, className} = props;

  return (
    <div className={cx(classes.tableToolbar, className)}>
      {children}
    </div>
  );
};


const TableSearch = <T, >(props: TableSearchProps<T>) => {
  const {searchByField} = props;
  const {
    searchValue,
    tableActions: {
      setSearchValue,
      setSearchFieldPath,
    },
  } = useTableContext<T>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setSearchFieldPath(searchByField), []);

  return (
    <TextInput
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      icon={<ISearch/>}
    />
  );
};

const TableFilter = <T, >(props: TableFilterType<T>) => {
  const {filterByField, options, placeholder} = props;
  const {
    filterByField: currentValue,
    tableActions: {
      setFilterByField,
      setFilterByFieldPath,
    },
  } = useTableContext<T>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setFilterByFieldPath(filterByField), []);

  return (
    <Dropdown
      className={classes.dropdown}
      currentValue={currentValue}
      handleChange={setFilterByField}
      options={options}
      placeholder={placeholder}
    />
  );
};

const TableDateFilter = <T, >(props: TableDateFilterType<T>) => {
  const {filterByDateFields} = props;
  const {
    dateFilter,
    tableActions: {
      setDateFilter,
      handleChangeDateFilter,
    },
  } = useTableContext<T>();

  const [isDateFilterOpened, toggleDateFilter] = useState(false);
  const filters = filterByDateFields.reduce((acc, curr) => ({...acc, [curr.id]: {from: '', to: ''}}), {});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setDateFilter(filters), []);

  const initialFilterErrors = filterByDateFields.reduce((acc, curr) => ({...acc, [curr.id]: false}), {});
  const [dateFilterError, setFilterError] = useState<{[key: string]: boolean}>(initialFilterErrors);

  useEffect(() => {
    if (!dateFilter) return;
    const _dateFilterError = Object.entries(dateFilter).reduce((acc, item) => {
      const [key, value] = item;

      return {
        ...acc,
        [key]: (moment(value.from) > moment(value.to))};
    }, {});

    setFilterError(_dateFilterError);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(dateFilter)]);

  return (
    <div className={classes.dateFilterBox}>
      {isDateFilterOpened && <Backdrop className={classes.dateFilterBackdrop} handleClick={() => toggleDateFilter(false)} />}
      <Button onClick={() => toggleDateFilter((prev) => !prev)} className={classes.dateFilterButton}>
        <IFilter className={classes.filterIcon}/>
        <Typography>
          Filter
        </Typography>
      </Button>

      <div className={cx(classes.dateFilterModal, {
        [classes.dateFilterModalOpened]: isDateFilterOpened,
      })}>
        {filterByDateFields.map((item) => {
          return (
            <div className={classes.dateFilterItemBox} key={item.id as string}>
              <div className={classes.dateFilterInputsBox}>
                <Typography className={classes.dateFilterItemTitle}>
                  {item.title}
                </Typography>
                <TextInput
                  value={dateFilter && dateFilter[item.id as string].from || ''}
                  onChange={(e) => {
                    setFilterError(initialFilterErrors);
                    handleChangeDateFilter(e.target.value, [item.id as string, 'from']);
                  }}
                  className={dateFilterError[item.id as string] ? classes.dateFilterInputError : ''}
                  type='date'
                  title='From'
                />
                <TextInput
                  value={dateFilter && dateFilter[item.id as string].to || ''}
                  onChange={(e) => {
                    setFilterError(initialFilterErrors);
                    handleChangeDateFilter(e.target.value, [item.id as string, 'to']);
                  }}
                  className={dateFilterError[item.id as string] ? classes.dateFilterInputError : ''}
                  type='date'
                  title='To'
                />
              </div>
              <ErrorMessage className={classes.filterErrorMessage}>
                {dateFilterError[item.id as string] && 'Date error'}
              </ErrorMessage>
            </div>
          );
        })}
        <Button onClick={() => setDateFilter(filters)} className={classes.resetDateFilter}>
          Reset
        </Button>
      </div>
    </div>
  );
};

const TableComponents = {
  Table,
  TableRow,
  TableCell,
  TableHeaderCell,
  TableHead,
  TableBody,
  TableToolbar,
  TableSearch,
  TableFilter,
  TableDateFilter,
};

export default TableComponents;
