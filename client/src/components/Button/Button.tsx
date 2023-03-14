import React from 'react';

const Button: React.FC<any> = ({ children, ...restProps }) => {
   return <button {...restProps}>{children}</button>;
};

export default Button;
