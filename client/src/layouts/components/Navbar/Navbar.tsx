import React, { useEffect, useRef } from 'react';
import styles from './Navbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell, faGear } from '@fortawesome/free-solid-svg-icons';

interface PropsNav {
   SetIsCloseSidebar: Function;
   isCloseSidebar: boolean;
}
const Navbar: React.FC<PropsNav> = ({ SetIsCloseSidebar, isCloseSidebar }) => {
   const elementNavbar = useRef<HTMLDivElement>(null);
   useEffect(() => {
      const handleScroll = () => {
         if (document.documentElement.scrollTop > 26) {
            elementNavbar.current?.classList.add(styles.navbarFixed);
         } else {
            elementNavbar.current?.classList.remove(styles.navbarFixed);
         }
      };
      window.addEventListener('scroll', handleScroll);
      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);
   return (
      <div ref={elementNavbar} className={`${styles.navbarWrap} ${isCloseSidebar ? styles.customNav : null}`}>
         <div className={`${styles.navbar}`}>
            <button
               onClick={() => {
                  SetIsCloseSidebar((prev: boolean) => !prev);
               }}
               className={styles.btnCustomSidebar}
            >
               <FontAwesomeIcon icon={faBars} />
            </button>
            <div className={styles.navSetting}>
               <button>
                  <FontAwesomeIcon icon={faGear} />
               </button>
               <button className={styles.btnNotif}>
                  <span>9</span>
                  <FontAwesomeIcon icon={faBell} />
               </button>
            </div>
         </div>
      </div>
   );
};

export default Navbar;
