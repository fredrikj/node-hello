import fetch from 'node-fetch';
import * as fs from 'fs/promises';
import * as path from 'path';

import {filename} from '.';

async function getHelloVersion() {
  const packageJsonFile = path.join(__dirname, '..', 'package.json');
  const packagedata = JSON.parse((await fs.readFile(packageJsonFile)).toString());
  return packagedata.helloVersion;
}

async function getArtifact() {
  const version = await getHelloVersion();
  const url =
    'https://github.com/fredrikj/hello/releases/download/'
    +  `${version}/${filename}`;
  const response = await fetch(url);
  const data = await response.arrayBuffer();
  const bindir = path.join(__dirname, `bin`);
  await fs.mkdir(bindir);
  const binpath =  path.join(bindir, filename);
  await fs.writeFile(binpath, Buffer.from(data));
  await fs.chmod(binpath, '755');
}

getArtifact();
