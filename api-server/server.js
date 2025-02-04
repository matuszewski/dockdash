import express from "express";
import cors from "cors";
import colors from "colors"; // for colored logs
import axios from "axios"; // import axios properly

// create express app object
const app = express();

// use the CORS middleware
app.use(cors());

// api server port
const api_server_port = 4000;

// logging rules
const logging_name = "api-server";
const success =
   `${logging_name} `.gray + "[".white + "SUCCESS".green + "]".white + " ";
const info =
   `${logging_name} `.gray + "[".white + "INFO".blue + "]".white + " ";
const failure =
   `${logging_name} `.gray + "[".white + "ERROR".red + "]".white + " ";
const debug =
   `${logging_name} `.gray + "[".white + "DEBUG".yellow + "]".white + " ";

// instances configuration
const instance_configuration = {
   local: {
      ip: "10.20.0.104",
      port: "2375",
      api_version: "1.47",
   },
   wyse: {
      ip: "10.20.0.102",
      port: "2375",
      api_version: "1.47",
   },
   rpi: {
      ip: "10.20.0.105",
      port: "2375",
      api_version: "1.47",
   },
};

function loadInstancesConfig(config_file_path = "./config/instances.json") {
   let instances = {}
   let available_instances = {}
   // TODO: add loading instances from separate json file
   return 0
}

function saveInstancesConfig(config_file_path = "./config/instances.json") {
   // TODO: add saving instances into the same json file
   return 0
}

function loadServerConfig(config_file_path = "./config/settings.json") {
   // TODO: add loading server config from separate json file
   return 0
}

async function checkInstanceAvailablity(instance_id) {
   // get instance config based on instance_id
   const instance_config = instance_configuration[instance_id];
   if (!instance_config) {
      console.error(`${failure}Instance '${instance_id}' not found`);
      return 1; // TODO: check return codes
   }

   const { ip, port, api_version } = instance_configuration[instance_id];
   const url = `http://${ip}:${port}/v${api_version}/info`; // TODO: check default docker url for checking if the api works / status

   // TODO: add running that only in debug/verbose mode
   console.debug(`${debug} checking ${instance_id} instance availabilty via URL: ${url.cyan}`);

   try {
      const response = await axios.get(url, { timeout: 5000 }); // 5 seconds timeout // TODO: pick timeout from config/settings.json
      console.success(`${success} instance ${instance_id} is available`);
      return true

   } catch (error) {
      console.error(`${failure} instance ${instance_id} is not available`);
      return false
   }
}


function checkInstancesAvaiabilty(instance_ids) {
   /* Function for checking many Docker instances availabilty based on provided instances ID's */
   let availability_array = []
   try {
      instances_ids.forEach(instance_id => {
         availability_array.append(checkInstanceAvailablity(instance_id))
      });
      
      return availability_array

   } catch (error) {
      console.error(`${failure} a problem occured in checkInstancesAvaiabilty() function. error: ${error}`);
      return 1
   }
}


// handle GET /
app.get("/", (req, res) => {
   return res.send(
      `<pre><b>dockdash api server</b><br>status: working<br>received a GET HTTP request</pre>`
   );
});

// handle GET request /api/instances
app.get("/api/instances", (req, res) => {
   let k = checkInstanceAvailablity('wyse')
   return res.send(instance_configuration);
});

// handle GET /api/:instance/containers
app.get("/api/:instance/containers", async (req, res) => {
   const instance = req.params.instance;

   console.info(
      `${info}received /api/${instance}/containers/ HTTP GET request from ${
         req.socket.remoteAddress.replace(/^.*:/, "").cyan
      }`
   );

   // resolve instance configuration
   const instanceConfig = instance_configuration[instance];
   if (!instanceConfig) {
      console.error(`${error}instance '${instance}' not found`.red);
      return res.status(404).send("Instance not found");
   }

   const { ip, port, api_version } = instanceConfig;
   const url = `http://${ip}:${port}/v${api_version}/containers/json`;

   try {
      console.info(`${info}fetching containers from ${url.cyan}`);
      const response = await axios.get(url, { timeout: 5000 }); // 5 seconds timeout
      console.info(`${success}Docker API responded successfully`);

      // TODO: add if statement and parametrize
      // return recevied data in unchanged format
      console.info(`${info}reuturning response in unchanged format`);

      return res.json(response.data);

      // TODO: return received data in correct format
      console.info(`${info}parsing response`);
   } catch (error) {
      if (error.response) {
         // server responded with a status code other than 2xx
         console.error(
            `${failure}Docker API returned error: ${error.response.status} ${error.response.statusText}`
               .red
         );
         return res
            .status(error.response.status)
            .send(error.response.statusText || "Error from Docker API");
      } else if (error.request) {
         // no response received
         console.error(`${failure}no response from Docker API`.red);
         return res.status(503).send("No response from Docker API");
      } else {
         // other errors
         console.error(
            `${failure}could not connect to Docker API: ${error.message}`.red
         );
         return res.status(500).send("Error connecting to Docker API");
      }
   }
});

// start the api server
app.listen(api_server_port, () => {
   console.info(
      `${success}DockDash API server is running on port ${api_server_port}`.blue
         .bold
   );
});
