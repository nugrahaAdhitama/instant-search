// Mendapatkan elemen input search dan elemen list hasil pencarian
const searchInput = document.getElementById("searchInput");
const searchList = document.getElementById("searchList");

// Inisialisasi variabel untuk paginasi
let currentPage = 1;
const itemsPerPage = 10;

// Fungsi async untuk mengambil data dari API
async function fetchData() {
    try {
        // Mengirim request ke API untuk mengambil data pengguna
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        // Mengkonversi data yang diterima ke dalam format JSON
        const data = await response.json();
        // Mengembalikan data yang telah dikonversi
        return data;
    } catch (error) {
        // Menampilkan pesan kesalahan jika ada error saat mengambil data
        console.error('Error fetching data:', error);
        // Mengembalikan array kosong jika terjadi error
        return [];
    }
}

// Memanggil fungsi fetchData() dan memproses data yang diterima
fetchData().then(users => {
    // Mengekstrak nama pengguna dari data yang diterima
    const items = users.map(user => user.name);

    // Fungsi untuk memperbarui hasil pencarian berdasarkan input
    function updateSearchList() {
        // Mengambil nilai input search dan mengonversinya ke huruf kecil
        const searchValue = searchInput.value.toLowerCase();
        // Menyaring item berdasarkan nilai input search
        const filteredItems = items.filter(item => item.toLowerCase().includes(searchValue));
        // Menentukan indeks awal dan akhir item yang akan ditampilkan
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        // Mengambil item yang akan ditampilkan sesuai dengan indeks awal dan akhir
        const visibleItems = filteredItems.slice(startIndex, endIndex);
        // Menampilkan item yang telah difilter dan di-highlight dalam list hasil pencarian
        searchList.innerHTML = visibleItems.map(item => `<li>${highlightSearch(item, searchValue)}</li>`).join("");
    }    

    // Menambahkan event listener pada input search untuk memperbarui hasil pencarian
    searchInput.addEventListener("input", updateSearchList);
    // Memperbarui hasil pencarian saat halaman pertama kali dimuat
    updateSearchList();
})

// Fungsi untuk menambahkan highlight pada teks yang cocok dengan input search
function highlightSearch(text, searchValue) {
    // Mencari indeks pertama kecocokan teks dengan input search
    const index = text.toLowerCase().indexOf(searchValue);
    // Jika tidak ada kecocokan, kembalikan teks asli
    if (index === -1) {
        return text;
    }
    // Memisahkan teks sebelum, selama, dan setelah kecocokan
    const beforeMatch = text.slice(0, index);
    const match = text.slice(index, index + searchValue.length);
    const afterMatch = text.slice(index + searchValue.length);
    // Menggabungkan kembali teks dengan menambahkan highlight pada bagian yang cocok
    return `${beforeMatch}<span class="highlight">${match}</span>${afterMatch}`;
}

// Menambahkan event listener pada window untuk mendeteksi scroll
window.addEventListener("scroll", () => {
    // Jika pengguna telah mencapai akhir halaman, lakukan paginasi dan tampilkan lebih banyak hasil
if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    // Menampilkan loader saat mengambil data tambahan
    loader.style.display = "block";
    // Menambahkan halaman saat pengguna mencapai akhir halaman
    currentPage++;
    // Memperbarui hasil pencarian dengan menampilkan lebih banyak item
    updateSearchList();
    // Menyembunyikan loader setelah item tambahan ditampilkan
    loader.style.display = "none";
    }
})