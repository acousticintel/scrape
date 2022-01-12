module.exports = {
  apps: [{
    name: "scrape",
    cwd: '~/apps/scrape/nextjs',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'production'
    },
  }]
}
