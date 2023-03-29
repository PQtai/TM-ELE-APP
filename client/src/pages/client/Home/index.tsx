import ContainerHome from './containerHome';
import HeaderHome from './headerHome';
import styles from './home.module.scss';

const Home = () => {
   return (
      <div className={styles.home}>
         <HeaderHome />
         <ContainerHome />
      </div>
   );
};

export default Home;
