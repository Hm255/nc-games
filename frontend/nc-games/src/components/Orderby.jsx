import React from 'react';
const Orderby = ({ onChange }) => {

    const Order = [{value: 'asc', label: 'ascending order'}, 
                    {value: 'desc', label: 'descending order'}
                ];

      const orderByList = Order.map((option) => (
        <option value={option.value}>{option.label}</option>
      ));

    const handleChange = (event) => {
            onChange(event.target.value)
      
      };

      return (
        <div>
        <select name='Ordered' id='orderBy' options={Order} onChange={handleChange} >
          {orderByList}
        </select>
        </div>
      );
  }

export default Orderby