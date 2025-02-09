import React, { useEffect, useState } from "react";

// import navigation and footer components
import Navigation from "../components/Navigation.js";
import Footer from "../components/Footer.js";

// import config file
import config from "../config.json";

import {
   LineChart,
   Line,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   Legend,
   AreaChart,
   PieChart,
   Pie,
   Cell,
   Area,
   ResponsiveContainer,
} from "recharts";

const rdat = {
   cpu: [
      { name: "01", cpu: 50 },
      { name: "02", cpu: 60 },
      { name: "03", cpu: 55 },
      { name: "04", cpu: 70 },
      { name: "05", cpu: 65 },
      { name: "06", cpu: 80 },
      { name: "07", cpu: 85 },
      { name: "08", cpu: 75 },
      { name: "09", cpu: 72 },
      { name: "10", cpu: 65 },
      { name: "11", cpu: 60 },
      { name: "12", cpu: 55 },
      { name: "13", cpu: 50 },
      { name: "14", cpu: 60 },
      { name: "15", cpu: 65 },
   ],
   ram: [
      { name: "01", ram: 400 },
      { name: "02", ram: 230 },
      { name: "03", ram: 350 },
      { name: "04", ram: 400 },
      { name: "05", ram: 390 },
      { name: "06", ram: 500 },
      { name: "07", ram: 540 },
      { name: "08", ram: 480 },
      { name: "09", ram: 420 },
      { name: "10", ram: 400 },
      { name: "11", ram: 210 },
      { name: "12", ram: 220 },
      { name: "13", ram: 300 },
      { name: "14", ram: 310 },
      { name: "15", ram: 290 },
   ],
   disk: [
      { name: "01", disk: 400 },
      { name: "02", disk: 320 },
      { name: "03", disk: 310 },
      { name: "04", disk: 340 },
      { name: "05", disk: 430 },
      { name: "06", disk: 360 },
      { name: "07", disk: 270 },
      { name: "08", disk: 160 },
      { name: "09", disk: 150 },
      { name: "10", disk: 240 },
      { name: "11", disk: 340 },
      { name: "12", disk: 420 },
      { name: "13", disk: 470 },
      { name: "14", disk: 580 },
      { name: "15", disk: 420 },
   ],
};

function MyChart({ resource, color }) {
   const chartData = rdat[resource] || []; // if resource is unknow, this will put empty array

   return (
      <ResponsiveContainer width="100%" height={300}>
         <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Area
               type="monotone"
               dataKey={resource}
               stroke={color || "#ff7300"}
               fill={color}
               strokeWidth={3}
            />
         </AreaChart>
      </ResponsiveContainer>

      // <ResponsiveContainer width="100%" height={300}>
      //   <LineChart data={chartData}>
      //     <CartesianGrid strokeDasharray="3 3" />
      //     <XAxis dataKey="name" />
      //     <YAxis />
      //     <Tooltip />
      //     <Legend />
      //     <Area
      //       type="monotone"
      //       dataKey={resource}
      //       stroke={color || "#ff7300"}
      //       fill={color ? `${color}4D` : "#ff73004D"}
      //       strokeWidth={3}
      //     />

      //     {/* Linia wykresu */}
      //     <Line
      //       type="monotone"
      //       dataKey={resource}
      //       stroke={color}
      //       strokeWidth={3}
      //     />

      //   </LineChart>
      // </ResponsiveContainer>
   );
}

const data2 = [
   { name: "C1", value: 400 },
   { name: "C2", value: 320 },
   { name: "C3", value: 210 },
   { name: "C4", value: 100 },
];

const COLORS = ["#0088FE", "#00C49F", "darkcyan", "slateblue"]; // colors of segments

