import {Observer} from "rxjs";
import runExecutable from "./index";

const observer: Observer<number> = {
  next: console.log,
  error: (error) => console.log(`ERROR: ${error}`),
  complete: () => console.log('COMPLETE')
};

runExecutable(['error']).subscribe(observer);
runExecutable().subscribe(observer);
