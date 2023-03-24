import React, {useState} from 'react';
import {Button, Modal, TextInput, Typography} from 'components';
import classes from './styles.module.scss';
import type {ModalProps} from 'components/Modal';
import {useTableContext} from 'components/Table/services/TableContext';
import {EMPTY_INPUT_ERROR} from '../constants';
import {TableRowItem} from 'components/Table/services/types';

const EditModal = <T, >(props: {row: T, changedField: keyof T} & ModalProps): JSX.Element => {
  const {row, changedField, handleClose} = props;
  const {
    tableActions: {
      mutateData,
    },
  } = useTableContext<T>();

  const [inputValue, setInputValue] = useState(row[changedField] as string);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleSave = () => {
    mutateData((data) => data.map((item) => {
      return {
        ...item,
        [changedField]: (item as TableRowItem).id === (row as TableRowItem).id ? inputValue : item[changedField],
      };
    }));
  };

  return (
    <Modal handleClose={handleClose}>
      <Typography variant='h1' className={classes.header}>
          Edit
      </Typography>

      <form className={classes.form}>
        <TextInput
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setError(undefined);
          }}
          className={classes.changeTitleInput}
          title='Name'
          error={error}
        />

        <Button
          type='submit'
          className={classes.saveButton}
          onClick={(e) => {
            e.preventDefault();

            if ((inputValue as string).replace(/\s+/g, ' ').trim().length === 0) {
              setError(EMPTY_INPUT_ERROR);
              return;
            };

            handleSave();
            handleClose();
          }}
        >
          Save
        </Button>
      </form>
    </Modal>
  );
};

export default EditModal;
