import {spawn} from 'child_process';
import {join} from 'path';

import {filename} from '../getHello';

export const sayHello = function() {
  return new Promise((resolve, _reject) => {
    const hello = spawn(join(__dirname, `./bin/${filename}`));
    hello.stdout.on('data', (data) => resolve(`${data}`));
  });
}

export default sayHello;
