import React, { useEffect } from "react";

export default function GoogleAnalytics({ pageTitle = "User View Course", pagePath = window.location.hash, googleTagManagerId = "GTM-MTZVMFJ" }) {
  //   useEffect(() => {
  //     // console.log(window.location.search, window.location.hash);
  //     // window.gtag("set", "page", window.location.hash);
  //     // window.gtag("set", "title", pageTitle);
  //     // window.gtag("send", "pageview");
  //   }, []);

  return (
    <div>
      {/* <!-- Google Tag Manager (noscript) --> */}
      {/* https://www.googletagmanager.com/gtag/js?id=G-L9P7J3FDH6 */}
      <iframe
        src={"https://www.googletagmanager.com/ns.html?id=" + googleTagManagerId}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        //
      />
      {/* <!-- End Google Tag Manager (noscript) --> */}
    </div>
  );
}
