module.exports = {
  apps : [{
    name: 'NahSh',
    script: '.bin/www',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env_production: {
      NODE_ENV: 'production',
      DEBUG: '-*'
    }
  }]
};
