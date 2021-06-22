import Header from "../Components/Header/Header";
import Chart from "../Components/Chart/Chart";
import React, { useEffect, useState } from "react";
import Companies from "../services/companies";

const HomePage = () => {

  const [inputData, setInputData] = useState([]);
  const [amount, setAmount] = useState([]);

  const [companyNames, setCompanyNames] = useState([]);

  const fromHeader = (value) => {
    const input = value.map((index) => {
      return parseInt(index);
    });
    setInputData(input);
  };
  const companiesService = new Companies();
  useEffect(() => {
    getCompanies();
  }, []);

  const getCompanies = async () => {
    const companies = await companiesService.getCompanies();
    const names  = companies.data.map((index) => {
      return index.name;
    });

    setCompanyNames(names);
  };

  const getYearlyData = async (url) => {

    const yearlyData = await companiesService.getCompanyYearly(url);

    const quarter = sliceIntoChunks(yearlyData.data, 3);

    const amountData = quarter.map((value => {
      return value.reduce((sum, current) => {
        return sum + current.amount
      }, 0)
    }));

    setAmount(amountData);
  };

  const sliceIntoChunks = (arr, chunkSize) => {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  };

  return (
    <>
      <Header
        names={companyNames}
        inputData={fromHeader}
        yearlyData={getYearlyData}
      />

      {amount.length ?  <Chart
          data={amount}
          inputData={inputData}/> : <p style={{textAlign:'center', fontWeight:'500', fontSize:'25px'}}> Please enter values. </p>}
    </>
  );
};

export default HomePage;
