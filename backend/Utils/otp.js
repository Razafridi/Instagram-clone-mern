const generateOTP = ()=>{
    let str = ""
    for(let i =0;i<6;i++){
        str = str + Math.ceil(Math.random() * 9)
    }
    return str
}


module.exports = {generateOTP}