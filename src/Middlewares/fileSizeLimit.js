const GB = 5
const fileSizeLimit = GB * 1024 * 1024
const FileSizeLimit = (req, res, next) => {
    const file = req.file
const fileOverlimit = []
Object.keys(file).forEach(key=>{
    if(file[key].size> fileSizeLimit){
        fileOverlimit.push(file[key].name)
    }
})
if(fileOverlimit.length){
    const properVerb =fileOverlimit.length >1 ? 'are': 'is'
    const sentence = `Upload faild. ${fileOverlimit.toString()} ${properVerb} over the file size limit of ${GB} GB .`.replaceAll(",",",");
    const message =fileOverlimit.length < 3
    ? sentence.replace(",", "and")
    :sentence.replace(/ ,(?=[^,]*$)/,"and")
    return res.status(413).json({status:'error', message})

}
next()
}

module.exports=fileSizeLimit