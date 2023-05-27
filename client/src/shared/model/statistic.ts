
export interface IMessageStatistic {
    totalUsers:number;
    registeredToday:number;
    registeredThisWeek:number;
    registeredThisMonth:number;
    registeredTodayRate:string;
    registeredThisWeekRate:string;
    registeredThisMonthRate:string;
    registeredThisQuarterRate:string;
}
export interface IResultStatistic<T> {
    is_error: boolean;
    statusCode: number;
    message?: T;
 }