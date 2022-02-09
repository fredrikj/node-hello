import {spawn} from 'child_process';
import {join} from 'path';
import {Observable, Subscriber, TeardownLogic} from 'rxjs';

import {filename} from './constants';

export const runExecutable = function(args: string[] = []): Observable<number> {
  return new Observable((subscriber: Subscriber<number>) => {
    const child = spawn(join(__dirname, `./bin/${filename}`), args);
    child.stdout.on('data', (data) => {
      const progress = parseInt(data.toString(), 10);
      subscriber.next(progress);
    });
    child.on('close', (code) => {
      if (code === 0) {
        subscriber.complete();
      } else {
        subscriber.error(code);
      }
    });
    const cleanupLogic: TeardownLogic = function() {
      child.kill();
    }
    return cleanupLogic;
  });
}

export default runExecutable;
