# Use an official Ubuntu 16.04 runtime as a parent image
FROM ubuntu:16.04
LABEL maintainer="Joon Ho Byun <joon731@korea.ac.kr>"

RUN apt-get update
RUN apt-get install git -y
# Install Node.js

ENV NODE_VERSION=16.13.0
RUN apt install -y curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN node --version
RUN npm --version

# Clean up unnecessary files
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Set the working directory to /docker
WORKDIR /docker

# Clone the CashCow repository
RUN git clone https://github.com/joon731/CashCow.git .

# Install Node.js dependencies
RUN npm install express mongoose express-session

# Install PHP
RUN apt-get update && apt-get install -y php

# Set environment variable for MongoDB connection
ENV MONGO_URL="mongodb+srv://root:password1234@cluster0.ynthyfv.mongodb.net/?retryWrites=true&w=majority"

# Expose port 3000 from the container
EXPOSE 3000

# Command to run the application
CMD ["node", "src/index.js"]
