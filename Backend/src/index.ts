import express from 'express';
import route from './routes/route';
import cors from 'cors';

//const morgan=require('morgan');
const app = express();

app.set('port', process.env.PORT || 3001);

app.use(cors());
//app.use(morgan('dev'));
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb', extended: true}));

app.use('/', route);

app.get('**',(req,res)=>{
    res.send("Aqui no hay nada 🥺");
})


app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});



