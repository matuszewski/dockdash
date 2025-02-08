import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

// import config file
import config from "../config.json";

// import custom components
import Navigation from "../components/Navigation.js";
import Footer from "../components/Footer.js";

// import icons
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import GridViewIcon from '@mui/icons-material/GridView';
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

function Raw() {
   const [loaded, setLoaded] = useState(false);
   const [copiedInstancesJSON, setCopiedInstancesJSON] = useState(false);
   const [copiedContainersJSON, setCopiedContainersJSON] = useState(false);
   const [copiedImagesJSON, setCopiedImagesJSON] = useState(false);

   const [instances, setInstances] = useState([]);
   const [images, setImages] = useState([]);
   const [containers, setContainers] = useState([]); // TODO: change as now only single instace of docker data is added here

   useEffect(() => {
      const dataFetch = async () => {

         const instances_response = await (
            await fetch(
               `http://${config.API_SERVER_IP}:${config.API_SERVER_PORT}/api/instances`
            )
         ).json();

         const containers_response = await (
            await fetch(
               `http://${config.API_SERVER_IP}:${config.API_SERVER_PORT}/api/wyse/containers`
            )
         );

         const images_response = await await fetch(
            `http://${config.API_SERVER_IP}:${config.API_SERVER_PORT}/api/wyse/images`
         );

         const fetched_images = await images_response.json();
         const fetched_containers = await containers_response.json();

         console.log("fetched images data:", fetched_images);
         console.log("fetched containers data:", fetched_containers);

         // TODO: flow:
         // for instance
         // check if is accessible
         // if yes
         // get instace data and append to object array
         // if not
         // continue

         // SETUP INSTANCES
         setInstances(instances_response);

 

         // SETUP IMAGES
         if (Array.isArray(fetched_images)) {
            setImages(fetched_images); // set fetched_images as array
            //setImages(JSON.stringify(instance_response, null, 2)); // set fetched_images as string
         } else {
            console.error("fetching images from API failed, array was expected but got:", fetched_images);
            setImages([]); // preventing rendering issues, setting empty array
         }

         // SETUP CONTAINERS
         if (Array.isArray(fetched_containers)) {
            setContainers(fetched_containers); // set fetched_containers as array
            //setImages(JSON.stringify(instance_response, null, 2)); // set fetched_containers as string
         } else {
            console.error("fetching containers from API failed, array was expected but got:", fetched_containers);
            setContainers([]); // preventing rendering issues, setting empty array
         }

         setLoaded(true);
      };
      dataFetch();
   }, []);

   if (!loaded)
      return (
         <div className="Raw" class="row m-0 m-sm-5">
            <div class="col-12 col-xl-4">
               <div class="card card-body shadow text-start border-0 p-4 mb-4">
                  <h5 class="h5 mb-2">
                     <strong>Ładowanie</strong>
                  </h5>
                  <table class="table">
                     <tbody>
                        <tr class="p-0 m-0">
                           <td class="border-0 p-0 m-0">
                              Jeśli ładowanie trwa zbyt długo sprawdź ustawienia
                              adresu serwera API oraz czy jest włączony.
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      );

   return (
      <section className="Raw">
         <Navigation />
         
         <div className="row m-5 p-5" /> {/* empty row just for margin */}

         <div className="row m-5">


            {/* images */}
            <div className="col-lg-8 col-md-7 col-12">

               <div className="p-5 my-3 bg-dark rounded-3 text-light">
                  <h1 className="d-flex align-items-center"><GridViewIcon />&nbsp;Obrazy</h1>
               </div>

               <div className="p-5 bg-dark rounded-3 text-light">
                  <table class="table table-dark table-hover">
                     <thead>
                        <tr>
                           <th scope="col">ID</th>
                           <th scope="col">Nazwa</th>
                           <th scope="col">Tag</th>
                           <th scope="col" className="text-end">Rozmiar</th>
                           <th scope="col" className="text-end">Utworzony</th>
                        </tr>
                     </thead>
                     <tbody>
                        {images.map((image, index) => (
                           <tr key={index}>
                              <td>{image.id_short}</td>
                              <td>{image.name}</td>
                              <td>
                                 <a
                                    href={image.tag}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                 >
                                    {image.tag}
                                 </a>
                              </td>
                              <td className="text-end">{image.size} MB</td>
                              <td className="text-end">{image.created}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
            
            {/* instances */}
            <div className="col-lg-4 col-md-7 col-12">
               <div className="p-5 my-3 bg-success rounded-3 text-light">
                  <h1 className="d-flex align-items-center"><DnsOutlinedIcon />&nbsp;Instancje</h1>
               </div>
               <div className="p-5 bg-dark rounded-3 text-light">
                  <table class="table table-dark table-hover">
                     <thead>
                        <tr>
                           <th scope="col">Nazwa</th>
                           <th scope="col">IP</th>
                           <th scope="col">Port</th>
                           <th scope="col" className="text-end">Wersja API</th>
                           <th scope="col" className="text-end">Status</th>
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
                                 <td className="text-end">{instance.api_version}</td>
                                 <td className="text-end">OK <CheckCircleIcon className="text-success"/></td>
                              </tr>
                           );
                        })}
                     </tbody>
                  </table>
               </div>
            </div>

            {/* containers */}
            <div className="col-lg-12 col-md-7 col-12">

               <div className="p-5  my-3 bg-dark rounded-3 text-light">
                  <h1 className="d-flex align-items-center"><ViewInArIcon />&nbsp;Kontenery</h1>
               </div>

               <div className="p-5 bg-dark rounded-3 text-light">
                  <table class="table table-dark table-hover">
                     <thead>
                        <tr>
                           <th scope="col">ID</th>
                           <th scope="col">Nazwa</th>
                        </tr>
                     </thead>
                     <tbody>
                        {containers.map((image, index) => (
                           <tr key={index}>
                              <td>{image.id}</td>
                              <td>{image.name}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>

         </div>

         <div className="row m-5">

            {/* instances JSON */}
            <div className="col-lg-4 col-md-6 col-12">
               <div className="p-5 bg-dark rounded-3 text-light">
                  <h1 className="d-flex justify-content-between align-items-center">Instancje&nbsp;<span className="badge bg-success">JSON</span>
                     <CopyToClipboard text={JSON.stringify(instances, null, 2)} onCopy={() => setCopiedInstancesJSON(true)}>
                        <button className="btn btn-sm btn-secondary ms-auto p-3">
                           {copiedInstancesJSON ? <span>Skopiowano listę instancji<ContentCopyRoundedIcon /></span> : <ContentCopyIcon />}
                        </button>
                     </CopyToClipboard>
                  </h1>
                  <pre>
                     <code>{JSON.stringify(instances, null, 2)}</code>
                  </pre>
               </div>
            </div>

            {/* instances JSON */}
            <div className="col-lg-4 col-md-6 col-12">
               <div className="p-5 bg-dark rounded-3 text-light">
                  <h1 className="d-flex justify-content-between align-items-center">Kontenery&nbsp;<span className="badge bg-success">JSON</span>
                     <CopyToClipboard text={JSON.stringify(containers, null, 2)} onCopy={() => setCopiedContainersJSON(true)}>
                        <button className="btn btn-sm btn-secondary ms-auto p-3">
                           {copiedContainersJSON ? <span>Skopiowano listę kontenerów<ContentCopyRoundedIcon /></span> : <ContentCopyIcon />}
                        </button>
                     </CopyToClipboard>
                  </h1>
                  <pre>
                     <code>{JSON.stringify(containers, null, 2)}</code>
                  </pre>
               </div>
            </div>

            {/* images JSON */}
            <div className="col-lg-4 col-md-6 col-12">
               <div className="p-5 bg-dark rounded-3 text-light">
                  <h1 className="d-flex justify-content-between align-items-center">Obrazy&nbsp;<span className="badge bg-success">JSON</span>
                     <CopyToClipboard text={JSON.stringify(images, null, 2)} onCopy={() => setCopiedImagesJSON(true)}>
                        <button className="btn btn-sm btn-secondary ms-auto p-3">
                           {copiedImagesJSON ? <span>Skopiowano listę obrazów <ContentCopyRoundedIcon /></span> : <ContentCopyIcon />}
                        </button>
                     </CopyToClipboard>
                  </h1>
                  <pre>
                     <code>{JSON.stringify(images, null, 2)}</code>
                  </pre>
               </div>
            </div>

         </div>

         <Footer />

      </section>
   );
}

export default Raw;
