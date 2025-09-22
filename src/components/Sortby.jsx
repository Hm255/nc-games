import React from 'react';
const Sortby = ({ onChange }) => {

    const Sort = [ //options for the dropdown
        { value: 'review_id', label: 'choose your option' },
        { value: 'review_id', label: 'Review ID' },
        { value: 'Votes', label: 'Vote count' },
        { value: 'created_at', label: 'recent' },
        { value: 'comment_count', label: 'comment count' }
      ];
                
    const sortByList = Sort.map((option) => ( //map through options array
        <option value={option.value}>{option.label}</option>
      ));

    const handleChange = (event) => {
            onChange(event.target.value)
      };

      return (
        <div>
        <select name='Sorted' id='sortBy' selected="" options={Sort} onChange={handleChange}>
          {sortByList}
        </select>
        </div>
      );
  }

export default Sortby

  