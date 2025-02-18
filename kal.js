// Daya alat dalam watt (perkiraan)
const dayaAlat = {
    "Laptop": 50,
    "Lampu LED": 10,
    "Kipas Angin": 75,
    "AC": 1500,
    "Handphone": 5,
    "Televisi": 100,
    "Kulkas": 150
};

// Fungsi untuk menghitung jejak karbon
function hitungJejakKarbon() {
    // Ambil nilai input dari form
    const alat = document.getElementById('alat').value;
    const jumlah = parseInt(document.getElementById('jumlah').value);
    const jam = parseFloat(document.getElementById('jam').value);
    const hari = parseInt(document.getElementById('hari').value);

    // Validasi input
    if (isNaN(jumlah) || isNaN(jam) || isNaN(hari) || jumlah <= 0 || jam <= 0 || hari <= 0) {
        alert("Harap masukkan semua data dengan benar.");
        return;
    }

    // Ambil daya alat yang dipilih
    const daya = dayaAlat[alat];

    // Hitung total konsumsi energi dalam kWh
    const totalKWh = (daya / 1000) * jumlah * jam * hari;

    // Asumsikan emisi CO2 per kWh adalah 0.85 kg CO2 (tergantung sumber energi)
    const emisiKarbon = totalKWh * 0.85;

    // Menampilkan hasil
    const hasilText = `Jejak karbon untuk penggunaan ${jumlah} ${alat} selama ${jam} jam/hari selama ${hari} hari adalah ${emisiKarbon.toFixed(2)} kg CO2.`;
    document.getElementById('hasil').innerText = hasilText;

    // Menyimpan riwayat perhitungan ke localStorage
    simpanRiwayat(hasilText);
}

// Fungsi untuk menyimpan riwayat ke localStorage
function simpanRiwayat(hasilText) {
    // Ambil riwayat yang ada di localStorage
    let riwayat = JSON.parse(localStorage.getItem('riwayat')) || [];

    // Tambahkan hasil baru ke riwayat
    riwayat.push(hasilText);

    // Simpan kembali ke localStorage
    localStorage.setItem('riwayat', JSON.stringify(riwayat));

    // Tampilkan riwayat yang terbaru
    tampilkanRiwayat();
    hitungTotalJejakKarbon(); // Hitung total jejak karbon
}

// Fungsi untuk menampilkan riwayat perhitungan
function tampilkanRiwayat() {
    // Ambil riwayat dari localStorage
    let riwayat = JSON.parse(localStorage.getItem('riwayat')) || [];

    // Ambil elemen untuk menampilkan riwayat
    const riwayatElement = document.getElementById('riwayat');

    // Kosongkan riwayat yang lama
    riwayatElement.innerHTML = '';

    // Tampilkan setiap item dalam riwayat
    riwayat.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        riwayatElement.appendChild(li);
    });
}

// Fungsi untuk menghapus riwayat
function hapusRiwayat() {
    // Hapus riwayat dari localStorage
    localStorage.removeItem('riwayat');

    // Tampilkan riwayat yang sudah kosong
    tampilkanRiwayat();
    hitungTotalJejakKarbon(); // Hitung total jejak karbon
}

// Fungsi untuk menghitung total jejak karbon dari riwayat
function hitungTotalJejakKarbon() {
    let riwayat = JSON.parse(localStorage.getItem('riwayat')) || [];
    let totalKarbon = 0;

    // Ambil angka jejak karbon dari setiap riwayat
    riwayat.forEach((item) => {
        // Ekstrak angka dari teks
        const karbon = parseFloat(item.match(/(\d+\.\d{2}) kg CO2/)[1]);
        totalKarbon += karbon;
    });

    // Tampilkan total jejak karbon
    document.getElementById('totalJejakKarbon').innerText = `Total Jejak Karbon: ${totalKarbon.toFixed(2)} kg CO2.`;
}

// Panggil tampilkanRiwayat dan hitungTotalJejakKarbon saat halaman dimuat
window.onload = function() {
    tampilkanRiwayat();
    hitungTotalJejakKarbon();
};
