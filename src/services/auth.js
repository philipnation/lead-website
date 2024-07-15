import Point from "@/models/Point.model";
import User from "@/models/User.model";
import { connectToDB } from "@/utils/database";

export const firststageService = async (params) => {
    const { firstName, lastName, email, username, password, referral } = params;
    
    try {
      await connectToDB();
  
      const user = await new User({
        firstName, 
        lastName, 
        email, 
        username, 
        password
      });
  
      const res = await user.save();
  
      if (referral) {
        console.log("is");
        const isReferral = await User.findOne({ username: referral });
        const points = await Point.find()
        if (isReferral) {
          let user = await User.findOne({ email: res.email });
          user.referral = isReferral._id;
          isReferral.total_referrals = isReferral.total_referrals + 1;
          isReferral.points = isReferral.points + points[0]?.point;
          await isReferral.save();
          await user.save();
        }
      }
      let nopassword = await User.findOne({ email: res.email }).select("email");
      return nopassword;
    } catch (error) {
      console.log(error);
      return error;
    }
  };