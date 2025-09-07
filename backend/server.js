const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// GET semua gift
app.get("/gifts", (req, res) => {
  fs.readFile("gifts.json", "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Gagal membaca file" });
    res.json(JSON.parse(data));
  });
});

// POST gift baru
app.post("/gifts", (req, res) => {
  const { name, coins, image } = req.body;
  fs.readFile("gifts.json", "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Gagal membaca file" });

    const gifts = JSON.parse(data);
    const newGift = { id: gifts.length + 1, name, coins, image };
    gifts.push(newGift);

    fs.writeFile("gifts.json", JSON.stringify(gifts, null, 2), err => {
      if (err) return res.status(500).json({ error: "Gagal menyimpan gift" });
      res.json(newGift);
    });
  });
});

app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
