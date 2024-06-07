# # Stage 1: Build the React app
# FROM node:21.6.1 AS build
# WORKDIR /app
# COPY package.json ./
# COPY package-lock.json ./
# RUN npm install
# COPY . ./
# RUN npm run build

# # Stage 2: Serve the React app
# FROM nginx:alpine
# COPY --from=build /app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

# pull official base image
FROM node:21.6.1-alpine

# set working directory
WORKDIR /app

# Copies package.json and package-lock.json to Docker environment
COPY package*.json ./

# Installs all node packages
RUN npm install

# Copies everything over to Docker environment
COPY . .

# Build for production.
RUN npm run build --production

# Install `serve` to run the application.
RUN npm install -g serve

# Uses port which is used by the actual application
EXPOSE 3000

# Run application
#CMD [ "npm", "start" ]
CMD serve -s build
