import React, { useEffect, useState } from "react";

// import config file
import config from "../config.json";

// import navigation and footer components
import Navigation from "../components/Navigation.js";
import Footer from "../components/Footer.js";
import Loading from "../components/Loading.js";

// import icons
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded"; // remove icon
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded"; // unpause icon
import PauseCircleOutlineRoundedIcon from "@mui/icons-material/PauseCircleOutlineRounded"; // pause icon
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded"; // start icon

const startContainer = async (containerId) => {
   try {
      const response = await fetch(`http://${config.API_SERVER_IP}:${config.API_SERVER_PORT}/api/local/container/${containerId}/start`, {
         method: "POST",
      });
      if (response.ok) {
         console.log(`Container ${containerId} started successfully`);
         // Możesz odświeżyć listę kontenerów po wykonaniu akcji
      } else {
         console.error("Failed to start container");
      }
   } catch (error) {
      console.error("Error starting container:", error);
   }
};

const unpauseContainer = async (containerId) => {
   try {
      const response = await fetch(`http://${config.API_SERVER_IP}:${config.API_SERVER_PORT}/api/local/container/${containerId}/unpause`, {
         method: "POST",
      });
      if (response.ok) {
         console.log(`Container ${containerId} unpaused successfully`);
      } else {
         console.error("Failed to unpause container");
      }
   } catch (error) {
      console.error("Error unpausing container:", error);
   }
};

const pauseContainer = async (containerId) => {
   try {
      const response = await fetch(`http://${config.API_SERVER_IP}:${config.API_SERVER_PORT}/api/local/container/${containerId}/pause`, {
         method: "POST",
      });
      if (response.ok) {
         console.log(`Container ${containerId} paused successfully`);
      } else {
         console.error("Failed to pause container");
      }
   } catch (error) {
      console.error("Error pausing container:", error);
   }
};

const stopContainer = async (containerId) => {
   try {
      const response = await fetch(`http://${config.API_SERVER_IP}:${config.API_SERVER_PORT}/api/local/container/${containerId}/stop`, {
         method: "POST",
      });
      if (response.ok) {
         console.log(`Container ${containerId} stopped successfully`);
      } else {
         console.error("Failed to stop container");
      }
   } catch (error) {
      console.error("Error stopping container:", error);
   }
};

const restartContainer = async (containerId) => {
   try {
      const response = await fetch(`http://${config.API_SERVER_IP}:${config.API_SERVER_PORT}/api/local/container/${containerId}/restart`, {
         method: "POST",
      });
      if (response.ok) {
         console.log(`Container ${containerId} restarted successfully`);
      } else {
         console.error("Failed to restart container");
      }
   } catch (error) {
      console.error("Error restarting container:", error);
   }
};

const killContainer = async (containerId) => {
   try {
      const response = await fetch(`http://${config.API_SERVER_IP}:${config.API_SERVER_PORT}/api/local/container/${containerId}/kill`, {
         method: "POST",
      });
      if (response.ok) {
         console.log(`Container ${containerId} killed successfully`);
      } else {
         console.error("Failed to kill container");
      }
   } catch (error) {
      console.error("Error killing container:", error);
   }
};

