import axios from "axios";
import { baseuri } from "../../assets/uri";

export default function getCountryStates({
    country = false,
    url,
    params,
    success,
    error,
}) {
    let to;
    if (country) {
        to = url || `api/countries`;
    } else {
        to = url || `api/${params}/states`;
    }
    axios
        .get(baseuri(to, ""))
        .then((response) => {
            success(response);
            // console.log(response.data);
        })
        .catch((errors) => {
            error(errors);
            console.log(errors);
        });
}

//
