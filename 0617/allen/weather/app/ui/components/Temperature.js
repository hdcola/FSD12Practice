
import React from 'react';

const Temperature = ({ value, size }) => {
  return <div className={size}>{value}&deg;</div>;
};

export default Temperature;
