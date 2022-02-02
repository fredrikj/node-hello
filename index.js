import {spawn} from 'child_process';
import {join} from 'path';

function sayHello() {
  return new Promise((resolve, _reject) => {
    const hello = spawn(join(__dirname, './bin/Hello'));
    hello.stdout.on('data', (data) => resolve(`${data}`));
  });
}

export default {
  sayHello
};
