import React from "react";

export default function ListItem({ className = "", data, title, onClick, onClickLabel, onClickFav, onClickColor = "rgba(0, 0, 0, 0.5)", renderItems: RenderItems }) {
  return (
    <div className={"bg-white cs-table-style outline-shadow shadow rad_5. p-3 " + className} style={{ borderRadius: 24 }}>
      {title && (
        <div className="row align-items-center">
          <div className="col-8 p-0">
            <p className="fz-1-5 m-0 font-bold">{title}</p>
          </div>
          <div className="col-4 p-0 text-right">
            <button type="button" onClick={onClick} className="btn btn-default">
              {onClickLabel}
              {onClickFav || (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" style={{ width: 4 }}>
                  <path
                    fill={onClickColor}
                    d="M64 360C94.93 360 120 385.1 120 416C120 446.9 94.93 472 64 472C33.07 472 8 446.9 8 416C8 385.1 33.07 360 64 360zM64 200C94.93 200 120 225.1 120 256C120 286.9 94.93 312 64 312C33.07 312 8 286.9 8 256C8 225.1 33.07 200 64 200zM64 152C33.07 152 8 126.9 8 96C8 65.07 33.07 40 64 40C94.93 40 120 65.07 120 96C120 126.9 94.93 152 64 152z"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="divider border-0" />
        </div>
      )}
      <div>
        {/* {data.map((item, idx) => {
          return <RenderItems key={idx} data={item} />;
        })} */}
        {data}
      </div>
      {/* <LinkDown /> */}
    </div>
  );
}