function MyPieChart( { test_array }) {
   return (
      <ResponsiveContainer width="100%" height={600}>
         <PieChart>
            <Pie
               data={data2}
               cx="50%"
               cy="50%"
               outerRadius={200}
               fill="#8884d8"
               dataKey="value"
               label={{ fontSize: 20 }} // set size of 
            >
               {data2.map((entry, index) => (

                  <Cell
                     key={`cell-${index}`}
                     fill={COLORS[index % COLORS.length]}
                     value={entry.value + (Math.random() * 600 - 300)
                     }

                  />
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
            `http://${config.API_SERVER_IP}:${config.API_SERVER_PORT}/api/wyse/resources` // TODO: multi-instance ?
         );

         const fetched_resources = await resources_response.json();

         // SETUP RESOURCES
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
      <div className="Resources bg-secondary">

         {/* navigation bar*/}
         <Navigation />

         {/* empty row just for margin */}
         <div className="row m-5 p-5" />


         {/* first row */}
         <div className="row m-5">
            <div className="col-lg-3 col-md-3 col-12">
               <div className="p-5 rounded-3 bg-light text-dark">
                  <h1>RAM</h1>
                  <MyPieChart />
               </div>
            </div>

            <div className="col-lg-3 col-md-3 col-12">
               <div className="p-5 rounded-3 bg-light text-dark">
                  <h1>CPU</h1>
                  <MyPieChart />
               </div>
            </div>

            <div className="col-lg-3 col-md-3 col-12">
               <div className="p-5 rounded-3 bg-light text-dark">
                  <h1>Dysk</h1>
                  <MyPieChart />
               </div>
            </div>

            <div className="col-lg-3 col-md-3 col-12">
               <div className="p-5 rounded-3 bg-light text-dark">
                  <h1>Sieć</h1>
                  <MyPieChart />

                  {resources.map((container, index) => (     
            <p>{container.memory_usage}</p>
         ))}   

               </div>
            </div>
         </div>


         {/* second row */}
         <div className="row mx-5">

            <div className="col-lg-8 col-md-7 col-12">

               <div className="p-5 my-3 rounded-3 bg-light text-dark">
                  <h1>RAM</h1>
                  <MyChart resource="ram" color="red" />
               </div>

               <div className="p-5 my-3 rounded-3 bg-light text-dark">
                  <h1>CPU</h1>
                  <MyChart resource="cpu" color="darkcyan" />
               </div>

               <div className="p-5 my-3 rounded-3 bg-light text-dark">
                  <h1>Dysk</h1>
                  <MyChart resource="disk" color="blue" />
               </div>

            </div>


            <div className="col-lg-4 col-md-7 col-12">

              <div className="p-5 my-3 rounded-3 bg-light text-dark">
                <h1>Dysk</h1>
                <MyChart resource="disk" color="orange" />
              </div>

              <div className="p-5 my-3 rounded-3 bg-light text-dark">
                <h1>RAM</h1>
                <MyChart resource="ram" color="purple" />
              </div>

              <div className="p-5 my-3 rounded-3 bg-light text-dark">
                <h1>CPU</h1>
                <MyChart resource="cpu" color="green" />
              </div>

              </div>

         </div>



         {/* third row */}
         <div className="row mx-5">

            <div className="col-lg-8 col-md-7 col-12">

               <div className="p-5 my-3 rounded-3 bg-light text-dark">
                  <h1>Tabela zasobów</h1>

                  <table class="table table-light table-hover">
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

                  <h3>Uwaga</h3>
                  <p>Zasoby sieciowe i dyskowe oznaczają ilość bajtów wysłaną i odebraną / zapisaną i odczytaną od momentu ostatniego uruchomienia kontenera. CPU oznacza ilośc sekund przez ile dany kontener korzysta z zasobów procesora od uruchomienia.</p>

               </div>
            </div>

            <div className="col-lg-4 col-md-7 col-12">

               <div className="p-5 my-3 rounded-3 bg-light text-dark">
                  <h1>Odpowiedź serwera API</h1>

                  <code>
                     <pre>{JSON.stringify(resources, null, 2)}</pre>
                  </code>

               </div>
            </div>

         </div>



         {/* footer bar */}
         <Footer />


      </div>
   );
}

export default Resources;
