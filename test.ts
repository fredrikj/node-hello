import sayHello from "./index";
sayHello().then((data) =>
  console.log(`Got from Hello:\n"${data}"`)
);
