FROM ubuntu:16.04

COPY src /src

WORKDIR /src

RUN apt-get update
RUN apt -y install curl

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt install -y nodejs

RUN npm install

CMD ["/bin/bash"]