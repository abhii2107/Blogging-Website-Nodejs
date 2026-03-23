const { Schema, model } = require("mongoose")
const { createHmac, randomBytes } = require("crypto");
const { createTokenForUSer } = require("../services/authentication");

const userSchema = new Schema({
    FullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        type: String,
        
    },
    password: {
        type: String,
        required: true,
    },
    profileImageUrl: {
        type: String,
        default: "/images/download.png"
    },
    role: {
        type: String,
        enum: ["USER","ADMIN"],
        default: "USER"
    }

},
{timestamps: true}
)

userSchema.pre('save', function(){
    const user = this;

    if(!user.isModified("password") ) return;
    const salt = randomBytes(16).toString("hex");
    // createHmac(algorithm, key) 
    // digest will give the final result
    const hashedPassword = createHmac('sha256', salt).update(user.password).digest("hex")

    this.salt = salt;
    this.password = hashedPassword;
})

// virtual funv=ction for sign in
userSchema.static('matchPasswordAndGenerateToken',async function(email,password){
    const user = await this.findOne({email});
    if(!user) throw new Error('user not found');

    const salt = user.salt;
    const hashPassword = user.password

    const userProvidedHash = createHmac('sha256', salt).update(password).digest("hex")

    if(hashPassword !== userProvidedHash)throw new Error('Incorrect Password')
   
    //  return user; ##instead of retutning use r we will retutn the Token##
    const token = createTokenForUSer(user)
    return token;
    
})

const User = model('user', userSchema)

module.exports = User;