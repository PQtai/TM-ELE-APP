export interface IAddressData {
   _id: string;
   name: string;
   type: string;
   slug: string;
   name_with_type: string;
   path: string;
   path_with_type: string;
   code: string;
   parent_code: string;
   isDeleted: boolean;
}
export interface IStateAddress {
   province: string;
   district: string;
   wards: string;
   addressDetails?: string;
}

export interface IAddressDataResponse {
   exitcode: number;
   data: {
      data: IAddressData[];
   };
   message: string;
}
