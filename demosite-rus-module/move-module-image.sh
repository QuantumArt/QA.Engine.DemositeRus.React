#!/bin/sh
docker pull '||registry-source||/widget-platform/demositerus-react-module:||version||' && \
docker tag '||registry-source||/widget-platform/demositerus-react-module:||version||' '||registry-destination||/||module.imageName||:||version||' && \
docker push '||registry-destination||/||module.imageName||:||version||'