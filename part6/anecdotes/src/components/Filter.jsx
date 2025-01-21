import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const Filter = () => {
  const dispatch = useDispatch();
  
  const filter = useSelector((state) => state.filter);
  
  const handleFilter = ({ target }) => {
    dispatch(setFilter(target.value));
  };
  
  return (
    <div style={{ marginBottom: 10 }}>
      filter <input onChange={handleFilter} value={filter} />
    </div>
  );
};

export default Filter;
