import runExecutable from "./index";
runExecutable().subscribe({
  next: console.log,
  error: (error) => console.log(`ERROR: ${error}`),
  complete: () => console.log('COMPLETE')
});
