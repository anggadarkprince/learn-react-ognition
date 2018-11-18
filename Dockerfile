FROM node:10.13.0

WORKDIR /usr/src/face-react-ognition

COPY ./ ./

RUN npm install

CMD [ "/bin/bash" ]