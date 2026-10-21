import { spawn } from 'child_process';
import path from 'path';

console.log('🚀 Starting Stayzy Full-Stack System (Frontend + REST API)...');

const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';

// 1. Start Express Server
const serverProcess = spawn(npmCmd, ['run', 'dev'], {
  cwd: path.resolve('server'),
  stdio: 'inherit',
  shell: true,
});

// 2. Start Vite Client
const clientProcess = spawn(npmCmd, ['run', 'dev'], {
  cwd: path.resolve('client'),
  stdio: 'inherit',
  shell: true,
});

function cleanup() {
  console.log('\n🛑 Shutting down Stayzy services...');
  serverProcess.kill();
  clientProcess.kill();
  process.exit(0);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
