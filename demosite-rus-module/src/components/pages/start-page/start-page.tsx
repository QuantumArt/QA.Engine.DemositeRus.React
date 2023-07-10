import React from 'react';
import { useAbstractItem } from '@quantumart/qp8-widget-platform-bridge';
import { Navigate } from 'react-router-dom';

const StartPage = () => {
  const abstractItem = useAbstractItem();

  if (abstractItem.children.length === 0) {
    return <p style={{ color: 'red' }}>Site is empty</p>;
  }

  return <Navigate replace to={abstractItem.children[0].alias} />;
};

export default StartPage;
