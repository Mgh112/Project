//هنا دالة تقوم بإنشاء خطأ معين  وتقوم بإضافة حالة الخطأ والرسالة 
export const createError = (status, message) => {
  const err = new Error();
  err.status = status;
  err.message = message;
  return err;
};
