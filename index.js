import {spawn} from 'child_process';
import {join} from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const sayHello = function() {
  return new Promise((resolve, _reject) => {
    const hello = spawn(join(__dirname, './bin/Hello'));
    hello.stdout.on('data', (data) => resolve(`${data}`));
  });
}

export default sayHello;
