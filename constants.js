const suffix = {
  win32: 'win32.exe',
  darwin: 'darwin',
  linux: 'linux'
}

const filename = `Hello-${suffix[process.platform]}`;

module.exports = {
  filename
}

