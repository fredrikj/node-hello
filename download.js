import fetch from 'node-fetch';
import fs from 'fs/promises';

async function getArtifact(url) {
  const response = await fetch(url);
  const data = await response.arrayBuffer();
  const path = './bin/Hello';
  await fs.writeFile(path, Buffer.from(data));
  await fs.chmod(path, '755');
}

getArtifact('https://github.com/fredrikj/hello/releases/download/v1.0.0/Hello');
