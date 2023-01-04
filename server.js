import express from 'express';
import dotenv from 'dotenv';
import Connection from './database/db.js';
import DefaultData from './default.js';
import Router from './routes/route.js';
import bodyParser from 'body-parser';
import { v4 as uuid } from 'uuid';
import path, { dirname } from 'path';
import cors from 'cors';
const __dirname = path.resolve();
const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', Router);
app.use(express.static(path.join(__dirname,"./client/build")));
app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,"./client/build/index.html"));
})
const PORT = 8000 || process.env.PORT ;

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(username,password);
app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));
DefaultData();

export let paytmMerchantkey = process.env.PAYTM_MERCHANT_KEY;
export let paytmParams = {};
paytmParams['MID'] = process.env.PAYTM_MID,
paytmParams['WEBSITE'] = process.env.PAYTM_WEBSITE,
paytmParams['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID,
paytmParams['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID,
paytmParams['ORDER_ID'] = uuid(),
paytmParams['CUST_ID'] = process.env.PAYTM_CUST_ID,
paytmParams['TXN_AMOUNT'] = '100',
paytmParams['CALLBACK_URL'] = 'http://localhost:8000/callback'
paytmParams['EMAIL'] = 'kumarinidhi98821@gmail.com'
paytmParams['MOBILE_NO'] = '1234567852'