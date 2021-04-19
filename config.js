module.exports = {
    PORT: process.env.PORT || 3003,
    NODE_ENV: process.env.NODE_ENV || 'production',
    DB_URL: process.env.DB_URL || 'postgresql://postgres@localhost/applicants'
  }
