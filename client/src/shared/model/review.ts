export interface ICreateReview {
    reviewedUser: string;
    rating: number;
    comment: string;
}
export interface IReview extends ICreateReview {
    reviewer: string;
}
