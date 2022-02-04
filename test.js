import sayHello from "./index.js";
sayHello().then((data) =>
  console.log(`Got from Hello:\n"${data}"`)
);
