import React from "react";
import useFileDownloader from "hooks/useFileDownloader";

const files = [
  {
    name: "Law",
    file:
      "https://internet.nectec.or.th/download/pdf/8fa4fAj2.pdf?rnd=" +
       Math.random(),
       filename:"nettimes_relatedlaw.pdf",
  }
];

const DownloadLawInfo = () => {
  const [downloadFile, downloaderComponentUI] = useFileDownloader();
  const download = (file) => downloadFile(file);

  return (
    <>
      <div className="row">
        <div className="col text-center">
          <div className="row mt-3">
            {files.map((file, idx) => (
              <div className="col" key={idx}>
                <div className="card ">
                  <div className="card-body" key={idx}>
                    <button
                      className="btn btn-primary cursor-pointer text-white"
                      onClick={() => download(file)}
                    >
                      Download 
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {downloaderComponentUI}
      </div>
    </>
  );
};

export default DownloadLawInfo;
