#!/bin/bash

branch=$(git rev-parse --abbrev-ref HEAD)

if [[ "$branch" = "main" ]]; then
  exit 0;
fi

if [ -z $LOCAL ]; then
  export BASEURL=/preview/gsa/datagov-11ty/$branch
fi
