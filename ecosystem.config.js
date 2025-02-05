// pm2 start ecosystem.config.js --env production
const apps = [
  {
    name: 'ssr-kit',
    script: 'index.js',
    max_memory_restart: '800M',
    instances: 1,
    // error_file: $HOME/.pm2/logs/<app name>-error-<pid>.log
    // out_file: $HOME/.pm2/logs/<app name>-out-<pid>.log
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    env_production: {
      NODE_ENV: 'production',
    },
  },
]

export { apps }
