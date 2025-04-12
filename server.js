const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware để xử lý JSON
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// API để lấy danh sách sản phẩm
app.get('/products', (req, res) => {
    const filePath = path.join(__dirname, 'products.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Không thể đọc tệp sản phẩm.' });
        }
        res.json(JSON.parse(data));
    });
});

// API để thêm sản phẩm mới
app.post('/products', (req, res) => {
    const filePath = path.join(__dirname, 'products.json');
    const newProduct = req.body;

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Không thể đọc tệp sản phẩm.' });
        }

        const products = JSON.parse(data);
        products.push(newProduct);

        fs.writeFile(filePath, JSON.stringify(products, null, 4), 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ error: 'Không thể lưu sản phẩm.' });
            }
            res.status(201).json({ message: 'Sản phẩm đã được thêm thành công.' });
        });
    });
});

// Khởi chạy máy chủ
app.listen(PORT, () => {
    console.log(`Máy chủ đang chạy tại http://localhost:${PORT}`);
});
