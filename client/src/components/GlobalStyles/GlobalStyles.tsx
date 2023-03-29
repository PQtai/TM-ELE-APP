import PropTypes from 'prop-types';
import React, { ReactNode } from 'react';
import { IChildrenComponentProps } from '~/shared/model/global';
import './GlobalStyles.scss';

const GlobalStyles: React.FC<IChildrenComponentProps> = ({ children }) => {
   return <>{children}</>;
};

export default GlobalStyles;
