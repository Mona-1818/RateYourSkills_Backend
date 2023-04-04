const usermodel = require("../models/user");
module.exports.signup = (req, res) =>{
    console.log(req.body)
    const newUser = new usermodel({ 
        email: req.body.email, 
        password: req.body.password
    });
    newUser.save().then(() => {
        res.send({ code: 200, message: "user created"})
    }).catch((err)=>{
        res.send({ code: 500, message: "signup again"})
    })
}
module.exports.signin = (req, res) =>{
    console.log(req.body)
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 6;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * length));
      counter += 1;
    }
    usermodel.findOne({email : req.body.email}).then(result =>{
        console.log(result)

        if (result.password !== req.body.password){
            res.send({ code: 303, message:"password wrong"})
        }else{
            res.send( { email: result.email, code: 300, message: "user found", token: result})
        }
    }).catch(err =>{
        res.send({ code: 404, message:"user not found"})
    })

}



