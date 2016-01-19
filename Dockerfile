FROM tjanczuk/edgejs:5.0.0

# update npm
RUN npm update -g

# install dependencies
COPY . /src
RUN cd /src; npm install

EXPOSE 3000
CMD ["node", "/src/index.js"]
