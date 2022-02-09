const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const {filename} = require('./constants');

async function getVersion() {
  const packageJsonFile = path.join(__dirname, 'package.json');
  const packagedata = JSON.parse(fs.readFileSync(packageJsonFile).toString());
  return packagedata.artifactVersion;
}

async function getArtifact() {
  const version = await getVersion();
  const url =
    'https://github.com/fredrikj/hello/releases/download/'
    +  `${version}/${filename}`;
  console.log(`GET ${url}`);
  const response = await fetch(url);
  if (response.status !== 200) {
    const errorMsg = `${response.status} ${await response.text()}`;
    throw Error(errorMsg);
  }
  const data = await response.arrayBuffer();
  const distdir = path.join(__dirname, `dist`);
  if (!fs.existsSync(distdir)) {
    fs.mkdirSync(distdir);
  }
  const bindir = path.join(distdir, `bin`);
  if (!fs.existsSync(bindir)) {
    fs.mkdirSync(bindir);
  }
  const binpath =  path.join(bindir, filename);
  fs.writeFileSync(binpath, Buffer.from(data));
  fs.chmodSync(binpath, '755');
}

getArtifact();
