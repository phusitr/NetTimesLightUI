import React from "react";
import useImageZoom from "react-image-zoom-hook";

const DefaultZoomApp = () => {
  const imgHeight = 540;
  const imgWidth = 450;
  const lensHeight = 100;
  const lensWidth = 100;
  const previewLensHeight =250;
  const img =
  "https://clock.nectec.or.th/download/images/7faDhGf3.jpg?q=80";
  const previewImg =
  "https://clock.nectec.or.th/download/images/7faDhGf3.jpg?q=100";
  const { DefaultView } = useImageZoom({
    imgHeight,
    imgWidth,
    lensHeight,
    lensWidth,
    previewLensHeight,
    img,
    previewImg
  });

  return ( <> 
	<div className="container">{DefaultView}</div> 
	</>
  ); 
};

export default DefaultZoomApp;
