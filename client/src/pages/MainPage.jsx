import React, {useEffect, useState} from 'react';
import axios from "axios";

function MainPage() {

  //state for the form fields
  const [date, setDate] = useState ("null");
  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [amountInSourceCurrency, setAmountInSoureceCurrency] = useState(0);
  const [amountInTargetCurrency, setAmountInTargetCurrency] = useState(0);
  const [currencyNames, setCurrencyNames] = useState([]);
  const [loading, setLoading] = useState(true);
  
  //handleSubmit method
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const response = await axios.get("http://localhost:5000/convert", {
        params:{
          date,
          sourceCurrency,
          targetCurrency,
          amountInSourceCurrency,
        },
      });

      setAmountInTargetCurrency(response.data);
      setLoading(false);

    }catch(err){
      console.error(err);
    }
  };

  //get all currency names 
  useEffect(()=>{
    const getCurrencynames = async() => {
      try{

        const response = await axios.get(
          "http://localhost:5000/getAllCurrencies");
        
        setCurrencyNames(response.data);  
          

      }catch(err){
        console.error(err);
      }
    }
    getCurrencynames();
  } , []);

  return (
    <div>
      <h1 className="lg:mx-32 text-5xl font-bold text-amber-500 ">Convert Your Currency Instantly</h1>
      <p className="lg:mx-32 text-white opacity-50 py-6">Welcome to quickly convert your currency with accurate, real-time rates. 
         Whether you're preparing for travel or managing global finances,
         our platform offers a fast and secure way to convert your money. 
        Get the most up-to-date rates and complete your conversion with ease, 
        all while avoiding hidden fees or delays.</p>

        <div className="mt-5 flex items-center justify-center flex-col">
          <section className="w-full lg:w-1/2">
            <form onSubmit={handleSubmit}>

              <div className="mb-6">
                <label htmlFor={date} class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>

                <input 
                  onChange={(e)=>setDate(e.target.value)}
                  type="date" 
                  id={date} 
                  name={date} 
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-amber-500 dark:focus:border-amber-500" placeholder="name@email.com" required />
              </div>

              <div className="mb-6">
                <label htmlFor={sourceCurrency} class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Source Currency</label>

                <select 
                onChange={(e)=>setSourceCurrency(e.target.value)}
                  name={sourceCurrency} id={sourceCurrency} value={sourceCurrency} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-amber-500 dark:focus:border-amber-500" placeholder="name@email.com">

                  <option value="">Select the source currency</option>
                    {Object.keys(currencyNames).map((currency)=>(
                      <option className="p-1" key={currency} value={currency}>
                        {currencyNames[currency]}
                      </option>
                    ))}
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor={targetCurrency} class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Target Currency</label>

                <select 
                  onChange={(e)=>setTargetCurrency(e.target.value)}
                  name={targetCurrency} id={targetCurrency} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-amber-500 dark:focus:border-amber-500" placeholder="name@email.com">
                  <option value="">Select target currency</option>
                  {Object.keys(currencyNames).map((currency)=>(
                      <option className="p-1" key={currency} value={currency}>
                        {currencyNames[currency]}
                      </option>
                    ))}
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor={amountInSourceCurrency} class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount in Source Currency</label>

                <input 
                  onChange={(e)=>setAmountInSoureceCurrency(e.target.value)}
                  type="text" 
                  id={amountInSourceCurrency} 
                  name={amountInSourceCurrency} 
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-amber-500 dark:focus:border-amber-500" placeholder="Amount in source currency" required />
              </div>

              <button className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-md">Get the target currency</button>
            </form>
          </section>
        </div>

        {!loading ? <section className="lg:mx-80 text-xl mt-5">
          {amountInSourceCurrency} {currencyNames[sourceCurrency]} is equal to  <span className="text-amber-500 font-bold">{amountInTargetCurrency}</span> in {currencyNames[targetCurrency]}
        </section> : null}
        
        
    </div>
  )
}

export default MainPage
