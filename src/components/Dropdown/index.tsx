import React, {useState} from 'react';
import cx from 'classnames';
import {ComponentBaseProps} from 'types/components';
import classes from './styles.module.scss';
import {IArrow, ITimes} from 'icons';
import ButtonIcon from 'components/ButtonIcon';
import Typography from 'components/Typography';
import Backdrop from 'components/Backdrop';

export type DropDownProps = {
  currentValue?: unknown;
  options: {value?: unknown; title: string}[];
  handleChange: (value?: unknown) => void;
  placeholder?: string;
} & ComponentBaseProps;

const Dropdown = (props: DropDownProps): JSX.Element => {
  const {className, currentValue, options, handleChange, placeholder} = props;
  const [isDropdownOpened, toggleDropdown] = useState(false);

  const _options = [{value: undefined, title: placeholder}, ...options];

  return (
    <div className={cx(classes.container, className)}>
      {isDropdownOpened && <Backdrop className={classes.backdrop} handleClick={() => toggleDropdown(false)} />}

      <Typography>
        {currentValue !== undefined ? _options.find((item) => item.value === currentValue)?.title : placeholder}
      </Typography>

      <div className={classes.iconBox}>
        <ButtonIcon
          className={cx(classes.timesIcon, {[classes.timesIconButtonHidden]: currentValue === undefined})}
          handleClick={() => handleChange(undefined)}
          icon={<ITimes />}
        />
        <ButtonIcon
          className={classes.arrowButton}
          handleClick={() => toggleDropdown((prevState) => !prevState)}
          icon={
            <IArrow
              className={cx(classes.arrowIcon, {
                [classes.arrowButtonIconOpened]: isDropdownOpened,
              })}
            />
          }
        />
      </div>

      <div className={cx(classes.dropdownList, {
        [classes.dropdownListOpened]: isDropdownOpened,
      })}>
        {_options.map((item) => {
          const isDisabled = item.value === currentValue;

          return (
            <button
              key={item.title}
              className={cx(classes.dropdownListItem)}
              onClick={() => {
                handleChange(item.value);
                toggleDropdown(false);
              }}
              disabled={isDisabled}
            >
              <Typography>
                {item.title}
              </Typography>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Dropdown;
