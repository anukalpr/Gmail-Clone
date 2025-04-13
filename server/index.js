const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection=require('./Database/DB');
const router=require('./Routes/route');

const port = 4000;
const app = express();

app.use(cors());

app.use(bodyParser.json());
connection();
app.use('/', router);
app.get('/',(res,req)=>{
  req.send("Running");
})
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
