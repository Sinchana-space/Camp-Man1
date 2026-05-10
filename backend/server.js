const app = require('./src/app');
const pool = require('./src/config/database');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Test database connection
pool.query('SELECT NOW()', (err, result) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
    process.exit(1);
  } else {
    console.log('✅ Database connected at:', result.rows[0].now);
  }
});

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════╗
║  🚀 Camp Management Backend        ║
║  Running on port ${PORT}                ║
║  http://localhost:${PORT}            ║
║  📡 API: http://localhost:${PORT}/api   ║
╚════════════════════════════════════╝
  `);
});