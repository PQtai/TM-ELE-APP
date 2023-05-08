import { User, Post } from "../models/index.js";
import moment from "moment";
import errorFunction from "../utils/errorFunction.js";

const statistic = {
  userStatistics: async (req, res) => {
    try {
      // Lấy ngày, tuần, tháng, quý hiện tại
      const today = moment().startOf("day");
      const thisWeek = moment().startOf("week");
      const thisMonth = moment().startOf("month");
      const thisQuarter = moment().startOf("quarter");

      const { start_date, end_date } = req.query;
      let query = {};
      if (start_date && end_date) {
        query.createdAt = { $gte: moment(start_date), $lte: moment(end_date) };
      }

      // Đếm số lượng user register trong ngày, tuần, tháng, quý
      const totalUsers = await User.countDocuments(query);
      const registeredToday = await User.countDocuments({
        createdAt: { $gte: today },
      });
      const registeredThisWeek = await User.countDocuments({
        createdAt: { $gte: thisWeek },
      });
      const registeredThisMonth = await User.countDocuments({
        createdAt: { $gte: thisMonth },
      });
      const registeredThisQuarter = await User.countDocuments({
        createdAt: { $gte: thisQuarter },
      });

      // Lấy số lượng user đã đăng ký trong ngày, tuần, tháng, quý trước
      const lastDay = moment(today).subtract(1, "days");
      const lastWeek = moment(thisWeek).subtract(1, "weeks");
      const lastMonth = moment(thisMonth).subtract(1, "months");
      const lastQuarter = moment(thisQuarter).subtract(1, "quarters");

      const registeredLastDay = await User.countDocuments({
        createdAt: { $gte: lastDay, $lt: today },
      });
      const registeredLastWeek = await User.countDocuments({
        createdAt: { $gte: lastWeek, $lt: thisWeek },
      });
      const registeredLastMonth = await User.countDocuments({
        createdAt: { $gte: lastMonth, $lt: thisMonth },
      });
      const registeredLastQuarter = await User.countDocuments({
        createdAt: { $gte: lastQuarter, $lt: thisQuarter },
      });

      // Mức độ tăng trưởng tính theo tỉ lệ
      //   const registeredTodayRate =
      //     registeredToday && registeredLastDay
      //       ? registeredToday / registeredLastDay
      //       : 0;
      //   const registeredThisWeekRate =
      //     registeredThisWeek && registeredLastWeek
      //       ? registeredThisWeek / registeredLastWeek
      //       : 0;
      //   const registeredThisMonthRate =
      //     registeredThisMonth && registeredLastMonth
      //       ? registeredThisMonth / registeredLastMonth
      //       : 0;
      //   const registeredThisQuarterRate =
      //     registeredThisQuarter && registeredLastMonth
      //       ? registeredThisQuarter / registeredLastQuarter
      //       : 0;

      // Tính tỉ lệ người dùng đăng ký tăng/ giảm tính theo phần trăm
      const registeredTodayRate =
        registeredLastDay === 0
          ? 100
          : (
              ((registeredToday - registeredLastDay) / registeredLastDay) *
              100
            ).toFixed(2) || 0;
      const registeredThisWeekRate =
        registeredLastWeek === 0
          ? 100
          : (
              ((registeredThisWeek - registeredLastWeek) / registeredLastWeek) *
              100
            ).toFixed(2) || 0;
      const registeredThisMonthRate =
        registeredLastMonth === 0
          ? 100
          : (
              ((registeredThisMonth - registeredLastMonth) /
                registeredLastMonth) *
              100
            ).toFixed(2) || 0;
      const registeredThisQuarterRate =
        registeredLastQuarter === 0
          ? 0
          : (
              ((registeredThisQuarter - registeredLastQuarter) /
                registeredLastQuarter) *
              100
            ).toFixed(2) || 0;

      return res.status(201).json(
        errorFunction("false", 201, {
          totalUsers,
          registeredToday,
          registeredThisWeek,
          registeredThisMonth,
          registeredTodayRate: `${registeredTodayRate}%`,
          registeredThisWeekRate: `${registeredThisWeekRate}%`,
          registeredThisMonthRate: `${registeredThisMonthRate}%`,
          registeredThisQuarterRate: `${registeredThisQuarterRate}%`,
        })
      );
    } catch (err) {
      console.log(err);
      res.status(500).json(errorFunction(true, 500, err.message));
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