function Containers() {
   const [loaded, setLoaded] = useState(false);
   const [containers, setContainers] = useState([]);

   useEffect(() => {
      const dataFetch = async () => {
         const containers_response = await await fetch(
            `http://${config.API_SERVER_IP}:${config.API_SERVER_PORT}/api/local/containers` // TODO: extract
         );

         const fetched_containers = await containers_response.json();

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

   if (!loaded) return <Loading />;

   return (
      <div className="Containers">
         <Navigation />
         <div className="row m-0 p-5" /> {/* empty row just for margin */}
         <div className="row m-5">
            {/* containers */}
            <div className="col-lg-12 col-md-7 col-12">
               <div className="p-4 my-3 bg-dark rounded-3 text-light">
                  <h3 className="d-flex align-items-center">
                     <ViewInArIcon />
                     &nbsp;Kontenery
                  </h3>
               </div>

               <div className="p-4 bg-dark rounded-3 text-light text-sm">
                  <div
                     style={{
                        overflowX: "auto",
                        maxWidth: "100%",
                        whiteSpace: "nowrap",
                     }}
                  >
                     <table class="table table-dark table-hover">
                        <thead>
                           <tr>
                              <th scope="col">
                                 Akcje
                                 <br />
                                 <small className="text-secondary" style={{ fontSize: "0.7rem" }}>
                                    start&nbsp; &nbsp;unpause&nbsp;&nbsp;pause&nbsp; &nbsp;stop &nbsp; &nbsp;restart &nbsp; &nbsp;kill
                                 </small>
                              </th>
                              <th scope="col">ID</th>
                              <th scope="col">Nazwa</th>
                              <th scope="col">Obraz</th>
                              <th scope="col">Porty</th>
                              <th scope="col">Utworzony</th>
                              <th scope="col">Stan</th>
                           </tr>
                        </thead>
                        <tbody className="small">
                           {containers.map((image, index) => (
                              <tr key={index}>
                                 <td>
                                    {/* start button */}
                                    <button
                                       type="button"
                                       className={`btn btn-success align-items-center mx-1 p-1 ${image.status === "running" ? "disabled" : ""}`}
                                       onClick={() => image.status !== "running" && startContainer(image.id)} // triggering function works only if state is not 'running'
                                       disabled={image.status === "running" || image.status === "paused"} // button disabled if state is 'running' or 'paused'
                                    >
                                       <PowerSettingsNewRoundedIcon className="text-light" />
                                    </button>

                                    {/* unpause button */}
                                    <button
                                       type="button"
                                       className={`btn btn-info align-items-center mx-1 p-1 ${image.status !== "paused" ? "disabled" : ""}`}
                                       onClick={() => image.status === "paused" && unpauseContainer(image.id)} // triggering function works only if state is 'paused'
                                       disabled={image.status !== "paused"} // button disabled if state is not 'paused'
                                    >
                                       <PlayCircleOutlineRoundedIcon className="text-light" />
                                    </button>

                                    {/* pause button */}
                                    <button
                                       type="button"
                                       className={`btn btn-warning align-items-center mx-1 p-1 ${image.status !== "running" ? "disabled" : ""}`}
                                       onClick={() => image.status === "running" && pauseContainer(image.id)} // triggering function works only if state is 'running'
                                       disabled={image.status !== "running"} // button disabled if state is not 'running'
                                    >
                                       <PauseCircleOutlineRoundedIcon className="text-light" />
                                    </button>

                                    {/* stop button */}
                                    <button
                                       type="button"
                                       className={`btn btn-danger align-items-center mx-1 p-1 ${image.status !== "running" ? "disabled" : ""}`}
                                       onClick={() => image.status === "running" && stopContainer(image.id)} // triggering function works only if state is 'running'
                                       disabled={image.status !== "running"} // button disabled if state is not 'running'
                                    >
                                       <RemoveCircleOutlineRoundedIcon className="text-light" />
                                    </button>

                                    {/* restart button */}
                                    <button type="button" className={`btn btn-primary align-items-center mx-1 p-1 ${image.status !== "running" ? "disabled" : ""}`} onClick={() => image.status === "running" && stopContainer(image.id)} disabled={image.status !== "running"}>
                                       <HistoryRoundedIcon className="text-white" />
                                    </button>

                                    {/* kill button */}
                                    <button type="button" className={`btn btn-danger align-items-center mx-1 p-1 ${image.status !== "running" ? "disabled" : ""}`} onClick={() => image.status === "running" && stopContainer(image.id)} disabled={image.status !== "running"}>
                                       <HighlightOffRoundedIcon />
                                    </button>

                                    {/* previous implementation: <button type="button" className="btn btn-danger align-items-center mx-1 p-1">
                                       <HighlightOffRoundedIcon />
                                    </button> */}
                                 </td>
                                 <td>{image.id.substring(0, 16)}...</td>
                                 <td>{image.name}</td>
                                 <td>{image.image}</td>
                                 <td className="text-success">{image.ports || "-"}</td>
                                 <td>{image.created}</td>
                                 <td>
                                    <span className={`badge py-2 ${image.status === "running" ? "bg-success" : image.status === "paused" ? "bg-warning" : image.status === "exited" ? "bg-danger" : "bg-secondary"}`}>{image.status}</span>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         </div>
         <Footer />
      </div>
   );
}

export default Containers;
