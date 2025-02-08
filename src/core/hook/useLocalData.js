import { useContext } from 'react';

import { LocalDataContext } from '../context';

const useLocalData = () => useContext(LocalDataContext);

export default useLocalData;