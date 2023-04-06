import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Logo.module.scss';
interface LogoProps {
   className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
   const classes = `${styles.logo} ${className ? className : ''}`;
   const navigate = useNavigate();
   return (
      <div
         onClick={() => {
            navigate('/');
         }}
         className={classes}
      >
         <h2>
            <span>TMELE </span>
            <span className={styles.logoColor}>HOMES</span>
         </h2>
      </div>
   );
};

export default Logo;
