#grabbing a node version 21 image from docker hub
FROM node:21    

#create an app directory and set it as the working directory
WORKDIR /app

#copy every "package" file from the current directory to the working directory (package.json, package-lock.json)
COPY package*.json ./

#install all the dependencies
RUN yarn install

#copy from the current directory to the working directory in the container
COPY . .

#Build to create the compiled files servable from the ./build directory
RUN yarn run build

#install serve globally (to ensure it can be ran anywhere) to serve the compiled files 
RUN yarn global add serve

#expose the port the app will be running on
EXPOSE 3000

#Commands to run the application, serves the compiled files from the ./build directory -s is for single page applications
ENTRYPOINT ["yarn", "serve", "-s", "build", "-l", "tcp://0.0.0.0:3000"]
