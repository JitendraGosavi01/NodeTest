import express from "express";
import userRouter from "./routes/userRoute";
import cookieSession from "cookie-session";
import userController from "./controller/userController";
const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(
  cookieSession({
    name: "session",
    keys: ["secret1", "secret2"]
  })
);
//set view engine
app.set("view engine", "ejs");
//set asset folder as static
app.use(express.static("public"));

/**
 * Render default view
 * @param  {String} /
 * @param  {Object} req
 * @param  {Object} res
 */
app.get("/", (req, res) => {
  console.log(req)
  res.render("user/login");
});

/**
 * Render registration view
 * @param  {String} register
 * @param  {Object} req
 * @param  {Object} res
 */
app.get("/register", (req, res) => {
  res.render("user/register");
});

app.get('/edit', async (req, res) => {
  let userData = {};
  let username = req.session.username;
  await userController.editUser(req.query.id)
    .then(user => {
      userData = user
    }).catch(err => {
      throw err
    })

  res.render('user/edit', { userData, username });
})

/**
 * Render home view
 * @param  {String} home
 * @param  {} req
 * @param  {} res
 */
app.get("/home", async (req, res) => {
  let userList = '';
  await userController
    .getUserList()
    .then(userData => {
      userList = userData;
    })
    .catch(err => {
      console.log(err);
    });
  res.render("home", { username: req.session.username, userList });
});

app.get('/logout', userController.userLogout);
// Routes
app.use("/user", userRouter);


export default app;
