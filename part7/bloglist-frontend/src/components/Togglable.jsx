import { forwardRef, useImperativeHandle, useState } from 'react';
import Button from './Button';
import PropTypes from 'prop-types';
import * as propTypes from 'prop-types';

const Togglable = forwardRef(({
  btnLabel, isVisible, displayType, toggleBtn, hideBtn, children
}, refs) => {
  const [visible, setVisible] = useState(isVisible);

  const toggleBtnText = toggleBtn && visible ? 'hide' : btnLabel;
  const toggleBtnStyles = toggleBtn ? {} : toggleStyles(!visible);

  const toggleStyles = (show = visible) => ({
    display: show ? '' : 'none',
  });

  const toggleVisibility = () => setVisible(!visible);

  useImperativeHandle(refs, () => ({ toggleVisibility }));

  return (
    <div className='togglable' style={{ display: displayType }}>
      <Button
        onClick={toggleVisibility}
        style={toggleBtnStyles}
        size='sm'
      >{toggleBtnText}</Button>
      <div style={toggleStyles()}>
        {children}
        {hideBtn && <Button onClick={toggleVisibility}>cancel</Button>}
      </div>
    </div>
  );
});

Togglable.displayName = 'Togglable';

Togglable.propTypes = {
  btnLabel: propTypes.string,
  isVisible: PropTypes.bool,
  displayType: PropTypes.string,
  toggleBtn: PropTypes.bool,
  hideBtn: PropTypes.bool,
};

Togglable.defaultProps = {
  btnLabel: 'view',
  isVisible: false,
  displayType: 'inline',
  toggleBtn: true,
  hideBtn: false,
};

export default Togglable;
