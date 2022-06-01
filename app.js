/**
* This is the main Node.js server script for your project
* Check out the two endpoints this back-end API provides in fastify.get and fastify.post below
*/

const path = require("path");
const axios = require("axios");

// Require the fastify framework and instantiate it
const fastify = require("fastify")({
  // Set this to true for detailed logging:
  logger: false,
  trustProxy: true
});

// ADD FAVORITES ARRAY VARIABLE FROM TODO HERE


// Setup our static files
fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "public"),
  prefix: "/" // optional: default '/'
});

// fastify-formbody lets us parse incoming forms
fastify.register(require("fastify-formbody"));

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
  
  //console.log(`DEBUG url = ${url}, config = ${JSON.stringify(config)}, data = ${JSON.stringify(data)}`)
  
  axios.post(url, data, config)
    .then(res => {
      console.log(`DEBUG sending result`);
      console.log(`DEBUG res = ${JSON.stringify(res.data)}`)
      if (res.data.status === "success") {
        reply.send(res.data.details);
      } else {
        reply.code(401).type('application/json').send("{ \"error\": \"" + res.data.details + "\" }");
      }
    })
    .catch(error => {
      console.log(`DEBUG sending error`);
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
  
  //console.log(`DEBUG url = ${url}, config = ${JSON.stringify(config)}, data = ${JSON.stringify(data)}`)
  
  axios.post(url, data, config)
    .then(res => {
      //console.log(`DEBUG sending result`);
      if (res.data.status === "success") {
        reply.send(res.data.details);
      } else {
        reply.code(401).type('application/json').send("{ \"error\": \"" + res.data.details + "\" }");
      }
    })
    .catch(error => {
      //console.log(`DEBUG sending error`);
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
  
  //console.log(`DEBUG url = ${url}, config = ${JSON.stringify(config)}, data = ${JSON.stringify(data)}`)
  
  axios.post(url, data, config)
    .then(res => {
      //console.log(`DEBUG sending result`);
      if (res.data.status === "success") {
        //console.log(`DEBUG sending result`);
        //console.log(`DEBUG res = ${JSON.stringify(res.data)}`)
        reply.send(res.data.details);
      } else {
        reply.code(404).type('application/json').send("{ \"error\": \"" + res.data.details + "\" }");
      }
    })
    .catch(error => {
      //console.log(`DEBUG sending error`);
      reply.send(error);
    })
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