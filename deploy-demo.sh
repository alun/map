#!/bin/sh

scp=scp

if [ -e "`which pscp`" ]; then
	scp=pscp
fi


$scp target/map-full-0.1.js clodo:map/script
$scp web/index.html clodo:map
