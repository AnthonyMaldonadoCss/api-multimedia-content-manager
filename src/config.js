module.exports = {
  jwtSecret: process?.env?.JWT_SECRET || 'secretKeyToken',
  jwtExpires: process?.env?.JWT_EXPIRES || '24h',
  allowedRoles:  ['admin', 'creator', 'reader' ]
}