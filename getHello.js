const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const suffix = {
  win32: 'win32.exe',
  darwin: 'darwin',
  linux: 'linux'
}

const filename = `Hello-${suffix[process.platform]}`;

async function getHelloVersion() {
  const packageJsonFile = path.join(__dirname, 'package.json');
  const packagedata = JSON.parse(fs.readFileSync(packageJsonFile).toString());
  return packagedata.helloVersion;
}

async function getArtifact() {
  const version = await getHelloVersion();
  const url =
    'https://github.com/fredrikj/hello/releases/download/'
    +  `${version}/${filename}`;
  const response = await fetch(url);
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

module.exports = {
  filename
}

getArtifact();
