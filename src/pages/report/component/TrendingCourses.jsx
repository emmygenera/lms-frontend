import React from "react";

export default function TrendingCourses({ sn = 1, title = "", riseCount = 456, rising = true }) {
  return (
    <div className={"overlap-group."}>
      <div className="flex-row. d-flex">
        <div className="col-2">
          <div className=" d-flex  align-items-center">
            <div className="col-4">
              <div className="textpoppins-medium-quick-silver-18px">
                <span className="p/oppins-medium-quick-silver-18px">#{sn}</span>
              </div>
            </div>
            <div className="col-8 .p-2">
              <svg width="34" height="34" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="26" cy="26" r="25.5" stroke="#2130B8" stroke-opacity="0.2" />
                <path
                  d="M23.9042 17.1856L12.556 28.5337C12.2815 28.8083 12.2815 29.2535 12.556 29.5281L15.2491 32.2212C15.4448 32.4168 15.7371 32.4795 15.9958 32.3813C17.0289 31.9892 18.2007 32.24 18.981 33.0204C19.7613 33.8007 20.0121 34.9724 19.62 36.0055C19.5218 36.2643 19.5845 36.5565 19.7802 36.7522L22.4733 39.4453C22.7479 39.7199 23.1931 39.7199 23.4677 39.4453L34.8158 28.0972L23.9042 17.1856Z"
                  fill="#2130B8"
                />
                <path
                  d="M39.4439 22.4748L36.7508 19.7817C36.5551 19.586 36.2628 19.5233 36.0041 19.6215C34.971 20.0136 33.7993 19.7628 33.019 18.9824C32.2386 18.2021 31.9878 17.0304 32.3799 15.9973C32.4781 15.7385 32.4154 15.4463 32.2197 15.2506L29.5266 12.5575C29.252 12.2829 28.8068 12.2829 28.5322 12.5575L24.8985 16.1912L35.8102 27.1029L39.4439 23.4692C39.7185 23.1946 39.7185 22.7494 39.4439 22.4748Z"
                  fill="#2130B8"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="col-5">
          <p className="jakarta-indie-music-festival-2020poppins-medium-black-16px">
            <span className=".poppins-medium-black-16px fw-bold">{title}</span>
          </p>
        </div>
        <div className="col-5 sales-i-nfo-1">
          <div className="d-flex">
            <div className="col-6 overlap-group">
              <div className="number-5poppins-medium-black-20px">
                <span className=".poppins-medium-black-20px">{riseCount}</span>
              </div>
              <div className="placepoppins-medium-stack-14px">
                <span className=".poppins-medium-stack-14px">Sales</span>
              </div>
            </div>
            <div className="col-6 pl-3">
              {rising ? (
                <svg width="71" height="27" viewBox="0 0 71 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="3.71426" height="27" rx="1.85713" transform="matrix(-1 0 0 1 26 0)" fill="#2130B8" />
                  <rect width="3.71426" height="19.6364" rx="1.85713" transform="matrix(-1 0 0 1 18.5718 7.36328)" fill="#2130B8" />
                  <rect width="3.71426" height="8.59091" rx="1.85713" transform="matrix(-1 0 0 1 11.1431 18.4102)" fill="#2130B8" />
                  <rect width="4.19045" height="16.6154" rx="2.09522" transform="matrix(-1 0 0 1 4.19043 10.3828)" fill="#2130B8" />
                  <path d="M49 21L60 10L71 21" fill="#21B830" />
                </svg>
              ) : (
                <svg width="71" height="27" viewBox="0 0 71 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="3.71426" height="27" rx="1.85713" transform="matrix(-1 0 0 1 26 0)" fill="#2130B8" />
                  <rect width="3.71426" height="19.6364" rx="1.85713" transform="matrix(-1 0 0 1 18.5718 7.36328)" fill="#2130B8" />
                  <rect width="3.71426" height="8.59091" rx="1.85713" transform="matrix(-1 0 0 1 11.1431 18.4102)" fill="#2130B8" />
                  <rect width="4.19045" height="16.6154" rx="2.09522" transform="matrix(-1 0 0 1 4.19043 10.3828)" fill="#2130B8" />
                  <path d="M49 10L60 21L71 10" fill="#FF2626" />
                </svg>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="border-bot"></div>
    </div>
  );
}
