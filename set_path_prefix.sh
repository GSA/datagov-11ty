#!/bin/bash

branch=$(git rev-parse --abbrev-ref HEAD)

if [[ "$branch" = "main" ]]; then
  exit 0;
fi

sed -i "s#pathPrefix = '/';#pathPrefix = '/preview/gsa/datagov-11ty/$branch';#g" .eleventy.js
