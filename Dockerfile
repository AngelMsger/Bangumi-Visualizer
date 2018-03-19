FROM node

LABEL maintainer="i@AngelMsger.Com"

COPY . /app

WORKDIR /app

RUN npm install --save

CMD ["node", "bin/www"]
