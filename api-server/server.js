import express from 'express';
import cors from 'cors';
import request from 'requests';
import colors from 'colors'; // TODO: add colors and debugging to outputs

// create express app object
const app = express();

// make the object use the cors module
app.use(cors());

// set api server port
const api_server_port = 4000

let instances = [
	'127.0.0.1',
	'10.20.0.102'
]

// TODO: use full configuration
let instance_configuration = {
	'local': {
		"ip": "127.0.0.1",
		"port": "2375",
		"api_version": '1.47'
	},
	'wyse': {
		"ip": "10.20.0.102",
		"port": "2375",
		"api_version": '1.47'
	},
	'rpi': {
		"ip": "10.20.0.105",
		"port": "2375",
		"api_version": '1.47'
	}
}

// handle GET /
app.get('/', (req, res) => {
  return res.send('<pre><b>dockdash api server</b><br>status: working<br>received a GET HTTP request</pre>')
});


// handle getting docker instances
app.get('/api/instances', (req, res) => {
	console.info(`[api-server] received /api/instances HTTP GET request`)

  	// set content type header to be in json format
	res.setHeader('Content-Type', 'application/json');

	// send json response
	return res.send(JSON.stringify(instances, null, 3));
});


// handle getting info about specific docker instance
app.get('/api/:instance/info', (req, res) => {
	
	let instance = req.params.instance
	
	console.info(`[api-server] received /api/${instance}/info HTTP GET request from ${req.socket.remoteAddress.replace(/^.*:/, '')}`)

	let found_instance = false

	instances.forEach(inst => {
		if (inst == instance) {
			found_instance = true
			return res.send(JSON.stringify(instance, null, 3));
		}
	});

	if (!found_instance) {
		return res.send('no information object found');
	}

});


// handle getting containers from a given instance
app.get('/api/:instance/containers', (req, res) => {
	// define parameters
	let instance = req.params.instance

	console.info(`[api-server] received /api/${instance}/containers/ HTTP GET request from ${req.socket.remoteAddress.replace(/^.*:/, '')}`)

	// CALL DOCKER API:::::
	// http://127.0.0.1:2375/v1.41/containers/json
	request(`http://10.20.0.102:2375/v1.41/containers/json`, { json: true }, (err, resb, body) => {
		console.log(`[api-server] asked [${instance}] for /containers/json`.green)
		console.log(`[api-server] got /containers/json from [${instance}]: ${body}`.green)
		
		// set response to be in json format and return the answer
		res.setHeader('Content-Type', 'application/json');
		return res.send(JSON.stringify(body, null, 3));
	});

});

//		 handle getting images from a given instance
//		 GET:
//		 /api/:instance/images

//		 PUT etc: actions related to specific container in specific docker instance
//		 /api/:instance/container/:container/:action
//											  stop
//											  start
//											  restart
// 											  remove

// handle actions related to specific container in specific docker instance
app.get('/api/:instance/containers/:container/:action', (req, res) => {
	// define parameters
	let instance = req.params.instance			// docker instance name
	let container = req.params.container		// container name
	let action = req.params.action				// action to take on container (stop/start/restart/remove)

	console.info(`[api-server] received /api/${instance}/container/${container}/${action} HTTP GET request from ${req.socket.remoteAddress.replace(/^.*:/, '')}`)

	// validate request
	if(instance == '' || container == '' || action == '') {
		console.error(`[api-server] did not got docker instance name, container name or action to perform`.red)
		return res.send('not found!')
	}

	// validate action name
	if (!['start', 'stop', 'restart', 'remove'].includes(action)) {
		return res.send('[api-server] wrong action choosen!')
	}

	// call docker api
	request(`http://????????`, { json: true }, (err, res, body) => {
		// print error if exists
		if (err) { return console.log(err); }
		console.log(`[api-server] -> [${instance}] ????`.green)
		console.log(body.url); // TODO: check if needed
		console.log(body.explanation);
	  });
	  // TODO: check and maybe change to json object
	  return res.send(`${instance.toString()}<br>${action}<br>`);
});

// handle POST method // TODO: develop
app.post('/', (req, res) => {
	console.info("[api-server] received / HTTP POST request")
	return res.send('<pre>dockdash API-SERVER\nReceived a POST HTTP method</pre>');
});

// handle PUT method // TODO: develop
app.put('/', (req, res) => {
	console.info("[api-server] received / HTTP PUT request")
	return res.send('Received a PUT HTTP method');
});

// handle DELETE method // TODO: develop
app.delete('/', (req, res) => {
	console.info("[api-server] received / HTTP DELETE request")
	return res.send('Received a DELETE HTTP method');
});

// start api server listening on port
app.listen(api_server_port, () =>
	console.log(`[api-server] is listening on port ${api_server_port}`)
);
