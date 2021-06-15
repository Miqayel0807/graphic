import Header from "../Components/Header/Header";
import Chart from "../Components/Chart/Chart";
import React, { useEffect, useState } from "react";
import Companies from "../services/companies";

const HomePage = () => {
  const [chartProps, setChartProps] = useState({
    inputData: [],
    amount: [],
    nameUrl: "",
  });

  const [companyNames, setCompanyNames] = useState({
    names: [],
  });

  const fromHeader = (value) => {
    const input = [];
    value.forEach((index) => {
      input.push(parseInt(index));
    });
    setChartProps({
      ...chartProps,
      inputData: input,
    });
  };
  const companiesService = new Companies();
  useEffect(() => {
    getCompanies();
  }, []);

  const getCompanies = async (url) => {
    const companies = await companiesService.getCompanies(url);
    const { names } = companyNames;
    companies.data.forEach((index) => {
      names.push(index.name);
    });

    setCompanyNames({
      ...companyNames,
      names,
    });
  };

  const getYearlyData = async (url) => {
    const yearlyData = await companiesService.getCompanyYearly(url);

    const quarter = sliceIntoChunks(yearlyData.data, 3);

    const quarterData = quarter[0].map((val) => {
      return val.amount;
    });
    const quarterDataSecond = quarter[1].map((val) => {
      return val.amount;
    });

    const quarterDataThird = quarter[2].map((val) => {
      return val.amount;
    });
    const quarterDataFourth = quarter[3].map((val) => {
      return val.amount;
    });
    const amount = [...chartProps.amount];
    amount.push(
      reducer(quarterData),
      reducer(quarterDataSecond),
      reducer(quarterDataThird),
      reducer(quarterDataFourth)
    );
    setChartProps({
      ...chartProps,
      amount,
    });
  };

  const reducer = (array) => {
    return array.reduce((sum, current) => sum + current, 0);
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
        names={companyNames.names}
        inputData={fromHeader}
        yearlyData={getYearlyData}
      />

      <Chart data={chartProps.amount} inputData={chartProps.inputData} />
    </>
  );
};

export default HomePage;
