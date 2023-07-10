#!/bin/sh
docker pull '||registry-source||/widget-platform/demositerus-react-shell:||version||' && \
docker tag '||registry-source||/widget-platform/demositerus-react-shell:||version||' '||registry-destination||/||shell.imageName||:||version||' && \
docker push '||registry-destination||/||shell.imageName||:||version||'