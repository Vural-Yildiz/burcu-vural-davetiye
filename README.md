# vural-burcu-salihli-davetiye

Vural & Burcu için **Manisa / Salihli kız tarafı düğünü** dijital davetiye prototipi.

> Bu proje Van davetiyesi veya başka bir düğün projesiyle ilişkili değildir. Dosyalar, müzik, repository ve yayın adresi bağımsız tutulmalıdır.

## Durum

İlk çalışan mobil prototip. Henüz kesin tarih, saat, salon adı ve müzik dosyası verilmediği için bunlar bilerek placeholder/boş bırakılmıştır:

- `7 Kasım 2026, Cumartesi`
- `14:00–17:00`
- `Salihli Öğretmenevi`
- `musicSrc: ''`

## Dosya yapısı

```text
vural-burcu-salihli-davetiye/
├── index.html
├── styles.css
├── app.js
├── README.md
└── assets/
    ├── favicon.svg
    └── README-MUSIC.txt
```

## Hızlı düzenleme

`app.js` içindeki `CONFIG` bloğunu düzenleyin:

```js
const CONFIG = {
  date: '7 Kasım 2026, Cumartesi',
  time: '14:00–17:00',
  venue: 'Salihli Öğretmenevi',
  city: 'Manisa / Salihli',
  mapsQuery: 'Salihli, Manisa',
  musicSrc: '',
  eventStart: '',
  eventDurationMinutes: 240
};
```

### Salon belli olduğunda

`venue` ve `mapsQuery` alanlarını gerçek salon bilgisiyle güncelleyin.

### Tarih/saat belli olduğunda

Örnek biçim:

```js
eventStart: '2026-11-21T19:30:00'
```

Bu değer girildiğinde **Takvime Ekle** butonu `.ics` dosyası üretir.

### Müzik eklendiğinde

Müzik dosyasını örneğin `assets/music.mp3` olarak koyup:

```js
musicSrc: 'assets/music.mp3'
```

yazın. Müzik yalnızca kullanıcı **DAVETİ AÇ** butonuna dokunduğunda başlar ve yaklaşık 1.3 saniyelik yumuşak fade-in uygular.

## GitHub Pages

Repository adı:

```text
vural-burcu-salihli-davetiye
```

Beklenen yayın adresi:

```text
https://[KULLANICI-ADI].github.io/vural-burcu-salihli-davetiye/
```

GitHub'da `Settings > Pages > Build and deployment` bölümünde `Deploy from a branch`, branch `main`, folder `/ (root)` seçilebilir.

## Tasarım yaklaşımı

- Koyu mürekkep/gece laciverti zemin
- Şampanya altını ince folyo vurguları
- Fildişi premium kağıt kart
- Sardes mimari hafızasına referans veren düşük kontrastlı geometrik çizgiler
- Bozdağ/Gediz ovası hissini taşıyan soyut ufuk katmanları
- Görsel ağırlığı azaltmak için raster hero görsel kullanılmadı; prototip CSS + inline SVG ağırlıklıdır
- Açılış animasyonu transform/opacity tabanlıdır
- RSVP şimdilik `localStorage` ile cihazda saklanır
- Harita butonu salon netleşene kadar yalnızca Salihli / Manisa aramasını açar

## Sonraki revizyonlar

1. Kesin tarih/saat/salon ile gerçek takvim + harita bağlantısı
2. Seçilecek müzik dosyası ve ses kontrolü
3. Monogramın son vektör versiyonu
4. Safari/Android cihaz testleri ve animasyon mikro-zamanlama ayarı
5. İsteğe bağlı WhatsApp RSVP veya form backend bağlantısı
6. Open Graph önizleme görseli (`og:image`) ve paylaşım kartı


## Etkinlik bilgileri
- Tarih: 7 Kasım 2026, Cumartesi
- Saat: 14:00–17:00
- Mekân: Salihli Öğretmenevi
- Resmî kurum adı: Salihli Öğretmenevi ve Akşam Sanat Okulu
- Adres: Aksoy Mh. Menderes Cd. No:70, Salihli/Manisa
