import styles from './post.module.scss';

interface IImgPost {
   img: string;
   data: {
      title: string;
      des: string;
   };
}

const ImgPost = ({ img, data }: IImgPost) => {
   return (
      <div className={styles.imgPost}>
         <img className={styles.postImgBackground} src={img} alt="img-post" />
         <div className={styles.imgPostTitle}>
            <h2>{data.title}</h2>
            <p>{data.des}</p>
         </div>
      </div>
   );
};

export default ImgPost;
