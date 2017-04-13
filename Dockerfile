# Image base
FROM ruby:2.3.3
# Maintainer 
MAINTAINER Didier Youn "didier.youn@gmail.com"
# Update package
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
# Define workdir
RUN mkdir /app
VOLUME /app
WORKDIR /app
# Add Gemfile to container
ADD Gemfile /app/Gemfile
ADD Gemfile.lock /app/Gemfile.lock
# Update gem package
RUN bundle install
ADD . /app
