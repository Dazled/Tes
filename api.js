require('dotenv').config(); // Load environment variables
const express = require('express');
const router = express.Router();
const axios = require('axios');
const NodeCache = require('node-cache');

// Konfigurasi Default Axios dengan Akun RajaOngkir
axios.defaults.baseURL = 'https://api.rajaongkir.com/starter';
axios.defaults.headers.common['key'] = process.env.RAJAONGKIR_API_KEY;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// Inisialisasi Cache
const cache = new NodeCache({ stdTTL: 3600 }); // Cache data untuk 1 jam

// Router GET Provinsi
router.get('/provinsi', (req, res) => {
  const cachedData = cache.get('provinces');
  if (cachedData) {
    return res.json(cachedData);
  }

  axios.get('/province')
    .then(response => {
      cache.set('provinces', response.data);
      res.json(response.data);
    })
    .catch(err => {
      console.error('Error fetching provinces:', err);
      res.status(500).json({ error: 'Failed to fetch provinces' });
    });
});

// Router GET Kota berdasarkan province_id
router.get('/kota/:provId', (req, res) => {
  const id = req.params.provId;
  axios.get(`/city?province=${id}`)
    .then(response => res.json(response.data))
    .catch(err => {
      console.error(`Error fetching cities for province ${id}:`, err);
      res.status(500).json({ error: 'Failed to fetch cities' });
    });
});

// Router GET Ongkos Kirim
router.get('/ongkos/:asal/:tujuan/:berat/:kurir', (req, res) => {
  const { asal, tujuan, berat, kurir } = req.params;
  axios.post('/cost', {
      origin: asal,
      destination: tujuan,
      weight: berat,
      courier: kurir
    })
    .then(response => res.json(response.data))
    .catch(err => {
      console.error(`Error fetching shipping cost for ${asal} to ${tujuan}:`, err);
      res.status(500).json({ error: 'Failed to fetch shipping cost' });
    });
});

module.exports = router;
