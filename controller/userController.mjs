import mongoose from "mongoose";
import userModel from "../models/user";
//db connection
mongoose.connect("mongodb://localhost:27017/shoppingCart", {
  useNewUrlParser: true
});

let db = mongoose.connections;
db.concat("error", console.error.bind(console, "MongoDB connection error"));

const userController = {};
/**
 * user Login
 * @param  {object} req
 * @param  {object} res
 */
userController.userLogin = (req, res) => {
  userModel.findOne({ email: req.body.email }, (err, doc) => {
    if (err) throw err;
    if (doc === null) res.status(422).send("Email id is not registered");
    if (req.body.password === doc.password) {
      req.session.username = doc.name;
      res.redirect("/home");
    }
  });
};
/**
 * Get User list
 */
userController.getUserList = async () => {
  return new Promise((resolve, reject) => {
    userModel.find({}, (err, doc) => {
      if (err) reject(err);
      resolve(doc);
    });
  });
};
/**
 * Register new user
 * @param  {object} req
 * @param  {object} res
 */
userController.registerUser = (req, res) => {
  let userData = {
    name: req.body.fullname,
    email: req.body.email,
    password: req.body.pass,
  }
  let user = new userModel(userData).save((err, user) => {
    if (err) throw err;
    else res.json({
      Message: "User has been added successfully..."
    });
  })

}

/**
 * @param  {} req
 * @param  {} res
 */
userController.userLogout = (req, res) => {
  req.session.username = '';
  res.redirect('/');
}
/**
 * @param  {} req
 * @param  {} res
 */
userController.deleteUser = (req, res) => {
  userModel.findByIdAndRemove({ _id: req.query.id }, (err, doc) => {
    if (err) res.json(err)
    else res.redirect('/home')
  })
}
/**
 * @param  {} id
 */
userController.editUser = (id) => {
  return new Promise((resolve, reject) => {
    userModel.findOne({ _id: id }, (err, doc) => {
      if (err) reject(err)
      resolve(doc);
    })
  })
}
/**
 * @param  {} req
 * @param  {} res
 */
userController.updateUser = (req, res) => {
  let updatedInfo = {
    name: req.body.fullname,
    email: req.body.email
  }
  userModel.findOneAndUpdate(req.body.id, updatedInfo, (err, doc) => {
    if (err) res.json(err);
    else res.redirect('/home')
  })
}
export default userController;
