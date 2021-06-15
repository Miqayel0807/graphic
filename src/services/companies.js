export default class Companies {
  _baseUrl = "http://beta.softberg.org/api";

  request = async (uri) => {
    const fullUrl = `${this._baseUrl}/${uri}`;
    const resp = await fetch(fullUrl);

    if (!resp.ok) {
      throw new Error(`Can not fetch data from url ${fullUrl}`);
    }
    return await resp.json();
  };

  getCompanies = () => {
    return this.request("companies");
  };
  getCompanyYearly = (company) => {
    return this.request(`yearly/${company}`);
  };
}
