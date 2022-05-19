import React from 'react';
import { useLocation } from 'react-router-dom';

function UseQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default UseQuery;
