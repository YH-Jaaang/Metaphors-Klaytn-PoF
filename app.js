const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const authRoutes = require('./server/routes/auth');
const userRoutes = require('./server/routes/user');
const nonUserRoutes = require('./server/routes/nonUser');
const novelRoutes = require('./server/routes/novel');
const itemRoutes = require('./server/routes/item');
const purchaseRoutes = require('./server/routes/purchase');
const nftRoutes = require('./server/routes/nft');
const blockchainRoutes = require('./server/routes/blockchain');
const authJwt = require("./server/middleware/authJwt");

const fileUpload = require('express-fileupload');
const createError = require('http-errors');
const cors = require('cors');

const tx = require('./server/middleware/transaction');

app.use(cors());
// Blockchain Owner Private Key 세팅
if(process.argv[2] == undefined) {
  console.log('required privateKey for smart contract');
  console.log('ex) node bin/www 0x11111');
  process.exit(0);
}
tx.initCaver(process.argv[2]);

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// configuration of the rest API
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// database
const db = require("./server/models");

db.sequelize.sync();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload({
  createParentPath: true
}));

const root = require('path').join(__dirname, 'public');
// const rootJs = require('path').join(__dirname, 'public/javascripts');

// 정적 페이지를 보낸다.
app.use(express.static(root));
// app.use(express.static(rootJs));

// app.listen(4004);
// app.use('/', indexRouter);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/nonuser', nonUserRoutes);
app.use('/api/novel', authJwt.verifyToken, novelRoutes);
app.use('/api/item', authJwt.verifyToken, itemRoutes);
app.use('/api/purchase', authJwt.verifyToken, purchaseRoutes);
app.use('/api/nft', nftRoutes);
app.use('/api/blockchain', blockchainRoutes);
// app.use('/api/admin', authJwt.verifyToken, authJwt.isAdmin, adminRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//pm2 사용할때만
// app.listen(3000);
module.exports = app;
