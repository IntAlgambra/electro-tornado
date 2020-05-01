const path = require('path');
const { spawn } = require('child_process');
const process = require('process');

console.log(process.argv);

if (process.argv.includes('development')) {
  console.log('DEEEEEEEv');
}


// This class creates instances, which can be used to interact with our Tornado server
class Server {
  constructor() {
    if (process.argv.includes('development')) {
      const pythonPath = path.join(__dirname, 'backend/venv/Scripts/python');
      const serverScriptPath = path.join(__dirname, 'backend/server.py');
      this.start = () => spawn(pythonPath, [serverScriptPath]);
    } else {
      const serverExePath = path.join(__dirname, 'backend/dist/server/server.exe');
      this.start = () => spawn(serverExePath);
    }
  }

  launchServer() {
    this.server = this.start();

    this.server.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    this.server.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    this.server.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
  }

  stopServer() {
    this.server.kill();
  }
}

module.exports = { Server };
