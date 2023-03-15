import React, { ReactNode } from 'react';

export interface IChildrenComponentProps {
   children?: ReactNode;
}

type LayoutType = React.FC<IChildrenComponentProps> | null;

export interface IRoutes {
   path: string;
   component: React.ComponentType<any>;
   layout?: LayoutType;
}
