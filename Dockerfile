# Use an official Ubuntu 16.04 runtime as a parent image
FROM ubuntu:16.04
LABEL maintainer="Joon Ho Byun <joon731@korea.ac.kr>"

# Update package repositories and install necessary packages: git, nodejs, npm, and required tools
RUN apt-get update && apt-get install -y gnupg curl software-properties-common
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y git nodejs npm

# Set up NodeSource repository and add GPG key
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 1655A0AB68576280
RUN echo "deb https://deb.nodesource.com/node_16.x xenial main" > /etc/apt/sources.list.d/nodesource.list

# Update package repositories again and install Node.js
RUN apt-get update && apt-get install -y nodejs

# Clean up unnecessary files
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Set the working directory to /docker
WORKDIR /docker

# Clone the CashCow repository
RUN git clone https://github.com/joon731/CashCow.git .

# Install Node.js dependencies
RUN npm install express mongoose

# Install PHP
RUN apt-get update && apt-get install -y php

# Set environment variable for MongoDB connection
ENV MONGO_URL="mongodb+srv://root:password1234@cluster0.ynthyfv.mongodb.net/?retryWrites=true&w=majority"

# Expose port 3000 from the container
EXPOSE 3000

# Command to run the application
CMD ["node", "src/index.js"]
