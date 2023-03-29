import React from 'react';
import styles from './Logo.module.scss';
interface LogoProps {
   className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
   const classes = `${styles.logo} ${className ? className : ''}`;
   return (
      <div className={classes}>
         <h2>
            <span>TMELE </span>
            <span className={styles.logoColor}>HOMES</span>
         </h2>
      </div>
   );
};

export default Logo;
