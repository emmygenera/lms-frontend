import React from 'react'
import { Country, State, City } from 'country-state-city';
import { Form, Select } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import { getCities } from '../utils/getCities';

const CountryList = ({ state = false }) => {
  const [country, setCountry] = useState(null);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);

  useEffect(() => {
    if (country) {
      const { states: _states, cities: _cities } = getCities(country, state);
      setCities(_cities);
      setStates(_states);
    }
  }, [country]);

  return (
    <>
      <Form.Item label="Country" name="country" rules={[{ required: true }]}>
        <Select defaultValue={"Please select a country"} onChange={(e) => setCountry(e)}>
          {Country.getAllCountries().map(country => (<Select.Option value={country.isoCode}>{country.name}</Select.Option>))}
        </Select>
      </Form.Item>
      {state &&
        <Form.Item label="State" name="state" rules={[{ required: true }]}>
          <Select defaultValue={"Please select a State"}>
            {states.map(({ name }) => (<Select.Option value={name}>{name}</Select.Option>))}
          </Select>
        </Form.Item>
      }
      <Form.Item label="City" name="city" rules={[{ required: true }]}>
        <Select defaultValue={"Please select a City"}>
          {cities.map(({ name }) => (<Select.Option value={name}>{name}</Select.Option>))}
        </Select>
      </Form.Item>
    </>
  );
}

export default CountryList;