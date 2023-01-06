import React from 'react';
const CategorySort = ({ onChange }) => {
    const Categories = [{value: 'strategy', label: 'Strategy'}, 
                    {value: 'hidden-roles', label: 'hidden roles'},
                    {value: 'dexterity', label: 'Dexterity'},                
                    {value: 'push-your-luck', label: 'push your luck'},
                    {value: 'roll-and-write', label: 'roll and write'},   
                    {value: 'deck-building', label: 'Deck building'},   
                    {value: 'engine-building', label: 'Engine building'}];   

      const categoryList = Categories.map((option) => (
        <option value={option.value}>{option.label}</option>
      ));

    const handleChange = (event) => {
            onChange(event.target.value)
        }
      return (
        <div className="categoryButton">
        <select name='Category' id='Category' options={Categories} onChange={handleChange} >
          {categoryList}
        </select>
        </div>
      );
    };
export default CategorySort