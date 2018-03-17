#!/bin/bash

# Login Registry(Docker Hub)
docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD"

# Generate Image Author/Name/Tag
image=angelmsger/bangumi-visualizer:${TRAVIS_TAG:-latest}

# Tag Image
docker tag bangumi-visualizer $image

# Push to Registry(Docker Hub)
docker push $image

# Request Webhook
# curl https://api.angelmsger.com/code?image=$image || /bin/true
