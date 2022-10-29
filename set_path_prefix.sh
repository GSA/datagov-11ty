branch=$(git rev-parse --abbrev-ref HEAD)

if [ -z $LOCAL ]; then
  export BASEURL=/preview/gsa/datagov-11ty/$branch
fi

if [ "$branch" = "main" ]; then
  echo "Everything is correct.  Leaving configuration alone"
  export BASEURL=/
fi
