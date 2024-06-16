# build front-end
FROM node:21.6.1-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install --silent
COPY . /app
RUN npm run build

# move builds to nginx and run the front-end
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]

# pull official base image
# FROM node:21.6.1-alpine AS build

# # set working directory
# WORKDIR /app

# # Copies package.json and package-lock.json to Docker environment
# COPY package*.json ./

# # Installs all node packages
# RUN npm install

# # Copies everything over to Docker environment
# COPY . .

# # Build for production.
# RUN npm run build

# #Install `serve` to run the application.
# RUN npm install -g serve

# # Uses port which is used by the actual application
# EXPOSE 3000

# # Run application
# #CMD [ "npm", "start" ]
# CMD ["serve", "-s", "dist", "-l", "3000"]

# FROM nginx:alpine
# COPY --from=build /app/build /usr/share/nginx/html
# # COPY nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
