import express from 'express';
import cors from 'cors';
import colors from 'colors'; // For colored logs
import axios from 'axios'; // Import axios properly

// create express app object
const app = express();

// use the CORS middleware
app.use(cors());

// API server port
const api_server_port = 4000;


// logging rules
const logging_name = 'api-server'
const success = `${logging_name} `.gray + '['.white + 'SUCCESS'.green + ']'.white + ' '
const info = `${logging_name} `.gray + '['.white + 'INFO'.blue + ']'.white + ' '
const error = `${logging_name} `.gray + '['.white + 'ERROR'.red + ']'.white + ' '
const debug = `${logging_name} `.gray + '['.white + 'DEBUG'.yellow + ']'.white + ' '

// instances configuration
const instance_configuration = {
  local: {
    ip: "127.0.0.1",
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

// handle GET /
app.get("/", (req, res) => {
  return res.send(
    `<pre><b>dockdash api server</b><br>status: working<br>received a GET HTTP request</pre>`
  );
});

app.get("/api/instances", (req, res) => {
	return res.send(instance_configuration);
  });

// handle GET /api/:instance/containers
app.get("/api/:instance/containers", async (req, res) => {
  const instance = req.params.instance;

  console.info(
    `${info}received /api/${instance}/containers/ HTTP GET request from ${req.socket.remoteAddress.replace(/^.*:/, "").cyan}`
  );

  // resolve instance configuration
  const instanceConfig = instance_configuration[instance];
  if (!instanceConfig) {
    console.error(`[ERROR] Instance '${instance}' not found`.red);
    return res.status(404).send("Instance not found");
  }

  const { ip, port, api_version } = instanceConfig;
  const url = `http://${ip}:${port}/v${api_version}/containers/json`;

  try {
    console.info(`${info}fetching containers from ${url.cyan}`);
    const response = await axios.get(url, { timeout: 5000 }); // 5 seconds timeout
    console.info(`${success}Docker API responded successfully`);
    return res.json(response.data); // Respond with the Docker API data
  } catch (error) {
    if (error.response) {
      // server responded with a status code other than 2xx
      console.error(
        `${error}Docker API returned error: ${error.response.status} ${error.response.statusText}`.red
      );
      return res
        .status(error.response.status)
        .send(error.response.statusText || "Error from Docker API");
    } else if (error.request) {
      // no response received
      console.error(`${error}no response from Docker API`.red);
      return res.status(503).send("No response from Docker API");
    } else {
      // other errors
      console.error(`${error}could not connect to Docker API: ${error.message}`.red);
      return res.status(500).send("Error connecting to Docker API");
    }
  }
});

// start the api server
app.listen(api_server_port, () => {
  console.info(
    `${success}DockDash API server is running on port ${api_server_port}`.blue.bold
  );
});
