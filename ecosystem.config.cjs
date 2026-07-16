module.exports = {
  apps: [
    {
      name: 'contracting-preacher',
      script: 'npx',
      args: 'next dev --port 3000',
      cwd: '/home/user/webapp',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      watch: false,
      instances: 1,
      exec_mode: 'fork'
    }
  ]
}
