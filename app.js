const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

(async () => {
  try {
    console.log('🔹 Memulai server...');

    // Tes koneksi DB
    await sequelize.authenticate();
    console.log('✅ Koneksi ke database berhasil');

    // Sinkronisasi model
    await sequelize.sync();
    console.log('📦 Database & tabel sinkron');

    // Routing
    app.use('/api/auth', authRoutes);

    const PORT = 5000;
    app.listen(PORT, () => console.log(`🚀 Server running di port ${PORT}`));
    
  } catch (err) {
    console.error('❌ Terjadi error saat memulai server:', err);
  }
})();
