import React from 'react';
const Sortby = ({ onChange }) => {

    const Sort = [
        { value: 'review_id', label: 'Review ID' },
        { value: 'Votes', label: 'Vote count' },
        { value: 'created_at', label: 'recent' },
        { value: 'comment_count', label: 'comment count' }
      ];
                
    const sortByList = Sort.map((option) => (
        <option value={option.value}>{option.label}</option>
      ));

    const handleChange = (event) => {
            onChange(event.target.value)
      };

      return (
        <div>
        <select name='Sorted' id='sortBy' options={Sort} onChange={handleChange}>
          {sortByList}
        </select>
        </div>
      );
  }

export default Sortby

  