const path = require('path')
const fileexlimiter = (allowerdExtArray)=>{
    return (req,res,next)=>{
        const file =req.file

        const fileextion =  []
        Object.keys(file).forEach(key=>{
            fileextion.push(path.extname(file[key].name))
        })
        const allowed =fileextion.every(ext=> allowerdExtArray.includes(ext))
        
        if(!allowed){
            const message =`Upload file. Only ${allowerdExtArray.toString()} file allowed.`.replaceAll(",",",")
            return res.status(422).json({status:'error',message})
        
        }
        next()
    }
}

module.exports=fileexlimiter