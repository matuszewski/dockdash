import React, { useEffect, useState } from "react";

// import navigation and footer components
import Navigation from "../components/Navigation.js";
import Footer from "../components/Footer.js";
import LoadingAlert from "../components/LoadingAlert.js";

// import components from recharts library
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, PieChart, Pie, Cell, Area, ResponsiveContainer } from "recharts";

// import config file
import config from "../config.json";

const COLORS = ["#47A025", "#00C49F", "darkcyan", "slateblue", "#F2DD6E", "#FE4A49", "#2AB7CA"];

function ResourcePieChart({ resources, resource }) {
   // prepare chart data
   let chart_subject = resource;
   let chart_data = [];

   try {
      resources.forEach((container) => {
         switch (chart_subject) {
            case "cpu":
               chart_data.push({
                  name: container.name,
                  value: (container.cpu_usage / 100) * 100,
               });
               break;

            case "ram":
               break;

            case "disk":
               chart_data.push({
                  name: container.name,
                  value: container.block_io,
               });
               break;
            case "network":
               chart_data.push({
                  name: container.name,
                  value: container.network_io,
               });
               break;
            default:
               break;
         }
      });
   } catch (error) {
      console.error("could not render resource pie chart");
   }

   // return configured PieChart component
   return (
      <ResponsiveContainer width="100%" height={350}>
         <PieChart>
            <Pie data={chart_data} cx="50%" cy="50%" outerRadius={100} innerRadius={60} paddingAngle={3} fill="#8884d8" dataKey="value" label={{ fontSize: 12 }}>
               {chart_data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} value={entry.value} />
               ))}
            </Pie>
            <Tooltip />
            <Legend />
         </PieChart>
      </ResponsiveContainer>
   );
}

function RamPieChart({ resources }) {
   let arr = [];
   let all_used_ram = 0;

   // collect all ram used from containers
   resources.forEach((container) => {
      let r = 0;
      try {
         r = parseFloat(container.memory_usage);

         if (isNaN(r)) {
            r = 0;
         }
      } catch (error) {
         r = 0;
      }

      all_used_ram += r;
   });

   console.log("all used ram");
   console.log(all_used_ram);

   try {
      // creating ram resource data set for percentage relation (what containers use how much of available ram)
      resources.forEach((container) => {
         let single_container_used_ram = container.memory_usage;

         const v = ((single_container_used_ram * 100) / all_used_ram).toFixed(2);

         let k = parseFloat(v);
         if (!isNaN(single_container_used_ram)) {
            arr.push({
               name: container.name,
               value: k,
            });
         }
      });
   } catch (error) {
      arr = [];
   }

   return (
      <ResponsiveContainer width="100%" height={350}>
         <PieChart>
            <Pie data={arr} cx="50%" cy="50%" outerRadius={100} innerRadius={60} paddingAngle={3} fill="#8884d8" dataKey="value" label={{ fontSize: 12 }}>
               {arr.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} value={entry.value} />
               ))}
            </Pie>
            <Tooltip />
            <Legend />
         </PieChart>
      </ResponsiveContainer>
   );
}

function Resources() {
   const [loaded, setLoaded] = useState(false);
   const [resources, setResources] = useState([]);

   useEffect(() => {
      const dataFetch = async () => {
         const resources_response = await await fetch(
            `http://${config.API_SERVER_IP}:${config.API_SERVER_PORT}/api/local/resources` // TODO: extract
         );

         const fetched_resources = await resources_response.json();

         if (Array.isArray(fetched_resources)) {
            setResources(fetched_resources);
         } else {
            console.error("fetching resources from API failed, array was expected but got:", fetched_resources);
            setResources([]); // preventing rendering issues, setting empty array
         }

         setLoaded(true);
      };
      dataFetch();
   }, []);

   return (
      <div className="Resources">
         {/* navigation bar*/}
         <Navigation />
         <div className="row m-0 p-5" /> {/* empty row just for margin */}
         {/* first row */}
         <div className="row m-5">
            <div className="col-lg-4 col-md-3 col-12">
               <div className="p-4 rounded-3 bg-light text-dark">
                  <h4>CPU</h4>
                  {!loaded ? <LoadingAlert /> : <ResourcePieChart resources={resources} resource={"cpu"} />}
               </div>
            </div>

            <div className="col-lg-4 col-md-3 col-12">
               <div className="p-4 rounded-3 bg-light text-dark">
                  <h4>Dysk</h4>
                  {!loaded ? <LoadingAlert /> : <ResourcePieChart resources={resources} resource={"disk"} />}
               </div>
            </div>

            <div className="col-lg-4 col-md-3 col-12">
               <div className="p-4 rounded-3 bg-light text-dark">
                  <h4>
                     RAM <small className="h6 text-muted">(procentowo)</small>
                  </h4>
                  {!loaded ? <LoadingAlert /> : <RamPieChart resources={resources} />}
               </div>
            </div>
         </div>
         {/* second row */}
         <div className="row mx-5">
            <div className="col-lg-8 col-md-7 col-12">
               <div className="p-4 my-3 rounded-3 bg-light text-dark">
                  <h4>Tabela zasobów</h4>

                  <table class="table table-light table-hover small">
                     <thead>
                        <tr>
                           <th scope="col">ID kontenera</th>
                           <th scope="col">Nazwa</th>
                           <th scope="col">CPU</th>
                           <th scope="col">RAM</th>
                           <th scope="col">RAM Limit</th>
                           <th scope="col">Sieć</th>
                           <th scope="col">Dysk</th>
                        </tr>
                     </thead>
                     <tbody>
                        {resources.map((container, index) => (
                           <tr key={index}>
                              <td>{container.id}</td>
                              <td>{container.name}</td>
                              <td>{container.cpu_usage}</td>
                              <td>{container.memory_usage} MB</td>
                              <td>{container.memory_limit} MB</td>
                              <td>{container.network_io} B</td>
                              <td>{container.block_io} B</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>

                  {!loaded ? <LoadingAlert /> : <span></span>}

                  <h4>Uwaga</h4>
                  <p>Zasoby sieciowe i dyskowe oznaczają ilość bajtów wysłaną i odebraną / zapisaną i odczytaną od momentu ostatniego uruchomienia kontenera. CPU oznacza ilośc sekund przez ile dany kontener korzysta z zasobów procesora od uruchomienia.</p>
                  <p>W przypadku Unknown, niektóre kontenery nie raportują wartości wykorzystywanych przez nie zasobów. Kontenery wyłączone nie raportują żadnych zasobów.</p>
               </div>
            </div>

            <div className="col-lg-4 col-md-7 col-12">
               <div className="p-4 my-3 rounded-3 bg-light text-dark">
                  <h4>Odpowiedź serwera API</h4>
                  {!loaded ? (
                     <LoadingAlert />
                  ) : (
                     <code>
                        <pre>{JSON.stringify(resources, null, 2)}</pre>
                     </code>
                  )}
               </div>
            </div>
         </div>
         {/* footer bar */}
         <Footer />
      </div>
   );
}

export default Resources;
