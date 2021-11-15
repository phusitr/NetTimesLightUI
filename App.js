
/* NetTimes UI (Lightweight version)
   Author: Phusit Roongroj <phusit@nectec.or.th>
   Internet Innovation Lab, (INO)
   National Electronics and Computer Technology Center, NECTEC
   Display time server and time sychronization 			
   @V2.0
 */

import React, { useEffect, useState } from "react";
import ReactFullscreen from 'react-easyfullscreen';
import Modali, { useModali } from 'modali';
import  * as conststyle from './Constants'
import DownloadSpecification from './DownloadSpecification';
import DownloadLawInfo from './DownloadLawInfo';
import DisplayCredit from './Credit';


const Menu = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [head, ...tail] = React.Children.toArray(children);
  return (
    <div
      className='menu'
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
     {head}
     {isOpen && <div className='open'>{tail}</div>}
    </div>
  );
};


const Item = ({ children, onClick }) => {
  return (
    <div className='item' onClick={onClick}>
      {children}
    </div>
  );
};


const App = () => {
  const [CurrentDate, setCurrentDate] = useState("Loading...");
  const [CurrentTime, setCurrentTime] = useState("");
  const [CurrentBackgroundTime, setCurrentBackgroundTime] = useState("");
  const [SignalStatus, setSignalStatus] = useState("");
  const [NTPOffset, setNTPOffset] = useState("");
  const [SpecificationModal, shwSpecificationModal] = useModali({
	overlayClose:false,title:'Specification (PDF)-Zoom on an image on mouse move.',
	animated:true,large:false
     }
  );
  const [LawDescModal, shwLawDescModal] = useModali({
	overlayClose:false,title:'Law related documentation (PDF)',animated:true,large:false
   }
  );

  useEffect(() => {
    const intervalId = setInterval (() => {
      const url = "https://<IPAddress>:5842/status";
      const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setCurrentDate(json.en_date);
        setCurrentTime(json.time);
	setCurrentBackgroundTime("88:88:88");
	setSignalStatus(json.status);
	setNTPOffset(json.offset);
      } catch (error) {
        console.log("error", error);
      }
    }
    fetchData();
   },1000);
  return () => clearInterval(intervalId);
}, []);

  return ( 
  <ReactFullscreen>
   {({ ref, onRequest, onExit, onToggle }) => (
   <div  ref={ref}>
    <conststyle.Wrapper>
      <Modali.Modal {...SpecificationModal}><DownloadSpecification/></Modali.Modal>
      <Modali.Modal {...LawDescModal}><DownloadLawInfo/></Modali.Modal>
      <conststyle.Tools>
      <Menu>
        <Item><img src='menu.png' width='28px' alt='' title='Menu'/></Item>
        <Item><img src='fullscreen.png' onClick={()=>onRequest()} width='28px' alt='' title='Full screen'/></Item>
        <Item><img src='fullscreenexit.png' onClick={()=>onExit()} width='28px' alt='' title='Exit full screen'/></Item>
        <Item onClick={()=>onExit()}>
        <img src='document.png' onClick={shwSpecificationModal} width='28px' alt='' title='NetTimes specification'/></Item>
        <Item onClick={()=>onExit()}>
        <img src='justice.png' width='28px' onClick={shwLawDescModal} alt='' title='Justice'/></Item>
      </Menu>
      </conststyle.Tools>
      <conststyle.TimeWrapper>
      <conststyle.TimeBackground>{CurrentBackgroundTime}</conststyle.TimeBackground>
      <conststyle.Time>{CurrentTime}</conststyle.Time>
      </conststyle.TimeWrapper>
      <conststyle.Date>{CurrentDate} </conststyle.Date> 
      <conststyle.Description>
       Signal status: <conststyle.MarkColor>{SignalStatus}</conststyle.MarkColor> <br/>
       NTP Offset: <conststyle.MarkColor>{NTPOffset}</conststyle.MarkColor> ms 
      </conststyle.Description>
     <DisplayCredit />
    </conststyle.Wrapper>
   </div>
  )}
  </ReactFullscreen>
  );
};

export default App;
