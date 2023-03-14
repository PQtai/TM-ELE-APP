import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import styles from './Button.module.scss';

interface PropsTypeButton {
   to?: string;
   // css
   primary?: boolean;
   active?: boolean;
   rounded?: boolean;
   disabled?: boolean;
   small?: boolean;
   large?: boolean;
   warning?: boolean;
   // variable
   type?: 'button' | 'submit' | 'reset';
   title?: string;
   className?: string;
   leftIcon?: React.ReactNode;
   rightIcon?: React.ReactNode;
   onClick?: () => void;
   passProps?: any;
}
interface PropsTypeLink {
   onClick?: () => void;
   to?: string;
   [key: string]: any;
}
const ButtonCustom: React.FC<PropsTypeButton> = ({
   to,
   title,
   primary = false,
   active = false,
   rounded = false,
   disabled = false,
   small = false,
   large = false,
   warning = false,
   className,
   leftIcon,
   rightIcon,
   onClick,
   ...passProps
}) => {
   let Comp = Button;
   const props: PropsTypeLink = {
      onClick,
      ...passProps,
   };

   // Remove event listener when btn is disabled
   if (disabled) {
      Object.keys(props).forEach((key) => {
         if (key.startsWith('on') && typeof props[key] === 'function') {
            delete props[key];
         }
      });
   }

   if (to) {
      props.to = to;
      Comp = Link;
   }
   const classes = `${styles.wrapper} ${primary ? styles.primary : ''} ${
      active ? styles.active : ''
   } ${disabled ? styles.disabled : ''} ${warning ? styles.warning : ''}
      ${rounded ? styles.rounded : ''} ${small ? styles.small : ''} ${large ? styles.large : ''} ${
      className ? className : ''
   }`;

   return (
      <Comp className={classes} {...props}>
         {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
         <span className={styles.title}>{title}</span>
         {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
      </Comp>
   );
};

export default ButtonCustom;
