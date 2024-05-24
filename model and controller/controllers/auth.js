import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";


//تستخدم للتسحيل في الموقع 
export const register = async (req, res, next) => {
  try {
    //تستخدم من أجل تخزين قيمة التقطيه لكلمة المرور بلاً من تخزين كلمة المرور
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });
    
    await newUser.save();
 
    res.status(200).send("User has been created.");
   
  } catch (err) {
    next(err);
  }
};



//تستخدم من أجل تسجيل الدخول عن طريق الايميل وكلمة المرور حيث يتم مقارنة الايميل وكلمة المرور وتقوم بإعادة 
//token إلى المستخدم
//عبر بيانات الارتباط cookie
//كما تقوم بإعادة كل تفاصيل المستخدم ما عدل كلمة المرور
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign( { id: user._id},  process.env.JWT  );
    const { password, ...otherDetails } = user._doc;
    res.cookie("access_token", token, { httpOnly: true }).status(200).json({ details: { ...otherDetails } });
  } catch (err) {
    next(err);
  }
};
