module.exports = function asyncMidleware(handler){
    return  async (req,res,next)=>{
   try {
     handler(rew,res)
   } catch (ex) {
      next(ex)
   }    
    }
  }