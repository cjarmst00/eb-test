const path = require("path");
const axios = require("axios");

// Require the fastify framework and instantiate it
const fastify = require("fastify")({
  // Set this to true for detailed logging:
  logger: false,
  trustProxy: true
});

fastify.get("/devops/license", function(request, reply) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Glitch Node JS',
      'X-SK-API-Key': `${process.env.API_KEY}`
    }
  }
  const url = `${process.env.API_ENDPOINT}/company/${process.env.COMPANY}/policy/${process.env.POLICY}/start`;
  
  const data = {
    'operation': 'license',
    'ip': `${request.ip}`,
    'product': `${request.headers.product}`,
    'version': `${request.headers.version}`,
    'devops-user': `${request.headers['devops-user']}`,
    'devops-key': `${request.headers['devops-key']}`,
    'devops-app': `${request.headers['devops-app']}`,
    'devops-purpose': `${request.headers['devops-purpose']}`,
    'x-refresh-cache': `${request.headers['x-refresh-cache']}`
  }
  
  axios.post(url, data, config)
    .then(res => {
      if (res.data.status === "success") {
        reply.send(res.data.details);
      } else {
        reply.code(401).type('application/json').send("{ \"error\": \"" + res.data.details + "\" }");
      }
    })
    .catch(error => {
      reply.send(error);
    })
});

fastify.get("/devops/auth", function(request, reply) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Glitch Node JS',
      'X-SK-API-Key': `${process.env.API_KEY}`
    }
  }
  const url = `${process.env.API_ENDPOINT}/company/${process.env.COMPANY}/policy/${process.env.POLICY}/start`;
  
  const data = {
    'operation': 'auth',
    'ip': `${request.ip}`,
    'devops-user': `${request.headers['devops-user']}`,
    'devops-key': `${request.headers['devops-key']}`,
    'devops-app': `${request.headers['devops-app']}`,
    'devops-purpose': `${request.headers['devops-purpose']}`,
    'x-refresh-cache': `${request.headers['x-refresh-cache']}`
  }
  
  axios.post(url, data, config)
    .then(res => {
      if (res.data.status === "success") {
        reply.send(res.data.details);
      } else {
        reply.code(401).type('application/json').send("{ \"error\": \"" + res.data.details + "\" }");
      }
    })
    .catch(error => {
      reply.send(error);
    })
});

fastify.get("/devops/check-license", function(request, reply) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Glitch Node JS',
      'X-SK-API-Key': `${process.env.API_KEY}`
    }
  }
  const url = `${process.env.API_ENDPOINT}/company/${process.env.COMPANY}/policy/${process.env.POLICY}/start`;
  
  const data = {
    'operation': 'check-license',
    'ip': `${request.ip}`,
    'license-id': `${request.headers['license-id']}`,
    'devops-app': `${request.headers['devops-app']}`,
    'devops-purpose': `${request.headers['devops-purpose']}`,
  }
  
  axios.post(url, data, config)
    .then(res => {
      if (res.data.status === "success") {
        reply.send(res.data.details);
      } else {
        // Failed check-license returns 404 instead of 401
        reply.code(404).type('application/json').send("{ \"error\": \"" + res.data.details + "\" }");
      }
    })
    .catch(error => {
      reply.send(error);
    })
});

fastify.get("/lb", function(request, reply) {
  reply.send("Server Up");
});

// Run the server and report out to the logs
fastify.listen(process.env.PORT, '0.0.0.0', function(err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Your app is listening on ${address}`);
  fastify.log.info(`server listening on ${address}`);
});