import {spawn} from 'child_process';
import {join} from 'path';
import {Observable, Subscriber, TeardownLogic} from 'rxjs';

import {filename} from './constants';

export const runExecutable = function(args: string[] = []): Observable<number> {
  return new Observable((subscriber: Subscriber<number>) => {
    const child = spawn(join(__dirname, `./bin/${filename}`), args);
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
