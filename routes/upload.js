const {cloudinary} = require("./utils/cloudinary");


app.post("/api/upload", async (req, res) => {
    try {
      const fileStr = req.body.data;
    
   const uploadRes=await cloudinary.uploader.upload(fileStr,{
    upload_preset:'dev_setups'
  })
      
      console.log(uploadRes);
      // console.log(uploadResponse);
      res.send('done')
    } catch (error) {
      console.log(error);
      res.status(500).send("something went wrong");
    }
  });