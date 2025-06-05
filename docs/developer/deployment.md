# Deployment Process

This document outlines the process for deploying the Real-Time Chat Application to production environments.

## Prerequisites

Before deploying, ensure you have:
- Access to a production server or cloud environment
- Docker and Docker Compose installed on the production server (if using containerized deployment)
- A domain name and SSL certificate (for secure HTTPS connections)
- Access to a production MySQL database

## Deployment Options

### Option 1: Docker Deployment (Recommended)

Using Docker provides a consistent deployment environment and simplifies the process.

#### 1. Prepare the Production Environment

Ensure Docker and Docker Compose are installed on your production server:

```bash
# Install Docker (if not already installed)
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose (if not already installed)
curl -L "https://github.com/docker/compose/releases/download/v2.5.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

#### 2. Configure Environment Variables

Create a production `.env` file with appropriate settings:

```
# Database Configuration
DB_HOST=mysql
DB_PORT=3306
DB_USER=production_user
DB_PASSWORD=secure_password
DB_NAME=chat_app_production

# Application Configuration
NODE_ENV=production
PORT=3000
```

#### 3. Create a Production Docker Compose File

Create a `docker-compose.prod.yml` file:

```yaml
version: '3'
services:
  app:
    build: .
    restart: always
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    env_file:
      - .env
    depends_on:
      - mysql

  mysql:
    image: mysql:8
    restart: always
    environment:
      - MYSQL_ROOT_PASSWORD=${DB_PASSWORD}
      - MYSQL_DATABASE=${DB_NAME}
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```

#### 4. Deploy the Application

```bash
# Clone the repository on the production server
git clone <repository-url>
cd realTimeChatApp

# Copy your production .env file to the server
# (This step depends on your deployment workflow)

# Build and start the containers
docker-compose -f docker-compose.prod.yml up -d

# Run database migrations
docker-compose -f docker-compose.prod.yml exec app node src/server/db/migration.js
```

#### 5. Set Up a Reverse Proxy (Optional but Recommended)

For production environments, it's recommended to use Nginx as a reverse proxy to handle SSL termination and serve static assets.

Example Nginx configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name yourdomain.com;

    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Option 2: Traditional Deployment

If you prefer not to use Docker, you can deploy the application directly on the server.

#### 1. Prepare the Server

Ensure Node.js, npm, and MySQL are installed on your production server.

#### 2. Deploy the Application

```bash
# Clone the repository
git clone <repository-url>
cd realTimeChatApp

# Install dependencies
npm install --production

# Configure environment variables
# (Create a .env file with production settings)

# Build the application
npm run build

# Start the application
npm start
```

## Continuous Integration/Continuous Deployment (CI/CD)

For automated deployments, consider setting up a CI/CD pipeline using GitHub Actions, GitLab CI, Jenkins, or another CI/CD tool.

Example GitHub Actions workflow:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to production server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /path/to/realTimeChatApp
            git pull
            docker-compose -f docker-compose.prod.yml up -d --build
```

## Monitoring and Maintenance

After deployment, it's important to monitor the application and perform regular maintenance:

- Set up logging and monitoring using tools like Prometheus, Grafana, or ELK stack
- Regularly back up the database
- Monitor server resources (CPU, memory, disk space)
- Set up alerts for critical issues
- Regularly update dependencies and apply security patches

## Rollback Procedure

In case of deployment issues, follow these steps to rollback to a previous version:

```bash
# If using Docker
docker-compose -f docker-compose.prod.yml down
git checkout <previous-version-tag>
docker-compose -f docker-compose.prod.yml up -d

# If using traditional deployment
npm stop
git checkout <previous-version-tag>
npm install --production
npm run build
npm start
```