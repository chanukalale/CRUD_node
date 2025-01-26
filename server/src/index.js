const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

//middle wares
app.use(express.json());
app.use(cors());

//all currency
app.get("/getAllCurrencies", async(req, res)=>{

   const nameURL = `https://openexchangerates.org/api/currencies.json?app_id=4d6dffca438048f2b13052ab53186504`

   try{

    const namesResponse = await axios.get(nameURL);
    const nameData = namesResponse.data;

    return res.json(nameData);

   }catch(err){
    console.error(err);
   }

});

//get the target amount
app.get("/convert", async(req, res)=>{
    const {date, sourceCurrency, targetCurrency, amountInSourceCurrency} = req.query;

    try{
        const dataURL = `https://openexchangerates.org/api/historical/${date}.json?app_id=4d6dffca438048f2b13052ab53186504`;

        const dataResponse = await axios.get(dataURL);
        const rates = dataResponse.data.rates;

        //rates
        const sourceRate = rates[sourceCurrency];
        const targetRate = rates[targetCurrency];

        //final target value
        const targetAmount = (targetRate / sourceRate) * amountInSourceCurrency;

        return res.json(targetAmount.toFixed(2));

    }catch(err){
        console.error(err);
    }

});

//listen port
app.listen(5000, ()=>{
    console.log("SERVER STARTED")
});
