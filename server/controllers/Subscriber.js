const User = require('../models/User');

const subscriber = async (req,res)=>{
    try{
        //user ID ...
        const userId = req.user.id;

        //user ID jisko hum subscribe kar rahe he....
        const subscribingUserId = req.body.id;

        await User.findByIdAndUpdate(userId, 
                                    {$push : {subscribing : subscribingUserId}}, 
                                    {new:true});
        
        const jisko_Subscribe_kar_rahe_he = await User.findByIdAndUpdate(subscribingUserId,
                                    {$push:{subscriber: userId}},
                                    {new:true});
        console.log('jisko_Subscribe_kar_rahe_he',jisko_Subscribe_kar_rahe_he);

        return res.status(200).json({
            success:true,
            message: 'subscribing successfully'
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Error in user subscriber please try again'
        })
    }
}

module.exports = {subscriber};