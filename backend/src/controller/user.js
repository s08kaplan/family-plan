const User = require("../model/user")

module.exports = {
    list: async (req, res) => {
        const data = await User.find()
        res.status(200).send({
            error: false,
            user: data
        })
    },

      create: async (req, res) => {
        const { firstName, lastName, password } = req.body

         if (!(firstName && lastName && password)) {
      return res.status(400).send({ error: true, message: "First name, last name and password are required" });
  }

  // const { hashedPassword, salt } = passwordEncrypt(password);

   
  const newUser = await User.create(req.body);
console.log("new user: ",newUser);
// const newUser = await User.create(req.body)

res.status(201).send({ error: false, message: "User registered successfully", user: newUser });
  },

    // //! AUTO LOGIN:

    // const tokenData = await Token.create({
    //     userId: data._id,
    //     token: encryptFunc(data._id + Date.now())
    // })

 
    

      read: async (req, res) => {
        
    },

      update: async (req, res) => {
        
    },

      delete: async (req, res) => {
        
    },
}