import jwt from 'jsonwebtoken'
import UserModel from '../models/user.js'
import  asyncHandler  from 'express-async-handler'

// const auth = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     const isCustomAuth = token.length < 500;
//     let decodedData;
//     if (token && isCustomAuth) {
//       decodedData = jwt.verify(token, process.env.SECRET);
//       req.userId = decodedData?.id;
//     } else {
//       decodedData = jwt.decode(token);
//       const googleId = decodedData?.sub.toString();
//       const user = await UserModel.findOne({ googleId });
//       req.userId = user?._id;
//     }
//     next();
//   } catch (error) {
//     console.log(error);
//   }
// };

// export default auth;
const auth = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header, bearer is the 0 index and the token is 1 .....using this insteadt of axios.interceptors syntax 
      token = req.headers.authorization.split(' ')[1]  

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token
      req.userId = await UserModel.findById(decoded?.id)
      

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }
  

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})



export default auth

