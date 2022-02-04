import {spawn} from 'child_process';
import {join} from 'path';

const suffix: any = {
  win32: 'win32.exe',
  darwin: 'darwin',
  linux: 'linux'
}

export const filename = `Hello-${suffix[process.platform]}`;

export const sayHello = function() {
  return new Promise((resolve, _reject) => {
    const hello = spawn(join(__dirname, `./bin/${filename}`));
    hello.stdout.on('data', (data) => resolve(`${data}`));
  });
}

export default sayHello;
