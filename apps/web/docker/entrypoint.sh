#!/bin/sh

set -e

if [ -z "$ENV_FILE" ]; then
  echo "missing env var ENV_FILE"
  exit 1
fi

if [ -z "$ENTRYPOINT_CMD" ]; then
  echo "missing env var ENTRYPOINT_CMD"
  exit 1
fi

env_file="$ENV_FILE"
cmd="$ENTRYPOINT_CMD"

scoped_env=$(env | grep '^__APP___' | cut -d= -f1)
for env_var in $scoped_env
do
  env_val=$(eval echo "\$$env_var")
  echo "window.__app__env.${env_var#__APP___} = '$env_val';" >> "$env_file"
done

if [ "$NODE_ENV" = "development" ]; then
  ls ../../package.json ../*/package.json | entr -rnp bun install &
fi

eval "exec $cmd"
