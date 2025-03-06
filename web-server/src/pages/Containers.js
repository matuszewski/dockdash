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

const startContainer = async (containerId, setLoading) => {
   setLoading(containerId);

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
   setLoading(null);
};

const unpauseContainer = async (containerId, setLoading) => {
   setLoading(containerId);

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
   setLoading(null);
};

const pauseContainer = async (containerId, setLoading) => {
   setLoading(containerId);

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
   setLoading(null);
};

const stopContainer = async (containerId, setLoading) => {
   setLoading(containerId);

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
   setLoading(null);
};

const restartContainer = async (containerId, setLoading) => {
   setLoading(containerId);

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
   setLoading(null);
};

const killContainer = async (containerId, setLoading) => {
   setLoading(containerId);

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
   setLoading(null);
};

function Containers() {
   const [loaded, setLoaded] = useState(false);
   const [containers, setContainers] = useState([]);
   const [loadingAction, setLoadingAction] = useState(null);

   const fetchContainers = async () => {
      try {
         const response = await fetch(`http://${config.API_SERVER_IP}:${config.API_SERVER_PORT}/api/local/containers`);
         const data = await response.json();
         if (Array.isArray(data)) {
            setContainers(data);
         } else {
            console.error("Expected an array but got:", data);
            setContainers([]);
         }
         setLoaded(true);
      } catch (error) {
         console.error("Error fetching containers:", error);
      }
   };

   useEffect(() => {
      fetchContainers();
      const interval = setInterval(fetchContainers, 5000); // auto-refresh every 3 sec
      return () => clearInterval(interval);
   }, []);

   // return loading component if site is not loaded yet
   if (!loaded) return <Loading />;

   // return correct content
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
                                       onClick={() => image.status !== "running" && startContainer(image.id, setLoadingAction)} // triggering function works only if state is not 'running'
                                       disabled={image.status === "running" || image.status === "paused"} // button disabled if state is 'running' or 'paused'
                                    >
                                       <PowerSettingsNewRoundedIcon className="text-light" />
                                    </button>

                                    {/* unpause button */}
                                    <button
                                       type="button"
                                       className={`btn btn-info align-items-center mx-1 p-1 ${image.status !== "paused" ? "disabled" : ""}`}
                                       onClick={() => image.status === "paused" && unpauseContainer(image.id, setLoadingAction)} // triggering function works only if state is 'paused'
                                       disabled={image.status !== "paused"} // button disabled if state is not 'paused'
                                    >
                                       <PlayCircleOutlineRoundedIcon className="text-light" />
                                    </button>

                                    {/* pause button */}
                                    <button
                                       type="button"
                                       className={`btn btn-warning align-items-center mx-1 p-1 ${image.status !== "running" ? "disabled" : ""}`}
                                       onClick={() => image.status === "running" && pauseContainer(image.id, setLoadingAction)} // triggering function works only if state is 'running'
                                       disabled={image.status !== "running"} // button disabled if state is not 'running'
                                    >
                                       <PauseCircleOutlineRoundedIcon className="text-light" />
                                    </button>

                                    {/* stop button */}
                                    <button
                                       type="button"
                                       className={`btn btn-danger align-items-center mx-1 p-1 ${image.status !== "running" ? "disabled" : ""}`}
                                       onClick={() => image.status === "running" && stopContainer(image.id, setLoadingAction)} // triggering function works only if state is 'running'
                                       disabled={image.status !== "running"} // button disabled if state is not 'running'
                                    >
                                       <RemoveCircleOutlineRoundedIcon className="text-light" />
                                    </button>

                                    {/* restart button */}
                                    <button type="button" className={`btn btn-primary align-items-center mx-1 p-1 ${image.status !== "running" ? "disabled" : ""}`} onClick={() => image.status === "running" && restartContainer(image.id, setLoadingAction)} disabled={image.status !== "running"}>
                                       <HistoryRoundedIcon className="text-white" />
                                    </button>

                                    {/* kill button */}
                                    <button type="button" className={`btn btn-danger align-items-center mx-1 p-1 ${image.status !== "running" ? "disabled" : ""}`} onClick={() => image.status === "running" && killContainer(image.id, setLoadingAction)} disabled={image.status !== "running"}>
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
                                    <span className={`badge py-2 ${loadingAction === image.id ? "blinking" : ""} ${image.status === "running" ? "bg-success" : image.status === "paused" ? "bg-warning" : image.status === "exited" ? "bg-danger" : "bg-secondary"}`}>
                                       {loadingAction === image.id ? "pending" : image.status}
                                    </span>
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
