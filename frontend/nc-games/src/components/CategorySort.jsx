import React from 'react';
const CategorySort = ({ onChange }) => {
    const Categories = [{ value: '', label: 'choose your option' },
                    {value: 'strategy', label: 'Strategy'}, //options for the dropdown
                    {value: 'hidden-roles', label: 'hidden roles'},
                    {value: 'dexterity', label: 'Dexterity'},                
                    {value: 'push-your-luck', label: 'push your luck'},
                    {value: 'roll-and-write', label: 'roll and write'},   
                    {value: 'deck-building', label: 'Deck building'},   
                    {value: 'engine-building', label: 'Engine building'}];   

      const categoryList = Categories.map((option) => ( //map through options array
        <option value={option.value}>{option.label}</option>
      ));

    const handleChange = (event) => {
            onChange(event.target.value)
        }
      return (
        <div className="categoryButton">
        <select name='Category' selected="" id='Category' options={Categories} onChange={handleChange} >
          {categoryList}
        </select>
        </div>
      );
    };
export default CategorySort