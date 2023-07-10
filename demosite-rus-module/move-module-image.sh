#!/bin/sh
docker pull '||registry-source||/widget-platform/demositerus-react-module:||version||' && \
docker tag '||registry-source||/widget-platform/demositerus-react-module:||version||' '||registry-destination||/||image-destination||:||version||' && \
docker push '||registry-destination||/||image-destination||:||version||'