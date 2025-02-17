import express from "express";
import cors from "cors";

import axios from "axios"; // for handling HTTP requests
import colors from "colors"; // for colored logs
import fs from "fs" // for loading and saving to files

import logging from "./logging.js";
const { debug, success, failure, info, banner } = logging;

// create express app object
const app = express();

// use the CORS middleware
app.use(cors());

// api server port
const api_server_port = 4000;


// instances configuration // TODO: remove as will be taken from file
const instance_configuration = {
   local: {
      ip: "127.0.0.1",
      port: "2375",
      api_version: "1.47",
      status: "",
   },
   wyse: {
      ip: "10.20.0.102",
      port: "2375",
      api_version: "1.47",
      status: "",
   },
   rpi: {
      ip: "10.20.0.105",
      port: "2375",
      api_version: "1.47",
      status: "",
   }
};

// initialize instances var
let instances = {}





function loadInstancesConfig(config_file_path = "./config/instances.json") {
   let instances = {}
   try {
      if (fs.existsSync(config_file_path)) {
         const data = fs.readFileSync(config_file_path, "utf8");
         const parsedData = JSON.parse(data);
         instances = parsedData || {};
      } else {
         console.error("Config file not found:", config_file_path);
      }
   } catch (error) {
      console.error("Error loading config file:", error);
   }
   return instances
}




function saveInstancesConfig(instances, config_file_path = "./config/instances.json") {
   try {
       const data = JSON.stringify(instances, null, 4);
       fs.writeFileSync(config_file_path, data, "utf8");
       console.log(`${success} instances config successfully saved to ${config_file_path.green}`);
   } catch (error) {
       console.error(`${failure} error occured while saving instances file: ${error.red}`);
   }
}



// TODO: get from config and make global
const VERBOSE_MODE = true;
const RAW_MODE = false;
const INSTANCE_COMEUP_TIMEOUT = 5000; // 5 seconds

//const config = ?
function loadServerConfig(config_file_path = "./config/settings.json") {
   // TODO: add loading server config from separate json file

   return 0;
}

function formatBytesToMB(bytes) {
   const sizeInMB = bytes / (1024 * 1024); // converting
   return sizeInMB.toFixed(2);
}

async function checkInstanceAvailablity(instance_name) {

   const { ip, port, api_version } = instance_configuration[instance_name];
   const url = `http://${ip}:${port}/v${api_version}/info`; // TODO: check default docker url for checking if the api works / status
   console.log(`${success} URL composed: ${url}`);
   // TODO: add running that only in debug/verbose mode

   console.debug(
      `${debug} checking ${instance_name} instance availabilty via URL: ${url.cyan}`
   );

   try {
      // TODO: fix that
      const response =  await axios.get(url, { timeout: INSTANCE_COMEUP_TIMEOUT }); // 5 seconds timeout // TODO: pick timeout from config/settings.json
      console.log(`${success} instance ${instance_name} is available`);
      return true;
   } catch (error) {
      console.error(`${failure} instance ${instance_name} is not available`);
      return false;
   }
}

function updateInstancesAvailabilty(instances) {
   /* Function for checking many Docker instances availabilty based on provided instances ID's */

   let return_instances = instances

   try {
      Object.entries(instance_configuration).forEach(async ([key, instance]) => {
         let instance_status = await checkInstanceAvailablity(key)

         console.debug(`${debug} instance: ${key},\t ip: ${instance.ip},\t port: ${instance.port},\t status: ${instance_status}`);
         return_instances[key].status = instance_status
      });

      return return_instances;
   } catch (error) {
      console.error(
         `${failure} a problem occured in updateInstancesAvailabilty(instances) function. error: ${error.red}`
      );
      return 1;
   }
}

// handle GET /
app.get("/", (req, res) => {
   return res.send(
      `<pre><b>dockdash api server</b><br>status: working<br>received a GET HTTP request</pre>`
   );
});

// handle GET request /api/instances
app.get("/api/instances", async (req, res) => {
   // return instances array aleardy checked

   // get availabilty of instances
   let updated_instances = updateInstancesAvailabilty(instances);

   // save
   // TODO
   saveInstancesConfig(updated_instances)

   return res.send(loadInstancesConfig());
});

