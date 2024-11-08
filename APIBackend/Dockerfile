 # Use an official Node.js image as the base
 FROM node:20

 # Set the working directory inside the container
 WORKDIR /app
 
 # Copy the package.json and package-lock.json files to the working directory
 COPY package*.json ./
 
 # Install dependencies
 RUN npm install
 
 # Copy the rest of the application files to the working directory
 COPY . .
 
 # Expose the port that the app will run on
 EXPOSE 5000
 
 # Command to start the app
 CMD ["node", "--watch", "start"]
 