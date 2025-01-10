const express = require('express');
const router = express.Router();
const axios = require('axios');

// Konfigurasi Default Axios dengan Akun RajaOngkir
axios.defaults.baseURL = 'https://api.rajaongkir.com/starter';
axios.defaults.headers.common['key'] = '33b05a2a8e3a5bf53a1f88cb3e082009';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// Router GET Provinsi
router.get('/provinsi', (req, res) => {
  axios.get('/province')
    .then(response => res.json(response.data))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Router GET Kota berdasarkan province_id
router.get('/kota/:provId', (req, res) => {
  const id = req.params.provId;
  axios.get(`/city?province=${id}`)
    .then(response => res.json(response.data))
    .catch(err => res.status(500).json({ error: err.message }));
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
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;

