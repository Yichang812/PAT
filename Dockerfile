FROM tjanczuk/edgejs:5.0.0

# Set working directory for docker container
WORKDIR /webpat

# Install and cache npm dependencies
COPY package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /webpat && cp -a /tmp/node_modules /webpat

# Load application code
COPY . /webpat

EXPOSE 3000

CMD ["node", "/webpat/index.js"]
