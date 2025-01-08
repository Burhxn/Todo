import React from 'react';

const FilterTask = ({ setFilter }) => {
  return (
    <div className='filter-buttons'>
      <button onClick={() => setFilter('all')}>All</button>
      <button className='green' onClick={() => setFilter('completed')}>Completed</button>
      <button onClick={() => setFilter('pending')}>Pending</button>
    </div>
  );
};

export default FilterTask;
