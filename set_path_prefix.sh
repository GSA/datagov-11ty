#!/bin/bash

branch=$(git rev-parse --abbrev-ref HEAD)

if [[ "$branch" = "main" ]]; then
  exit 0;
fi

if [ -z $LOCAL ]; then
  echo "Setting prefix path"
  sed -i "s#pathPrefix = '/';#pathPrefix = '/preview/gsa/datagov-11ty/$branch';#g" .eleventy.js
  grep "pathPrefix = '" .eleventy.js
fi
