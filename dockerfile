FROM ubuntu:16.04

WORKDIR /src

RUN apt-get update
RUN apt -y install curl

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt install -y nodejs

CMD ["/bin/bash"]