// handle GET /api/:instance/containers
app.get("/api/:instance/containers", async (req, res) => {
   const instance = req.params.instance;

   console.info(
      `${info} received /api/${instance}/containers/ HTTP GET request from ${
         req.socket.remoteAddress.replace(/^.*:/, "").cyan
      }`
   );

   // resolve instance configuration
   const instanceConfig = instance_configuration[instance];
   if (!instanceConfig) {
      console.error(`${failure} instance '${instance}' not found`.red);
      return res.status(404).send("Instance not found");
   }

   const { ip, port, api_version } = instanceConfig;
   const url = `http://${ip}:${port}/v${api_version}/containers/json`;

   try {
      // call docker instance
      console.info(`${info} fetching containers from ${url.cyan}`);
      const response = await axios.get(url, { timeout: 5000 }); // 5 seconds timeout
      const containers = response.data;
      console.info(`${success} Docker API responded successfully`);

      // use raw data or not
      if (RAW_MODE) {
         // return recevied data in unchanged JSON format
         console.info(`${info} returning response in unchanged format`);
         return res.json(response.data);
      } else {
         // parse and prepare data to return in desired JSON format
         console.info(`${info} parsing response`);

         const return_structure = [];

         containers.forEach((container) => {
            // TODO: finish this part up

            const container_id = container.Id;

            const container_name = container.Names;

            const container_status = container.State
               ? container.State
               : "Unknown"; // Status of the container (e.g., running, exited)

            // Get container's creation date in a friendly Polish format (DD.MM.YYYY, 24-hour format)
            const createdDate = container.Created
               ? new Date(container.Created * 1000).toLocaleString("pl-PL", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false, // 24-hour format
                 })
               : "Unknown date";

            // Extract exposed ports (if any)
            const exposedPorts = container.Ports
               ? container.Ports.map((port) => port.PublicPort).join(", ")
               : "No exposed ports";

            // Get the image used to create the container
            const container_image = container.Image || "No image";

            // Get the size of the container (if available)
            const container_size = container.SizeRootFs
               ? formatBytesToMB(container.SizeRootFs)
               : "Unknown size";

            // Prepare the parsed data
            const container_data = {
               id: container_id,
               name: container_name,
               status: container_status,
               created: createdDate,
               ports: exposedPorts,
               image: container_image,
               size: container_size,
            };

            // Append the parsed data to the return structure
            return_structure.push(container_data);
         });

         // print return structure
         console.debug(
            `${debug} prepared return structure:\n${JSON.stringify(
               return_structure,
               null,
               2
            )}`
         );

         return res.json(return_structure);
      }
   } catch (error) {
      if (error.response) {
         // server responded with a status code other than 2xx
         console.error(
            `${failure} Docker API returned error: ${error.response.status} ${error.response.statusText}`
               .red
         );
         return res
            .status(error.response.status)
            .send(error.response.statusText || "Error from Docker API");
      } else if (error.request) {
         // no response received
         console.error(`${failure} no response from Docker API`.red);
         return res.status(503).send("No response from Docker API");
      } else {
         // other errors
         console.error(
            `${failure} could not connect to Docker API: ${error.message}`.red
         );
         return res.status(500).send("Error connecting to Docker API");
      }
   }
});

