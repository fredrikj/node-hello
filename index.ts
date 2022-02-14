import {spawn} from 'child_process';
import {join} from 'path';
import {Observable, Subscriber, TeardownLogic} from 'rxjs';

import {filename} from './constants';
export {filename} from './constants';

export const runExecutable = function(
  {
    exePath = join(__dirname, `./bin/${filename}`),
    args = []
  }: {exePath?: string, args?: string[]} = {}): Observable<number> {
  return new Observable((subscriber: Subscriber<number>) => {
    console.log(`runExecutable ${exePath}${args.length ? ` with args ${args}` : ''}`);
    const child = spawn(exePath, args);
    child.on('error', (err) => {
      subscriber.error(err);
    });
    child.stdout.on('data', (data) => {
      const progress = parseInt(data.toString(), 10);
      subscriber.next(progress);
    });
    let stderrLastLine = '';
    child.stderr.on('data', (data) => {
      stderrLastLine = data.toString();
    });
    child.on('close', (code) => {
      if (code === 0) {
        subscriber.complete();
      } else {
        subscriber.error(stderrLastLine);
      }
    });
    const cleanupLogic: TeardownLogic = function() {
      child.kill();
    }
    return cleanupLogic;
  });
}

export default runExecutable;
