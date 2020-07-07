import React from 'react';
import { func, string } from 'prop-types';
import './item-status-filter.css';

const ItemStatusFilter = ({
  onAll, onActive, onDone, filter,
}) => {
  const getClassName = (selector) => (
    selector === filter ? 'btn btn-info' : 'btn btn-outline-secondary'
  );
  return (
     <div className="btn-group">
       <button
         type="button"
         className={getClassName('all')}
         onClick={onAll}
       >
       All
       </button>
       <button
         type="button"
         className={getClassName('active')}
         onClick={onActive}
       >
       Active
       </button>
       <button
         type="button"
         className={getClassName('done')}
         onClick={onDone}
       >
       Done
       </button>
    </div>
  );
};
ItemStatusFilter.propTypes = {
  filter: string,
  onAll: func,
  onActive: func,
  onDone: func,
};
export default ItemStatusFilter;
