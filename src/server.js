const path = require('path');
const { spawn } = require('child_process');


// This class creates instances, which can be used to interact with our Tornado server
class Server {
  constructor() {
    // this.pythonPath = path.join(__dirname, 'backend/venv/Scripts/python');
    // this.serverScriptPath = path.join(__dirname, 'backend/server.py');
    this.serverExePath = path.join(__dirname, 'backend/dist/server/server.exe');
  }

  launchServer() {
    // this.server = spawn(this.pythonPath, [this.serverScriptPath]);
    this.server = spawn(this.serverExePath);

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
