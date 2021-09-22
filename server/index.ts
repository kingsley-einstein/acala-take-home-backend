import express from "express";
import hbs from "express-handlebars";
import bcrypt from "bcryptjs";
import path from "path";
import dotenv from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";

dotenv.config();

const app: express.Application = express();

const sessionRecords: { [id: string]: boolean } = {};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 24 * 60 * 60
    },
    resave: false
  })
);
app.use(cookieParser());

app.engine(
  "handlebars",
  hbs({
    layoutsDir: path.join(__dirname, "layouts"),
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app
  .route("*")
  .get(
    (req, res, next) => {
      if (!sessionRecords[req.session.id]) return res.render("password");
      next();
    },
    (req, res) => res.send("Hello")
  )
  .post(
    (req, res, next) => {
      const { password } = req.body;

      if (!bcrypt.compareSync(password, process.env.PW)) {
        return res.render("password", {
          message: "Incorrect Password"
        });
      }
      sessionRecords[req.session.id] = true;
      next();
    },
    (req, res) => res.send("Hello")
  );

app.listen(1259, () => console.log("App running on port 1259"));
