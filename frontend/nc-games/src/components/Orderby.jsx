import React from 'react';
const Orderby = ({ onChange }) => {

    const Order = [{ value: '', label: 'choose your option' },
                     {value: 'asc', label: 'ascending order'}, //options for the dropdown
                    {value: 'desc', label: 'descending order'}
                ];

      const orderByList = Order.map((option) => ( //map through options array
        <option value={option.value}>{option.label}</option>
      ));

    const handleChange = (event) => {
            onChange(event.target.value)
      };
      return (
        <div>
        <select name='Ordered' selected="" id='orderBy' options={Order} onChange={handleChange} >
          {orderByList}
        </select>
        </div>
      );
  }

export default Orderby