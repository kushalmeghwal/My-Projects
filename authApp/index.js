const express=require('express');
const app=express();

require('dotenv').config();

const PORT=process.env.PORT || 4000

app.use(express.json());

const os = require('os');

console.log('OS Type:', os.type());
console.log('Platform:', os.platform());
console.log('Architecture:', os.arch());
console.log('CPU Info:', os.cpus().length + " cores");
console.log('Total Memory:', os.totalmem());
console.log('Free Memory:', os.freemem());
console.log('User Info:', os.userInfo());


require("./config/database.js").connect();

const user = require('./routes/user.js');
app.use('/api/v1',user);

app.listen(PORT,()=>{
    console.log(`app is running on port no ${PORT}`);
})


//cookie parser
//authentication=id varification
//authorization=role/permission of individual 