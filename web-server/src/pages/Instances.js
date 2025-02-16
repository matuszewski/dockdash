import React, { useEffect, useState } from "react";

// import config file
import config from "../config.json";

// import navigation and footer components
import Navigation from "../components/Navigation.js";
import Footer from "../components/Footer.js";
import Loading from "../components/Loading.js";

// import icons
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel"; // TODO: implement changing CheckCircleIcon <=> CancelIcon based on instance availabilty

function Instances() {
   const [loaded, setLoaded] = useState(false);
   const [instances, setInstances] = useState([]);

   useEffect(() => {
      const dataFetch = async () => {
         const instances_response = await (
            await fetch(
               `http://${config.API_SERVER_IP}:${config.API_SERVER_PORT}/api/instances`
            )
         ).json();

         setInstances(instances_response);
         setLoaded(true);
      };
      dataFetch();
   }, []);

   if (!loaded) return <Loading />;

   return (
      <div className="Instances">
         <Navigation />
         <div className="row m-5 p-5" /> {/* empty row just for margin */}
         <div className="row m-5">
            {/* instances */}
            <div className="col-lg-4 col-md-7 col-12">
               <div className="p-5 my-3 bg-success rounded-3 text-light">
                  <h1 className="d-flex align-items-center">
                     <DnsOutlinedIcon />
                     &nbsp;Instancje
                  </h1>
               </div>
               <div className="p-5 bg-dark rounded-3 text-light">
                  <table className="table table-dark table-hover">
                     <thead>
                        <tr>
                           <th scope="col">Nazwa</th>
                           <th scope="col">IP</th>
                           <th scope="col">Port</th>
                           <th scope="col" className="text-end">
                              Wersja API
                           </th>
                           <th scope="col" className="text-end" >
                              Status
                           </th>
                        </tr>
                     </thead>
                     <tbody>
                        {Object.keys(instances).map((key, index) => {
                           const instance = instances[key];
                           return (
                              <tr key={index}>
                                 <td>{key}</td>
                                 <td>{instance.ip}</td>
                                 <td>{instance.port}</td>
                                 <td className="text-end">
                                    {instance.api_version}
                                 </td>
                                 <td className="text-end">
                                    {instance.status ? <CheckCircleIcon className='text-success' /> : <CancelIcon  className='text-danger' />}
                                 </td>
                              </tr>
                           );
                        })}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
         <Footer />
      </div>
   );
}

export default Instances;
