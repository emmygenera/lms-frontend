import { Country, State, City } from 'country-state-city';

export const getCities = (country, state = false) => {
  const states = State.getStatesOfCountry(country);
  let cities = state ? City.getCitiesOfState(state) : City.getCitiesOfCountry(country);
  return { states, cities }
}

export const getCountryName = (code) => {
  if (typeof code === 'object') code = code.isoCode;
  const country = Country.getCountryByCode(code);
  return country && country.name || code;
};
