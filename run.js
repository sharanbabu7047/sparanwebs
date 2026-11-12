import { spawn } from 'node:child_process'

console.log('\x1b[36m%s\x1b[0m', '🚀 Starting SyntraWebs: Frontend + Backend concurrently...\n')

// 1. Start Backend Server (Port 5000)
const server = spawn('node', ['server/server.js'], {
  stdio: 'inherit',
  shell: true,
})

// 2. Start Frontend Vite (Port 5173)
const client = spawn('npx', ['vite'], {
  stdio: 'inherit',
  shell: true,
})

// Graceful shutdown on Ctrl+C
const shutdown = () => {
  console.log('\n🛑 Stopping SyntraWebs services...')
  try { server.kill() } catch {}
  try { client.kill() } catch {}
  process.exit(0)
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
process.on('exit', shutdown)

