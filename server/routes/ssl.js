const express = require('express');
const router = express.Router();
const SSLCommerzPayment = require('sslcommerz-lts');
require('dotenv').config();

const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = false; // true for live, false for sandbox

// Initialize payment
router.post('/init', async (req, res) => {
    const data = {
        total_amount: req.body.total_amount,
        currency: 'BDT',
        tran_id: 'REF' + Math.floor(Math.random() * 1000000),
        success_url: `${process.env.ROOT}/api/ssl/success`,
        fail_url: `${process.env.ROOT}/api/ssl/fail`,
        cancel_url: `${process.env.ROOT}/api/ssl/cancel`,
        ipn_url: `${process.env.ROOT}/api/ssl/ipn`,
        shipping_method: 'Courier',
        product_name: req.body.product_name,
        product_category: 'Organic Products',
        product_profile: 'general',
        cus_name: req.body.cus_name,
        cus_email: req.body.cus_email,
        cus_add1: req.body.cus_add1 || 'Dhaka',
        cus_add2: 'Bangladesh',
        cus_city: req.body.cus_city || 'Dhaka',
        cus_state: req.body.cus_state || 'Dhaka',
        cus_postcode: req.body.cus_postcode || '1000',
        cus_country: 'Bangladesh',
        cus_phone: req.body.cus_phone,
        cus_fax: req.body.cus_phone,
        ship_name: req.body.cus_name,
        ship_add1: req.body.cus_add1 || 'Dhaka',
        ship_add2: 'Bangladesh',
        ship_city: req.body.cus_city || 'Dhaka',
        ship_state: req.body.cus_state || 'Dhaka',
        ship_postcode: req.body.cus_postcode || '1000',
        ship_country: 'Bangladesh',
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    try {
        const apiResponse = await sslcz.init(data);
        let GatewayPageURL = apiResponse.GatewayPageURL;
        res.json({ url: GatewayPageURL });
    } catch (error) {
        console.error('SSL Payment Error:', error);
        res.status(500).json({ error: 'Payment initialization failed' });
    }
});

// Payment success route
router.post('/success', async (req, res) => {
    res.json({
        data: req.body,
        message: 'Payment success'
    });
});

// Payment fail route
router.post('/fail', async (req, res) => {
    res.json({
        data: req.body,
        message: 'Payment failed'
    });
});

// Payment cancel route
router.post('/cancel', async (req, res) => {
    res.json({
        data: req.body,
        message: 'Payment cancelled'
    });
});

// IPN route
router.post('/ipn', async (req, res) => {
    res.json({
        data: req.body,
        message: 'IPN'
    });
});

module.exports = router;