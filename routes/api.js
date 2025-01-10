const express = require("express");
const router = express.Router();
const axios = require("axios");

axios.defaults.baseURL = "https://api.rajaongkir.com/starter";
axios.defaults.headers.common['key']='33b05a2a8e3a5bf53a1f88cb3e082009';
axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded';

router.get('/provinsi',(req,res) => {
    axios.get('/province')
        .then( response =>  res.json(response.data))
        .catch( err => res.send(err))
      
} )
router.get('/kota/:provId',(req,res) => {
    const id = req.params.provId;
    axios.get(`/city?province=${id}`)
        .then( response =>  res.json(response.data))
        .catch( err => res.send(err))
})
router.get('/ongkos/:asal/:tujuan/:berat/:kurir',(req,res) => {
    const params = req.params;
    axios.post('/cost',{
        origin:params.asal,
        destination:params.tujuan,
        weight:params.berat,
        courier:params.kurir})
            .then( response => res.json(response.data))
            .catch( err => res.send(err))
})
module.exports = router