import fetch from 'node-fetch';
import fs from 'fs/promises';

async function getHelloVersion() {
  const packagedata = JSON.parse(await fs.readFile('./package.json'));
  return packagedata.helloVersion;
}

async function getArtifact() {
  const version = await getHelloVersion();
  const url =
    `https://github.com/fredrikj/hello/releases/download/${version}/HelloDarwin`;
  console.log('I GET', url);
  const response = await fetch(url);
  const data = await response.arrayBuffer();
  const path = './bin/Hello';
  await fs.writeFile(path, Buffer.from(data));
  await fs.chmod(path, '755');
}

getArtifact();
