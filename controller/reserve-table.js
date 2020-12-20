const User = require('../modal/User')
const RT = require('../modal/reserve-table')
const mongoose = require('mongoose')
const { validationResult } = require('express-validator');
const HttpError = require('../modal/http-error');



const bill = async (req, res, next) => {
    console.log("success")
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
  
      return next(
        new HttpError('Dữ liệu đầu vào không hợp lệ. Vui lòng kiểm tra lại', 422)
      ) ;
    }
    const userId = req.params.uid;
    const { numberofguest, smoking, date } = req.body;
  
    let user;
    try {
      user = await User.findById(userId);
    } catch (error) {
      const err = new HttpError("Tạo sản phẩm thất bại. Vui lòng thử lại", 500);
      return next(err);
    }
  
    if (!user) {
      const err = new HttpError("Không thể kiếm thấy thành viên này", 500);
      return next(err);
    }
  
    const createdBill = new RT({
      numberofguest,
      smoking,
      date,
      creator: userId,
      guestName: user.name 
    })
  
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdBill.save({ session: sess });
        user.bill.push(createdBill);
        await user.save({ sess: sess });
        await sess.commitTransaction();
      } catch (err) {
        console.log(err);
        const error = new HttpError("Lỗi", 500);
        return next(error);
      }
    
    //   res.status(201).json(message:'Đặt bàn thành công', { bill: createdBill });
      res.json({message: 'Đặt bàn thành công', bill: createdBill});
  };
  
  
  exports.bill = bill;