// handle GET /api/:instance/images
app.get("/api/:instance/images", async (req, res) => {
   const instance = req.params.instance;

   // print info about a new request
   console.info(
      `${info} received /api/${instance}/images/ HTTP GET request from ${
         req.socket.remoteAddress.replace(/^.*:/, "").cyan
      }`
   );

   // resolve instance configuration
   const instanceConfig = instance_configuration[instance];
   if (!instanceConfig) {
      console.error(`${failure} instance '${instance}' not found`.red);
      return res.status(404).send("Instance not found");
   }

   // prepare endpoint url
   const { ip, port, api_version } = instanceConfig;
   const url = `http://${ip}:${port}/v${api_version}/images/json`;

   try {
      // call docker instance
      console.info(`${info} fetching images from ${url.cyan}`);
      const response = await axios.get(url, { timeout: 5000 }); // 5 seconds timeout
      const images = response.data;
      console.info(`${success} Docker API responded successfully`);

      // use raw data or not
      if (RAW_MODE) {
         // return recevied data in unchanged JSON format
         console.info(`${info} returning response in unchanged format`);
         return res.json(response.data);
      } else {
         // parse and prepare data to return in desired JSON format
         console.info(`${info} parsing response`);

         const return_structure = [];

         images.forEach((image) => {
            const repoTags = image.RepoTags || []; // default to an empty array if RepoTags is undefined

            // extract the image name safely
            const imageName = repoTags[0]
               ? repoTags[0].split(":")[0]
               : "No name";

            // extract the first tag or default to 'latest' if no tag is available
            const firstTag = repoTags[0]
               ? repoTags[0].split(":")[1] || "latest"
               : "latest";

            // get the number of tags
            const numTags = repoTags.length;

            // get the image size in MB
            const imageSize = formatBytesToMB(image.Size); // convert image size to MB

            // get image ID
            const imageId = image.Id || "Unknown ID";
            const imageShortId = imageId.startsWith("sha256:")
               ? imageId.substring(7, 19)
               : imageId.substring(0, 12);

            // get created date in a global, friendly format
            const createdDate = image.Created
               ? new Date(image.Created * 1000).toLocaleString()
               : "unknown date";

            // get created date in local, friendly format
            const formatedCreatedDate = image.Created
               ? new Date(image.Created * 1000).toLocaleString("pl-PL", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false, // 24-hour format
                 })
               : "nieznana data";

            // prepare the parsed data
            const imageData = {
               id: imageId, // image ID
               id_short: imageShortId, // image ID
               name: imageName, // image name
               tag: firstTag, // first tag
               tags: repoTags.map((tag) => tag.split(":")[1] || "latest"), // extract all tags
               tags_number: numTags, // number of tags
               size: imageSize, // image size in MB
               created: formatedCreatedDate, // human-readable created date
            };

            // append the parsed data to the return structure
            return_structure.push(imageData);

            // print parsed data (for debugging)
            console.log(`image ID: ${imageId}`);
            console.log(`image short ID: ${imageShortId}`);

            console.log(`image name: ${imageName.blue}`);
            repoTags.forEach((tag) => {
               const imageTag = tag.split(":")[1] || "latest"; // get only the tag (second part)
               console.log(`tag: ${imageTag.blue}`);
            });
            console.log(`tags: ${numTags}`);
            console.log(`size: ${imageSize.red} MB`);
            console.log(`created: ${formatedCreatedDate}`);
            console.log("----".blue);
         });

         // print return structure
         //console.debug(`${debug} prepared return structure:\n${JSON.stringify(return_structure, null, 2)}`);

         return res.json(return_structure);
      }
   } catch (error) {
      if (error.response) {
         // server responded with a status code other than 2xx
         console.error(
            `${failure} Docker API returned error: ${error.response.status} ${error.response.statusText}`
               .red
         );
         return res
            .status(error.response.status)
            .send(error.response.statusText || "Error from Docker API");
      } else if (error.request) {
         // no response received
         console.error(`${failure} no response from Docker API`.red);
         return res.status(503).send("No response from Docker API");
      } else {
         // other errors
         console.error(
            `${failure} could not connect to Docker API: ${error.message}`.red
         );
         return res.status(500).send("Error connecting to Docker API");
      }
   }
});

// handle GET /api/:instance/resources
app.get("/api/:instance/to_be_removed", async (req, res) => {
   const instance = req.params.instance;

   // print info about a new request
   console.info(
      `${info} received /api/${instance}/resources/ HTTP GET request from ${
         req.socket.remoteAddress.replace(/^.*:/, "").cyan
      }`
   );

   // TODO: implement functionalities
   return res.json({ total: { cpu: 0, ram: 0, disk: 0 } });
});

