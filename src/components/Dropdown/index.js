import React, { cloneElement, useState } from 'react';
import styles from './index.module.css';
import clsx from 'clsx';
import useFocus from '../useFocus';

export default function ({children, onChange, ...props}) {
  const [curIndex, setCurIndex] = useState(0);
  const [ref, focused, setFocused] = useFocus(false);

  const header = children.filter(c => c.props.value == null)[0];
  const options = children.filter(c => c.props.value != null);

  const clickHandler = newIndex => {
    setCurIndex(newIndex);
    let p = options[newIndex].props;
    onChange(p.value, p.label || p.value);
  };

  return (
    <div ref={ref} className={styles.container}>
      <div className={clsx(styles.header, focused && styles.focused)} onClick={() => setFocused(!focused)}>
        {header}
      </div>
      { focused &&
        <div className={styles.contentsBack}>
          <div className={styles.contents}>
            {focused && options.map((option, i) =>
              cloneElement(option, {
                key: i,
                selected: i == curIndex,
                onClick: () => clickHandler(i),
              })
            )}
          </div>
        </div>
      }
    </div>
  );
}