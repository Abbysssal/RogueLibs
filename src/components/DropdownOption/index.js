import React, { useState } from 'react';
import styles from './index.module.css';
import clsx from 'clsx';

export default function ({children, onClick, value, label, selected, ...props}) {
  label = label || value;
  return (
    <div className={clsx(styles.option, selected && styles.optionSelected)} onClick={onClick} {...props}>
      {children != null && children.length > 0
        ? children
        : label}
    </div>
  );
}