
// NOMOR WHATSAPP ADMIN
// Ganti dengan nomor WhatsApp ALATARA
const nomorAdmin = "089654287395";

// MENU MOBILE
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("show");

    menuBtn.setAttribute("aria-expanded", isOpen);
    menuBtn.setAttribute("aria-label", isOpen ? "Tutup menu" : "Buka menu");
    menuBtn.textContent = isOpen ? "✕" : "☰";
});

// TUTUP MENU SETELAH LINK DIKLIK
navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.textContent = "☰";
    });
});

// FILTER DAN PENCARIAN PRODUK
const searchInput = document.getElementById("searchInput");
const products = document.querySelectorAll(".product");
const filterButtons = document.querySelectorAll(".filter");
const emptyMessage = document.getElementById("emptyMessage");

let kategoriAktif = "all";

function filterProducts() {
    const keyword = searchInput.value.toLowerCase().trim();
    let jumlahProduk = 0;

    products.forEach(product => {
        const nama = product.dataset.name;
        const kategori = product.dataset.category;

        const cocokNama = nama.includes(keyword);
        const cocokKategori =
            kategoriAktif === "all" || kategori === kategoriAktif;

        const tampil = cocokNama && cocokKategori;

        product.hidden = !tampil;

        if (tampil) {
            jumlahProduk++;
        }
    });

    emptyMessage.hidden = jumlahProduk !== 0;
}

searchInput.addEventListener("input", filterProducts);

// KLIK FILTER
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(item => item.classList.remove("active"));

        button.classList.add("active");

        kategoriAktif = button.dataset.category;

        filterProducts();
    });
});

// PEMESANAN PRODUK VIA WHATSAPP
function kirimWhatsApp(pesan) {
    const nomor = nomorAdmin.replace(/\D/g, "");

    if (!nomor || nomor === "628981183094") {
        alert("nomor wa belum di masukan dengan benar");
        return;
    }

    const url = `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;

    window.open(url, "_blank", "noopener,noreferrer");
}

// TOMBOL PESAN PRODUK
document.querySelectorAll(".order-btn").forEach(button => {
    button.addEventListener("click", () => {
        const nama = button.dataset.product;
        const harga = Number(button.dataset.price);

        const hargaFormat = harga.toLocaleString("id-ID");

        const pesan =
            `Halo ALATARA, saya ingin menyewa ${nama} ` +
            `dengan harga Rp${hargaFormat} per hari. ` +
            `Apakah barang tersedia?`;

        kirimWhatsApp(pesan);
    });
});

// HUBUNGI ADMIN
document.getElementById("contactBtn").addEventListener("click", () => {
    const pesan =
        "Halo ALATARA, saya ingin bertanya mengenai penyewaan perlengkapan outdoor.";

    kirimWhatsApp(pesan);
});
