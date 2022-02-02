import React from "react";
import card from "./card.jpg";

const Card = () => {
    return (
        <div className="col-md-3 col-sm-6 card text-left">
            <img className="card-img-top " src={card} alt="not available" style={{ height: "150px" }} />
            <div className="card-body">
                <h4 className="card-title" style={{ fontSize: "13px", fontWeight: "bold" }}>
                    React js
                </h4>
                <p className="card-text" style={{ fontSize: "10px" }}>
                    Nibh fringilla ut morbi amet, fusce amet nulla ut tristique.
                </p>
                <label htmlFor="" style={{ display: "block", fontSize: "10px" }}>
                    Duration
                </label>
                <select style={{ fontSize: "10px", marginTop: "5px" }}>
                    <option value="" selected>
                        1 Month 500 JOD
                    </option>
                    <option value="">2 Month 600 JOD</option>
                    <option value="">3 Month 700 JOD</option>
                </select>
                <button style={{ backgroundColor: "transparent", border: "none", float: "right" }}>
                    <i class="bi bi-cart-plus"></i>
                </button>
            </div>
        </div>
    );
};

export default Card;
