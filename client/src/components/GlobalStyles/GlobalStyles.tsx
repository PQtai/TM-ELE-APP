import PropTypes from 'prop-types';
import React, { ReactNode } from 'react';
import { IChildrenComponentProps } from '~/types/models/global';
import './GlobalStyles.scss';

const GlobalStyles: React.FC<IChildrenComponentProps> = ({ children }) => {
   return <>{children}</>;
};

export default GlobalStyles;
