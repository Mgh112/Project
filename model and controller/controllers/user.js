import Service from "../models/Service.js";
import Hotel from "../models/Service.js";
import User from "../models/User.js";

//تقوم بإعادة بيانات مستخدم معين حسب رقم المستخدم
export const getUser = async (req,res,next)=>{
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }

}
//.............................................................
//تقوم بإعادة جميع الخدمات التي قام المستخدم بحجزها حسب رقم المستخدم حيث يقوم بالبحث عن المستخدم حسب رقمه 
//ثم ينتقل عبر مصفوفة الخدمات التي قام المستخدم بحجزها ومن أجل كل رقم خدمة يقوم بإعادة الخدمة حسب رقم الخدمة
export const getServices = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const list = await Promise.all(
      user.services.map((service) => {
        return Service.findById(service);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};
//............................................................
//تقوم بإضافة خدمة إلى مصفوفة الخدمات التي قام المستخدم بحجزها  وذلك عن طريق رقم المستخدم ورقم الخدمة حيث يقوم
//بالبحث عن المستخدم حسب رقمه ثم يقوم بإضافة رقم الخدمة إلى مصفوفة الخدمات الخاصة بهذا المستخدم
export const addService = async (req, res, next) => {
  const userid = req.params.userid;

    try {
      await User.findByIdAndUpdate(userid, {
        $push: { services: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).send("success");
}

//-----------------------------------------------------
// تقوم أيضاً بإضافة خدمة معينة إلى مصفوفة الخدمات الخاصة بمستخدم معين عن طريق رقم المستخدم ورقم الخدمة 
// ولكن هنا يستقبل رقم الخدمة ورقم المستخدم في جسم الطلب
export const addService1 = async (req, res, next) => {
  const userid = req.body.userid;
  console.log(userid);
  const serviceid = req.body.serviceid;  
  console.log(serviceid);
    const user = await User.findById(userid);
   const found=user.services.includes(serviceid);//شرط من أجل عم إضافة خدمة موجودة مسبقاً
   if(!found){
    try {
      
      await User.findByIdAndUpdate(userid, {
        $push: { services:serviceid},
      });
    } catch (err) {
      next(err);
    }
    res.status(200).send("success");
   } 
   else
   {res.status(200).send("found ");}
   
}
//-------------------------------------------------
//يتم فيها استقبال رقم المستخدم ورقم الخدمة في جسم الطلب وتقوم بحذف الخدمة التي لها هذا الرقم من مصوفة الخدمات 
//الخاصة بالمستخدم الذي له هذا الرقم
export const deleteservice = async (req, res, next) => {
  const userid = req.body.userid;
  console.log(userid);
  const serviceid = req.body.serviceid;  
  console.log(serviceid);
   
    try {
      
      await User.findByIdAndUpdate(userid, {
        $pull: { services:serviceid},
      });
    } catch (err) {
      next(err);
    }
    res.status(200).send("success2");
   } 
   
   
   



