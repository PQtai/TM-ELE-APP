import React, { useRef, useState } from 'react';
import DropItem from './DropItem';
import styles from './Droplist.module.scss';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
export interface ObjPropsList {
   title: string;
   icon: React.ReactNode;
}

export interface DataChildren {
   title: string;
   icon: React.ReactNode | string;
   datas?: ObjPropsList[];
   stylesProps?: { [key: string]: string };
}

const Droplist: React.FC<DataChildren> = ({ icon, title, datas, stylesProps }) => {
   const elementIconDrop = useRef<SVGSVGElement>(null);
   const customStyles = stylesProps ? stylesProps : styles;
   const [open, setOpen] = useState(false);
   const handleRotate = () => {
      const icon = elementIconDrop.current;
      if (icon) {
         icon.style.transform = icon.style.transform === 'rotate(180deg)' ? '' : 'rotate(180deg)';
      }
   };
   return (
      <div className={customStyles.dropList}>
         <div
            className={customStyles.dropShow}
            onClick={() => {
               handleRotate();
               setOpen(!open);
            }}
         >
            <div className={customStyles.titleWrapper}>
               {icon}
               <span className={customStyles.title}>{title}</span>
            </div>
            {datas && datas[0] && <ExpandMoreOutlinedIcon ref={elementIconDrop} />}
         </div>
         <ul className={`${customStyles.listItem} ${open ? customStyles.open : customStyles.close}`}>
            {datas?.map((data, index) => {
               return <DropItem stylesProps={customStyles} key={index} title={data.title} icon={data.icon} />;
            })}
         </ul>
      </div>
   );
};

export default Droplist;
