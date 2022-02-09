import {spawn} from 'child_process';
import {join} from 'path';
import {Observable, Subscriber, TeardownLogic} from 'rxjs';

import {filename} from './constants';

export const runExecutable = function(): Observable<number> {
  return new Observable((subscriber: Subscriber<number>) => {
    const child = spawn(join(__dirname, `./bin/${filename}`));
    child.stdout.on('data', (data) => {
      const progress = parseInt(data.toString(), 10);
      if (progress === 100) {
        return subscriber.complete();
      }
      subscriber.next(progress);
    });
    child.stderr.on('data', (data) => {
      subscriber.error(data.toString());
    });
    const cleanupLogic: TeardownLogic = function() {
      child.kill();
    }
    return cleanupLogic;
  });
}

export default runExecutable;
