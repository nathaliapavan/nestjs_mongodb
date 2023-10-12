# Use the official Node.js image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock ./

# Install project dependencies using Yarn
RUN yarn install

# Copy the rest of your application code to the container
COPY . .

# Expose the port your NestJS application will run on (in this case, 4000)
EXPOSE 4000

# Start your NestJS application
CMD ["yarn", "run", "start:dev"]
