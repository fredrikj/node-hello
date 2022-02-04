import fetch from 'node-fetch';
import fs from 'fs/promises';
import {filename} from './index.js';

async function getHelloVersion() {
  const packagedata = JSON.parse(await fs.readFile('./package.json'));
  return packagedata.helloVersion;
}

async function getArtifact() {
  const version = await getHelloVersion();
  const url =
    'https://github.com/fredrikj/hello/releases/download/'
    +  `${version}/${filename}`;
  console.log('I GET', url);
  const response = await fetch(url);
  const data = await response.arrayBuffer();
  const path = `./bin/${filename}`;
  await fs.writeFile(path, Buffer.from(data));
  await fs.chmod(path, '755');
}

getArtifact();
