const filePayload = async (req,res, next)=>{
if(!req.files) return res.status(400).json({status:'error', message:'Files error'})

next()
}

module.exports = filePayload