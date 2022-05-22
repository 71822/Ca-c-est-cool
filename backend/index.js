const express = require("express");
const app = express();
const path = require('path');
var cors = require('cors');
const port = 3000;

var allowedOrigins = ['http://localhost:4200'];
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
  credentials: true,
}));

app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"),
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next()
})

const membre = require("./routes/membre");
const post = require("./routes/post");
const comment = require("./routes/comment");
const auth = require("./routes/auth");

app.use(express.json());
app.use(express.urlencoded({ extended: true, }));
app.get("/", (req, res) => { res.json({ message: "ok" }); });

app.use("/api", membre);
app.use("/api", post);
app.use("/api", comment);
app.use("/api", auth);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
