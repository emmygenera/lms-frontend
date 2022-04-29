import React from "react";
import { Range } from "../../../applocal";

//  data = [

//     { sn: 10, pt: 10 },
//     { sn: 11, pt: 50 },
//     { sn: 12, pt: 40 },
//     { sn: 13, pt: 80 },
//     { sn: 14, pt: 30 },
//     { sn: 15, pt: 50 },
//     { sn: 16, pt: 60 },
//     { sn: 17, pt: 70 },
//     { sn: 18, pt: 80 },
//     { sn: 18, pt: 80 },
//     { sn: 19, pt: 90 },
//     { sn: 20, pt: 19 },
//     { sn: 21, pt: 60 },
//     { sn: 22, pt: 20 },
//     { sn: 23, pt: 4 },
//   ],
export default function VProgressBar({ bottom = 0, height = 100, data = Range(10, 23, (v) => ({ sn: v, pt: Math.random() * v })) }) {
  return (
    <div className="py-4 p-relative d-flex">
      {data.map(({ sn, pt }, idx) => (
        <div key={idx} className="progress progress-bar-vertical" style={{ minHeight: height }}>
          <span className="p-absolute " style={{ bottom: bottom }}>
            {sn}
          </span>
          <div class="progress-bar progress-striped-c" role="progressbar" aria-valuenow={pt} aria-valuemin="0" aria-valuemax="100" style={{ height: pt + "%" }}></div>
        </div>
      ))}
    </div>
  );
}
