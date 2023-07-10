const express = require("express");
const cors = require("cors");
require("./config");
const PORT=process.env.PORT || 5500;
const app = express();
app.use(cors());
app.use(express.json());

const RegisterSchema = require("./Schema/Register");

app.get("/", (req, res) => {
  res.send("Hello");
});
app.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const emailCheck = await RegisterSchema.findOne({ email: email });
  if (emailCheck) {
    return res.send({
      msg: "Email ALready Used",
      status: 201,
    });
  }
  const data = new RegisterSchema({ firstName, lastName, email, password });
  const result = await data.save();
  if (result._id) {
    return res.json({
      msg: "Successfully Registered",
      status: 200,
    });
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const emailCheck = await RegisterSchema.findOne({ email: email });
  if (!emailCheck) {
    return res.json({ msg: "Incorrect Username", status: false });
  }
  if (emailCheck.password !== password) {
    return res.json({ msg: "Incorrect Password", status: false });
  }
  return res.json({ msg: "Logged In Successfulyy", status: 200 });
});

app.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`)
});
