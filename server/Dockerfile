FROM node:20.11.0

WORKDIR /myapp

COPY package.json .

COPY package-lock.json .

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3001

CMD ["npm","run","serv"]