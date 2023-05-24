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

export enum StatusType {
    Primary = 'primary',
    Active = 'active',
    Disabled = 'disabled',
    Transparent = 'transparent',
    Warning = 'warning',
    Boder = 'boder',
    PrimaryClient = 'primaryClient',
    Rounded = 'rounded',
}
export enum SizeType {
    Small = 'small',
    Large = 'large',
    Medium = 'medium',
}

export interface IResponseData<T> {
    message: string;
    status: string;
    statusCode: number;
    metadata?: T;
}
