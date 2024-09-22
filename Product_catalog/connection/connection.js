const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/simple')
.then(()=>{
    console.log('Connected Database')
})
.catch((error)=>{
    console.log(error);
})