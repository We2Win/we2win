#!/bin/bash 
sudo apt-get update 
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash - 
sudo apt-get install -y nodejs
sudo apt-get install npm
sudo apt-get install build-essential
install @angular/cli
sudo npm install -g @angular/cli
ng new testing
cd testing
npm install
