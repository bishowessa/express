const responseMsgs = require('./../utilities/responseMsgs')



const errorHandler = (res,er) =>{
    
    if (er.message){
    //database
        res.status(400).json({
            status : responseMsgs.FAIL,
            data : er.message.split(',')//btrg3 array
        })
    }else if (er.errors[0]){
        //express validator
        res.status(400).json({
            status : responseMsgs.FAIL,
            // data : er.errors
            data : er.errors.map((e) => e.message)//btrg3 array
        })
    }else {
        //ana elly 3amlo bl throw
        res.status(400).json({
            status : responseMsgs.FAIL,
            // data : er //btrg3 el string ell ana ba3to
            data : [er] //keda btrg3 object 3lshan yeb2a kolo mwahad array 3lshan bta3 el front lma yege yeshtghal
        })
    }

}

module.exports = errorHandler

