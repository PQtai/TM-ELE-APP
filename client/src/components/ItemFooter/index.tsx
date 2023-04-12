import React from 'react'
import styles from './ItemFooter.module.scss'


interface IPropsFooter {
    children: string;
    contents?:string[];
    QR?:string;
    imgs?:JSX.Element[];
 }
const ItemFooter = ({children,imgs,contents,QR}:IPropsFooter) => {
  return (
    <div className={styles.itemFooter}>
        <h4 className={styles.titleFooter}>
            {children}
        </h4>
        <div className={styles.download}>
            {  
            QR && <img className={styles.QrCode} src={QR} alt=''/>
            }
            <div>
                {imgs &&
                    imgs.map((img)=>(
                        img
                    ))
                }
            </div>
           <div className={styles.social} >
                {contents && 
                    contents.map((content,index)=>( 
                        <p key={index} className={styles.contentFooter}>{content}</p>
                    ))
                }
           </div>
        </div>
    </div>
  )
}

export default ItemFooter
