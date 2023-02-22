import PropTypes from 'prop-types';
import { ReactNode } from 'react';
import './GlobalStyles.scss';

interface ParentComponentProps {
   children: ReactNode;
}

function GlobalStyles({ children }: ParentComponentProps) {
   return <div>{children}</div>;
}

GlobalStyles.propTypes = {
   children: PropTypes.node.isRequired,
};

export default GlobalStyles;
