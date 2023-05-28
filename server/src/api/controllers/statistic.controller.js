import { User, Post } from "../models/index.js";
import moment from "moment";
import errorFunction from "../utils/errorFunction.js";

const statistic = {
  userStatistics: async (req, res) => {
    try {
      const { start_date, end_date, date } = req.query;
      let query = {};
      let result = {};
      // Nếu query truyền vào là start_date && end_date
      if (start_date && end_date) {
        console.log(start_date);
        const startDate = moment(start_date).startOf("day");
        const endDate = moment(end_date).endOf("day");
        query.createdAt = { $gte: startDate, $lte: endDate };
        const totalUsers = await User.countDocuments(query);
        result = { totalUsers };
        // return res.status(200).json(errorFunction(false, 200, {totalUsers}))
      } else {
        // Kiểm tra nếu query `date` không được truyền vào, gán giá trị mặc định là ngày hôm nay
        const dateQuery = date
          ? moment(date).startOf("day")
          : moment().startOf("day");

        // Lấy ngày, tuần, tháng, quý của ngày nằm trong dataQuery
        const thisWeekOfDate = moment(dateQuery).startOf("week");
        const thisMonthOfDate = moment(dateQuery).startOf("month");
        const thisQuarterOfDate = moment(dateQuery).startOf("quarter");
        // Tính tổng user có trong hệ thống đã có trước ngày nằm trong dataquery
        const totalUsers = await User.countDocuments({
          createdAt: { $lte: dateQuery.endOf("day") },
        });
        // Đếm số lượng user register trong ngày, tuần, tháng, quý kể từ ngày nằm trong dataquery
        const registeredOnDate = await User.countDocuments({
          createdAt: { $gte: dateQuery, $lte: dateQuery.endOf("day") },
        });
        const registeredThisWeekOfDate = await User.countDocuments({
          createdAt: { $gte: thisWeekOfDate },
        });
        const registeredThisMonthOfDate = await User.countDocuments({
          createdAt: { $gte: thisMonthOfDate },
        });
        const registeredThisQuarterOfDate = await User.countDocuments({
          createdAt: { $gte: thisQuarterOfDate },
        });
        // Đếm số lượng user register trong ngày, tuần, tháng, quý trước (tính từ ngày nằm trong query)
        const lastDay = moment(dateQuery).subtract(1, "days");
        const lastWeek = moment(thisWeekOfDate).subtract(1, "weeks");
        const lastMonth = moment(thisMonthOfDate).subtract(1, "months");
        const lastQuarter = moment(thisQuarterOfDate).subtract(1, "quarters");

        // .... Chức năng hiển thị danh sách users dựa vào các bộ đếm sẽ tạm thời được ẩn
        // .... filter hoặc API riêng, khi người dùng click vào mới thực hiện render ra danh sách
        // const userRegisteredBeforeDate = await User.find({
        //   createdAt: { $lte: dateQuery.endOf("day") },
        // });
        // const userRegisteredOnDate = await User.find({
        //   createdAt: { $gte: dateQuery, $lte: dateQuery.endOf("day") },
        // });
        // const usersRegisteredLastDay = await User.find({
        //   createdAt: { $gte: lastDay, $lt: dateQuery },
        // });
        // console.log(usersRegisteredLastDay);
        // const usersRegisteredLastWeek = await User.find({
        //   createdAt: { $gte: lastWeek, $lt: dateQuery },
        // });
        // const usersRegisteredLastMonth = await User.find({
        //   createdAt: { $gte: lastMonth, $lt: dateQuery },
        // });
        // const usersRegisteredLastQuarter = await User.find({
        //   createdAt: { $gte: lastQuarter, $lt: dateQuery },
        // });

        const registeredLastDay = await User.countDocuments({
          createdAt: { $gte: lastDay, $lt: dateQuery },
        });
        const registeredLastWeek = await User.countDocuments({
          createdAt: { $gte: lastWeek, $lt: thisWeekOfDate },
        });
        const registeredLastMonth = await User.countDocuments({
          createdAt: { $gte: lastMonth, $lt: thisMonthOfDate },
        });
        const registeredLastQuarter = await User.countDocuments({
          createdAt: { $gte: lastQuarter, $lt: thisQuarterOfDate },
        });

        // Tính tỉ lệ người dùng đăng ký tăng/ giảm tính theo phần trăm
        const registeredThisDateRate = (
          registeredLastDay === 0
            ? registeredOnDate === 0
              ? 0
              : Infinity
            : ((registeredOnDate - registeredLastDay) /
                Math.abs(registeredLastDay)) *
              100
        ).toFixed(2);
        const registeredThisWeekRate = (
          registeredLastWeek === 0
            ? registeredThisWeekOfDate === 0
              ? 0
              : Infinity
            : ((registeredThisWeekOfDate - registeredLastWeek) /
                Math.abs(registeredLastWeek)) *
              100
        ).toFixed(2);
        const registeredThisMonthRate = (
          registeredLastMonth === 0
            ? registeredThisMonthOfDate === 0
              ? 0
              : Infinity
            : ((registeredThisMonthOfDate - registeredLastMonth) /
                Math.abs(registeredLastMonth)) *
              100
        ).toFixed(2);
        const registeredThisQuarterRate = (
          registeredLastQuarter === 0
            ? registeredThisQuarterOfDate === 0
              ? 0
              : Infinity
            : ((registeredThisQuarterOfDate - registeredLastQuarter) /
                Math.abs(registeredLastQuarter)) *
              100
        ).toFixed(2);

        result = {
          totalUsers,
          registeredOnDate,
          registeredThisWeekOfDate,
          registeredThisMonthOfDate,
          registeredThisQuarterOfDate,
          registeredThisDateRate: `${registeredThisDateRate}%`,
          registeredThisWeekRate: `${registeredThisWeekRate}%`,
          registeredThisMonthRate: `${registeredThisMonthRate}%`,
          registeredThisQuarterRate: `${registeredThisQuarterRate}%`,
        };
      }

      return res.status(200).json(errorFunction(false, 200, result));
    } catch (err) {
      console.log(err);
      res.status(500).json(errorFunction(true, 500, "Internal server error"));
    }
  },
  postStatistics: async (req, res) => {
    try {
      // const today = moment().startOf("day");
      // const thisWeek = moment().startOf("week");
      // const thisMonth = moment().startOf("month");
      // const thisQuarter = moment().startOf("quarter");
      // const totalPost = await Post.countDocuments();
      // const addedPostThisWeek = await Post.countDocuments({
      //   createdAt: { $gte: thisWeek },
      // });
    } catch (err) {
      console.log(err);
      res.status(500).json(errorFunction(true, 500, err.message));
    }
  },
};

export default statistic;
