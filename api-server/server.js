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

// TODO: get from config and make global
const VERBOSE_MODE = true
const RAW_MODE = false

//const config = ?
function loadServerConfig(config_file_path = "./config/settings.json") {
   // TODO: add loading server config from separate json file
   
   return 0
}


function formatBytesToMB(bytes) {
   const sizeInMB = bytes / (1024 * 1024); // converting
   return sizeInMB.toFixed(2);
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
      // call docker instance
      console.info(`${info}fetching containers from ${url.cyan}`);
      const response = await axios.get(url, { timeout: 5000 }); // 5 seconds timeout
      const containers = response.data;
      console.info(`${success}Docker API responded successfully`);

      // use raw data or not
      if (RAW_MODE) {
         // return recevied data in unchanged JSON format
         console.info(`${info}returning response in unchanged format`);
         return res.json(response.data);

      } else {
         // parse and prepare data to return in desired JSON format
         console.info(`${info}parsing response`);

         const return_structure = [];

         containers.forEach(container => { // TODO: finish this part up

            const conatiner_id = container.Id;
            const container_name = 'testName';

            // prepare the parsed data
            const container_data = {
               "id": conatiner_id,
               "name": container_name
            };
      
            // append the parsed data to the return structure
            return_structure.push(container_data);
         });

         // print return structure
         console.debug(`${debug}prepared return structure:\n${JSON.stringify(return_structure, null, 2)}`);

         return res.json(return_structure);
      }

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










// handle GET /api/:instance/images
app.get("/api/:instance/images", async (req, res) => {
   const instance = req.params.instance;

   // print info about a new request
   console.info(
      `${info}received /api/${instance}/images/ HTTP GET request from ${
         req.socket.remoteAddress.replace(/^.*:/, "").cyan
      }`
   );

   // resolve instance configuration
   const instanceConfig = instance_configuration[instance];
   if (!instanceConfig) {
      console.error(`${error}instance '${instance}' not found`.red);
      return res.status(404).send("Instance not found");
   }
   
   // prepare endpoint url
   const { ip, port, api_version } = instanceConfig;
   const url = `http://${ip}:${port}/v${api_version}/images/json`;
   
   try {
      // call docker instance
      console.info(`${info}fetching images from ${url.cyan}`);
      const response = await axios.get(url, { timeout: 5000 }); // 5 seconds timeout
      const images = response.data;
      console.info(`${success}Docker API responded successfully`);

      // use raw data or not
      if (RAW_MODE) {
         // return recevied data in unchanged JSON format
         console.info(`${info}returning response in unchanged format`);
         return res.json(response.data);

      } else {
         // parse and prepare data to return in desired JSON format
         console.info(`${info}parsing response`);

         const return_structure = [];

         images.forEach(image => {
            const repoTags = image.RepoTags || []; // default to an empty array if RepoTags is undefined
      
            // extract the image name safely
            const imageName = repoTags[0] ? repoTags[0].split(':')[0] : 'No name';
      
            // extract the first tag or default to 'latest' if no tag is available
            const firstTag = repoTags[0] ? repoTags[0].split(':')[1] || 'latest' : 'latest';
      
            // get the number of tags
            const numTags = repoTags.length;
      
            // get the image size in MB
            const imageSize = formatBytesToMB(image.Size); // convert image size to MB
      
            // get image ID
            const imageId = image.Id || 'Unknown ID';
            const imageShortId = imageId.startsWith("sha256:") ? imageId.substring(7, 19) : imageId.substring(0, 12);

            // get created date in a global, friendly format
            const createdDate = image.Created ? new Date(image.Created * 1000).toLocaleString() : 'unknown date';
            
            // get created date in local, friendly format
            const formatedCreatedDate = image.Created 
            ? new Date(image.Created * 1000).toLocaleString('pl-PL', {
               day: '2-digit',
               month: '2-digit',
               year: 'numeric',
               hour: '2-digit',
               minute: '2-digit',
               second: '2-digit',
               hour12: false // 24-hour format
            })
            : 'nieznana data';

            // prepare the parsed data
            const imageData = {
               "id": imageId,          // image ID
               "id_short": imageShortId,          // image ID
               "name": imageName,      // image name
               "tag": firstTag,        // first tag
               "tags": repoTags.map(tag => tag.split(':')[1] || 'latest'), // extract all tags
               "tags_number": numTags, // number of tags
               "size": imageSize,      // image size in MB
               "created": formatedCreatedDate  // human-readable created date
            };
      
            // append the parsed data to the return structure
            return_structure.push(imageData);
      
            // print parsed data (for debugging)
            console.log(`image ID: ${imageId}`);
            console.log(`image short ID: ${imageShortId}`);

            console.log(`image name: ${imageName.blue}`);
            repoTags.forEach(tag => {
               const imageTag = tag.split(':')[1] || 'latest'; // get only the tag (second part)
               console.log(`tag: ${imageTag.blue}`);
            });
            console.log(`tags: ${numTags}`);
            console.log(`size: ${imageSize.red} MB`);
            console.log(`created: ${formatedCreatedDate}`);
            console.log('----'.blue);
         });


         // print return structure
         //console.debug(`${debug}prepared return structure:\n${JSON.stringify(return_structure, null, 2)}`);

         return res.json(return_structure);
      }

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


// handle GET /api/:instance/resources
app.get("/api/:instance/resources", async (req, res) => {
   const instance = req.params.instance;

   // print info about a new request
   console.info(
      `${info}received /api/${instance}/resources/ HTTP GET request from ${
         req.socket.remoteAddress.replace(/^.*:/, "").cyan
      }`
   );

   // TODO: implement functionalities
   return res.json({"total": {"cpu": 0, "ram": 0, "disk": 0}});

});



// start the api server
app.listen(api_server_port, () => {
   console.info(
      `${success}DockDash API server is running on port ${api_server_port}`.blue
         .bold
   );
});
