const jwt = require("jsonwebtoken")

const isAdmin = (req,res,next)=>{
   const token = req.headers.authorization.split(" ")[1]
   console.log(token)
   try {
      if(token){
         let decode = jwt.verify(token, "nodejs")
         if(decode.role == 'admin'){
            next()
         }else{
            res.send({msg : "Unauthorized"})
         }
         
      }else{
         res.send({msg : "User Not Logged In"})
      }
   } catch (error) {
    res.send({msg : error.message})
   }
}

module.exports = isAdmin