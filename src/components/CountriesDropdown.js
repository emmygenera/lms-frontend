import React from "react";
import { Country, State, City } from "country-state-city";
import { Form, Select } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { getCities } from "../utils/getCities";

const CountryList = ({ state = false, className = "", isRequired = true, isCountryRequired = false }) => {
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
      <Form.Item label="Country" name="country" rules={[{ required: isCountryRequired || isRequired }]}>
        <Select
          //
          showSearch
          optionFilterProp="children"
          // onSearch={(v) => console.log(v)}
          filterOption={(input, option) => {
            const childrenValue = String(option?.props?.children).toLowerCase().trim();
            const value = String(option?.props?.value).toLowerCase().trim();
            return childrenValue.startsWith(input);
          }}
          // filterOption={(input, option) => String(option.props.children).toLowerCase().startsWith(input.toLowerCase()) >= 0 || String(option.props.value).toLowerCase().startsWith(input.toLowerCase()) >= 0}
          className={className}
          defaultValue={"Please select a country"}
          onChange={(e) => setCountry(e)}
        >
          {Country.getAllCountries().map((country, idx) => (
            <Select.Option key={idx} value={country.isoCode}>
              {country.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      {state && (
        <Form.Item label="State" name="state" rules={[{ required: isRequired }]}>
          <Select
            showSearch
            optionFilterProp="children"
            // onSearch={(v) => console.log(v)}
            filterOption={(input, option) => {
              const childrenValue = String(option?.props?.children).toLowerCase().trim();
              const value = String(option?.props?.value).toLowerCase().trim();
              return childrenValue.startsWith(input);
            }}
            className={className}
            defaultValue={"Please select a State"}
          >
            {states.map(({ name }, idx) => (
              <Select.Option key={idx} value={name}>
                {name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )}
      <Form.Item label="City" name="city" rules={[{ required: isRequired }]}>
        <Select
          showSearch
          optionFilterProp="children"
          // onSearch={(v) => console.log(v)}
          filterOption={(input, option) => {
            const childrenValue = String(option?.props?.children).toLowerCase().trim();
            const value = String(option?.props?.value).toLowerCase().trim();
            return childrenValue.startsWith(input);
          }}
          className={className}
          defaultValue={"Please select a City"}
        >
          {cities.map(({ name }, idx) => (
            <Select.Option key={idx} value={name}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
};

export default CountryList;
