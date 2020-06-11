FROM node:14.4

RUN apt-get update && \ 
    apt-get install -y apt-utils && \
    apt-get upgrade -y

RUN apt-get install -y --no-install-recommends \
    	wget \
        curl \
        git \
        ffmpeg

RUN mkdir /app
WORKDIR /app
COPY ./ ./

RUN npm i

CMD node index.js
