# DockDash API Documentation

This directory contains the Swagger/OpenAPI documentation for the DockDash API Server.

## Swagger UI Access

Once you start the services with Docker Compose, you can access the Swagger UI at:

**http://localhost:8080**

## API Endpoints Overview

The DockDash API provides the following functionality:

### Health Check
- `GET /` - Simple health check endpoint

### Instance Management
- `GET /api/instances` - Get all configured Docker instances with availability status

### Container Operations
- `GET /api/{instance}/containers` - List all containers for a specific instance
- `POST /api/{instance}/container/{containerId}/{action}` - Perform actions on containers (start, stop, restart, pause, unpause, kill)
- `DELETE /api/{instance}/container/{containerId}` - Remove a container

### Image Management
- `GET /api/{instance}/images` - List all images for a specific instance

### Resource Monitoring
- `GET /api/{instance}/resources` - Get resource usage statistics for all containers

## Usage Examples

### Get all instances
```bash
curl http://localhost:4000/api/instances
```

### Get containers for 'local' instance
```bash
curl http://localhost:4000/api/local/containers
```

### Start a container
```bash
curl -X POST http://localhost:4000/api/local/container/abc123def456/start
```

### Get resource usage
```bash
curl http://localhost:4000/api/local/resources
```

## Development

The `swagger.yaml` file contains the complete OpenAPI 3.0.3 specification for the API. You can:

1. Edit the `swagger.yaml` file to update API documentation
2. Restart the swagger-ui service to see changes: `docker-compose restart swagger-ui`
3. Validate your OpenAPI spec using online tools like [Swagger Editor](https://editor.swagger.io/)

## Configuration

The Swagger UI is configured to:
- Run on port 8080
- Load the API specification from `/swagger/swagger.yaml`
- Point to the API server running on `http://localhost:4000`

You can modify these settings in the `docker-compose.yml` file under the `swagger-ui` service.