app.get("/api/:instance/resources", async (req, res) => {
   const instance = req.params.instance;

   console.info(
      `${info} received /api/${instance}/resources/ HTTP GET request from ${
         req.socket.remoteAddress.replace(/^.*:/, "").cyan
      }`
   );

   // resolve instance configuration
   const instanceConfig = instance_configuration[instance];
   if (!instanceConfig) {
      console.error(`${failure} instance '${instance}' not found`.red);
      return res.status(404).send("Instance not found");
   }

   const { ip, port, api_version } = instanceConfig;
   const url = `http://${ip}:${port}/v${api_version}/containers/json?all=false`; // only running containers (they have resource data)
   //const url = `http://${ip}:${port}/v${api_version}/containers/json?all=true`;   // all containers (they do not have resource data)

   try {
      console.info(`${info} fetching container resources from ${url.cyan}`);
      const response = await axios.get(url, { timeout: 5000 });
      const containers = response.data;
      console.info(`${success} Docker API responded successfully`);

      const return_structure = [];

      for (const container of containers) {
         const statsUrl = `http://${ip}:${port}/v${api_version}/containers/${container.Id}/stats?stream=false`;
         try {
            const statsResponse = await axios.get(statsUrl, { timeout: 5000 });
            const stats = statsResponse.data;

            const container_data = {
               id: container.Id.startsWith("sha256:") // convert full container.Id
                  ? container.Id.substring(7, 19)
                  : container.Id.substring(0, 12),

               name: container.Names.join(", ").substring(1),

               //cpu_usage: stats.cpu_stats.cpu_usage.total_usage || "Unknown",
               cpu_usage:
                  (
                     stats.cpu_stats.cpu_usage.total_usage / 1_000_000_000
                  ).toFixed(2) || "Unknown",

               memory_usage: stats.memory_stats.usage
                  ? formatBytesToMB(stats.memory_stats.usage)
                  : "Unknown",
               memory_limit: stats.memory_stats.limit
                  ? formatBytesToMB(stats.memory_stats.limit)
                  : "Unknown",
               network_io: stats.networks
                  ? Object.values(stats.networks).reduce(
                       (acc, net) => acc + net.rx_bytes + net.tx_bytes,
                       0
                    )
                  : "Unknown",
               block_io: stats.blkio_stats.io_service_bytes_recursive
                  ? stats.blkio_stats.io_service_bytes_recursive.reduce(
                       (acc, io) => acc + io.value,
                       0
                    )
                  : "Unknown",
            };

            return_structure.push(container_data);
         } catch (statsError) {
            console.error(
               `${failure} Failed to fetch stats for container ${container.Id}: ${statsError.message}`
                  .red
            );
         }
      }

      console.debug(
         `${debug} prepared return structure: ${JSON.stringify(
            return_structure,
            null,
            2
         )}`
      );
      return res.json(return_structure);
   } catch (error) {
      if (error.response) {
         console.error(
            `${failure} Docker API returned error: ${error.response.status} ${error.response.statusText}`
               .red
         );
         return res
            .status(error.response.status)
            .send(error.response.statusText || "Error from Docker API");
      } else if (error.request) {
         console.error(`${failure} no response from Docker API`.red);
         return res.status(503).send("No response from Docker API");
      } else {
         console.error(
            `${failure} could not connect to Docker API: ${error.message}`.red
         );
         return res.status(500).send("Error connecting to Docker API");
      }
   }
});

// start the api server
app.listen(api_server_port, () => {
   // print banner
   // TODO: unify styles
   console.info(banner)
   console.info('====================== api-server 1.0 ==\n      autor: Krzysztof Matuszewski, nr. 160802')
   console.info(
      `${success} DockDash API server is running on port ${api_server_port}`.blue
         .bold
   );

   // load instances
   instances = loadInstancesConfig()

   // first time check instances availabilty (and save to instances_configuration their statuses)
   let checked_instances = updateInstancesAvailabilty(instances)

   // save instances
   saveInstancesConfig(checked_instances)

   // load instances once more (just as a test)
   //let instances2 = loadInstancesConfig()

});
