const User = require('../modal/User')
const mongoose = require('mongoose')
const { validationResult } = require('express-validator');
const HttpError = require('../modal/http-error');


const signup = async (req, res, next) => {
    console.log("success")
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
  
      return next(
        new HttpError('Dữ liệu đầu vào không hợp lệ. Vui lòng kiểm tra lại', 422)
      ) ;
    }
    const { name, email, password, image } = req.body;
  
    let existingUser; 
  try {
     existingUser = await User.findOne({email: email})
  } catch (error) {
    const err = new HttpError('Đăng kí thất bại',500);
    return next(err);
  }
    
  if(existingUser){
    const err = new HttpError('Thành viên này đã tồn tại. Vui lòng đăng nhập',422);
    return next(err);
  }
  
    const createdUser = new User({
      name,
      email,
      password,
      image: image,
    })
  
    try {
      await createdUser.save();
    } catch (error) {
      const err= new HttpError('Đăng kí thất bại. Vui lòng thử lại', 500);
      return next(err);
    }
  
    res.status(201).json({message:"Đăng kí thành công",user: createdUser.toObject({getters:true})});
  };
  
  const login = async (req, res, next) => {
    const { name, password } = req.body;
  
    let existingUser; 
    try {
      existingUser = await User.findOne({name: name})
      console.log(existingUser)
    } catch (error) {
      const err = new HttpError('Đăng nhập thất bại',500);
      return next(err);
    }
  
    if(!existingUser || existingUser.password !== password)
    {
        const err = new HttpError('Đăng nhập thất bại. Vui lòng thử lại sau', 500);
        return next(err);
    }
  
    res.json({message: 'Đã đăng nhập', user: existingUser.toObject({getters:true})});
  };
  
  exports.signup = signup;
  exports.login = login;