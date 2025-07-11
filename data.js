// Fungsi untuk menghasilkan URL gambar dinamis
function generateImageUrls(baseUrl, count, prefix = '', padding = 1) {
    return Array.from({ length: count }, (_, i) => {
        const pageNum = String(i + 1).padStart(padding, '0');
        return `${baseUrl}/${prefix}${pageNum}.jpg`;
    });
}

// Fungsi untuk chapter Ao no Hako
const aoNoHakoChapters = [
  {
    id: 1,
    pages: 56,
    images: generateImageUrls('https://img.komiku.org/uploads/2443119', 56, '', 0)
  },
  ...Array.from({ length: 199 }, (_, i) => ({
    id: i + 2,
    pages: 27,
    images: generateImageUrls(
      `https://sv3.imgkc3.my.id/wp-content/img/A/Ao-no-Hako/${String(i + 2).padStart(3, '0')}`,
      27,
      '',
      3
    )
  }))
];

// Fungsi untuk komik placeholder
const generatePlaceholderChapter = (title, count) => ({
  id: 1,
  title,
  pages: count,
  images: Array.from({ length: count }, (_, i) => 
    `https://via.placeholder.com/800x1200/${77777 + i * 11111}/ffffff?text=${title.replace(/\s+/g, '+')}+H${i+1}`
  )
});

// Data komik utama
const comics = [
  {
    id: 5974065,
    title: "Ao no Hako",
    author: "Kouji Miura",
    country: "jp",
    cover: "https://thumbnail.komiku.org/uploads/manga/ao-no-hako/manga_thumbnail-Manga-Ao-no-Hako.jpg?w=300",
    rating: 8.4,
    genre: ["Action", "Drama", "Romance", "School", "Sports"],
    synopsis: "Taiki Inomata, seorang siswa SMA yang tergabung dalam klub bulu tangkis, dan diam-diam menyukai seniornya, Chinatsu Kano, seorang bintang tim basket putri.",
    chapters: aoNoHakoChapters,
    updatedAt: "2025-07-10"
  },
  {
    id: 5637345,
    title: "My Bias Gets on the Last Train",
    author: "JIXKSEE",
    country: "kr",
    cover: "https://komikcast.li/wp-content/uploads/2024/12/98bd7e38-799b-4291-ad14-778b63427108.jpg",
    rating: 8.8,
    genre: ["Comedy", "Drama", "Music", "Romance"],
    synopsis: "“Aku bertemu dengannya lagi di kereta terakhir hari ini, andai saja aku bisa berbicara dengannya!” Mahasiswa Lee Yeo-woon bekerja lembur dan naik kereta terakhir setiap hari. Shin Hae-in, seorang wanita membawa gitar, yang selalu kita temui. Kedua orang tersebut, yang bertemu seolah-olah secara kebetulan atau takdir, mengetahui bahwa favorit masing-masing adalah musisi indie “Long Afternoon” dan menjadi lebih dekat.",
    chapters: Array.from({ length: 35 }, (_, i) => ({
  id: i + 1,
  pages: 28,
  images: generateImageUrls(
    `https://sv2.imgkc2.my.id/wp-content/img/M/My_Bias_Gets_on_the_Last_Train/${String(i + 1).padStart(3, '0')}`,
    28,
    '',
    3
  )
})),
    updatedAt: "2025-07-10"
  },
  {
    id: 5937365,
    title: "Spy X Family",
    author: "ENDOU Tatsuya",
    country: "jp",
    cover: "https://komikcast.li/wp-content/uploads/2022/11/sp62523423-e1668849548536.jpg",
    rating: 8.4,
    genre: ["Comedy", "Drama", "Romance"],
    synopsis: "Kisah agen mata-mata bernama Twilight yang harus menjalankan misi penting untuk menjaga perdamaian antar negara, Westalis dan Ostania. Untuk mencapai misinya, ia membentuk keluarga palsu: seorang istri bernama Yor dan seorang anak perempuan bernama Anya.",
    chapters: Array.from({ length: 119 }, (_, i) => ({
  id: i + 1,
  pages: 8,
  images: generateImageUrls(
    `https://sv2.imgkc2.my.id/wp-content/img/S/Spy_X_Family/${String(i + 1).padStart(3, '0')}`,
    8,
    '',
    3
  )
})),
    updatedAt: "2025-07-01"
  },
  {
    id: 5337945,
    title: "Sono Bisque Doll wa Koi wo suru",
    author: "Fukada Shinichi",
    country: "jp",
    cover: "https://komikcast.li/wp-content/uploads/2025/02/ez30qL.jpg",
    rating: 8.0,
    genre: ["Comedy", "Ecchi", "Romance", "School", "Slice of Life"],
    synopsis: "Wakana Gojou adalah anak SMA berusia lima belas tahun yang mengalami trauma sosial di masa lalu karena gairahnya. Insiden itu meninggalkan bekas padanya yang membuatnya menjadi pertapa sosial. Sampai suatu hari ia bertemu dengan Kitagawa yang merupakan gyaru yang ramah, yang sepenuhnya bertolak belakang dengannya. Mereka segera berbagi gairah mereka dengan satu sama lain yang mengarah ke hubungan aneh mereka.",
    chapters: Array.from({ length: 115 }, (_, i) => ({
  id: i + 1,
  pages: 28,
  images: generateImageUrls(
    `https://sv1.imgkc1.my.id/wp-content/img/S/Sono_Bisque_Doll_wa_Koi_wo_suru/${String(i + 1).padStart(3, '0')}`,
    28,
    '',
    3
  )
})),
    updatedAt: "2025-07-09"
  },
  {
    id: 5639342,
    title: "Job Change Log",
    author: "Woo Si Mok",
    country: "kr",
    cover: "https://komikcast.li/wp-content/uploads/2025/04/1743597477-8334-i481608.jpg",
    rating: 7.8,
    genre: ["Comedy", "Drama", "Romance"],
    synopsis: "Joy dan Max adalah rekan kerja...",
    chapters: [
        // Chapter 1-10
        ...Array.from({ length: 9 }, (_, i) => ({
            id: i + 1,
            pages: 28,
            images: generateImageUrls(
                `https://sv3.imgkc3.my.id/wp-content/img/J/Job_Change_Log/${String(i + 1).padStart(3, '0')}`,
                28,  // Diperbaiki: jumlah gambar harus 28
                '',
                2    // Padding 3 digit (001, 002, dst)
            )
        })),
        // Chapter 11-21
        ...Array.from({ length: 12 }, (_, i) => ({
            id: i + 10,
            pages: 28,
            images: generateImageUrls(
                `https://sv3.imgkc3.my.id/wp-content/img/J/Job_Change_Log/${String(i + 10).padStart(3, '0')}`,
                28,  // Diperbaiki: jumlah gambar harus 28
                '',
                3    // Padding 3 digit (011, 012, dst)
            )
        }))
    ],
    updatedAt: "2025-07-10"
},
{
    id: 5631645,
    title: "The Regressed Mercenary’s Machinations",
    author: "Gold Line (골드행)",
    country: "kr",
    cover: "https://komikcast.li/wp-content/uploads/2024/09/Mercenarys.jpg",
    rating: 8.2,
    genre: ["Action", "Adventure", "Fantasy"],
    synopsis: "Ghislain Perdium sang Mercenary King dan salah satu orang terkuat di benua memulai perang untuk membalaskan dendam keluarganya. Rencana balas dendamnya berjalan dengan lancar sampai dia dihabisi oleh Idun yang tidak disangkasangka malah muncul. Ghislain mengira bahwa dia sudah mati namun kembali bangun sebagai dirinya yang masih muda sebelum keluarganya runtuh. Dengan kesempatan kedua ini dia memutuskan untuk memperbaiki semua kepingan puzzle yang salah dan menghindari kesalahankesalahan di kehidupan sebelumnya",
    chapters: [
        // Chapter 1-10
        ...Array.from({ length: 35 }, (_, i) => ({
            id: i + 1,
            pages: 28,
            images: generateImageUrls(
                `https://sv1.imgkc1.my.id/wp-content/img/T/The_Regressed_Mercenarys_Machinations/${String(i + 1).padStart(3, '0')}`,
                28,  // Diperbaiki: jumlah gambar harus 28
                '',
                3    // Padding 3 digit (001, 002, dst)
            )
        })),
        // Chapter 11-21
        ...Array.from({ length: 4 }, (_, i) => ({
            id: i + 36,
            pages: 28,
            images: generateImageUrls(
                `https://sv2.imgkc2.my.id/wp-content/img/T/The_Regressed_Mercenarys_Machinations/${String(i + 36).padStart(3, '0')}`,
                28,  // Diperbaiki: jumlah gambar harus 28
                '',
                3    // Padding 3 digit (011, 012, dst)
            )
        })),
        ...Array.from({ length: 7 }, (_, i) => ({
            id: i + 40,
            pages: 28,
            images: generateImageUrls(
                `https://sv3.imgkc3.my.id/wp-content/img/T/The_Regressed_Mercenarys_Machinations/${String(i + 40).padStart(3, '0')}`,
                28,  // Diperbaiki: jumlah gambar harus 28
                '',
                3    // Padding 3 digit (011, 012, dst)
            )
        }))
    ],
    updatedAt: "2025-07-08"
},
{
    id: 5069815,
    title: "Childhood Friend Of The Zenith",
    author: "Ubilam",
    country: "kr",
    cover: "https://komikcast.li/wp-content/uploads/2024/08/zenith.jpeg",
    rating: 8.4,
    genre: ["Action", "Adventure", "Fantasy", "Martial Arts"],
    synopsis: "Gu Yangchun, orang yang mengkhianati sekte-sekte ortodoks, menjadi Demonic Human dibawah Heavenly Demon. Hidup sebagai Demonic Human, dia menjalani kehidupan yang penuh penyesalan. Dia melakukan banyak kejahatan sampai tak terhitung jumlahnya bukan atas kemauannya sendiri, tapi karena perintah dari Heavenly Demon. Dalam perang besar Ortodoks melawan Demon, berkat Wi Seol-Ah yang berhasil menebas Heavenly Demon yang sudah membuat 3 petinggi pasukan Ortodoks bertekuk lutut. Gu Yangchun ditawan oleh pasukan Ortodoks dan menderita karena dosa-dosanya. Dengan moral yang masih tersisa di dalam dirinya, dia mati dengan memberikan informasi kepada Wi Seol-Ah tentang Kultus Demon karena ikatan yang diberikan oleh Heavenly Demon kepadanya. Setelah itu, karena beberapa alasan, Gu Yangchun mengalami regresi menuju waktu pada saat dia pertama kali bertemu dengan Wi Seol-Ah. Menyadari bahwa regresi itu bukanlah mimpi, Gu Yangchun memutuskan untuk menjalani kehidupan yang tenang. Akan tetapi, berbagai ikatan buruk dari kehidupan sebelumnya mulai mendekat, satu per satu.",
    chapters: [
        // Chapter 1-10
        ...Array.from({ length: 62 }, (_, i) => ({
            id: i + 1,
            pages: 28,
            images: generateImageUrls(
                `https://sv2.imgkc2.my.id/wp-content/img/C/Childhood_Friend_Of_The_Zenith/${String(i + 1).padStart(3, '0')}`,
                28,  // Diperbaiki: jumlah gambar harus 28
                '',
                3    // Padding 3 digit (001, 002, dst)
            )
        }))
    ],
    updatedAt: "2025-07-10"
},
  {
    id: 5137705,
    title: "Shut Up, Evil Dragon! I don’t want to raise a child with you anymore",
    author: "Milkshake tail sauce",
    country: "cn",
    cover: "https://komikcast.li/wp-content/uploads/2025/02/sup2342432-e1738393582753.jpg",
    rating: 7.8,
    genre: ["Action", "Adventure", "Comedy", "Drama", "Ecchi", "Fantasy", "Magic", "Romance"],
    synopsis: "Setelah dikalahkan dan ditangkap, pembunuh naga Leon menjadi tawanan Ratu Naga Perak. Dengan kesadaran akan kematian, ia menggunakan sihir terlarang untuk mengutuk ratu, tetapi tanpa diduga, ratu kehilangan kendali. Ia berpikir bahwa ini akan membuat ratu hidup dengan rasa malu selama sisa hidupnya, dan itu akan sepadan dengan misi pembunuh naga. Namun dua tahun kemudian, ketika Leon membuka matanya, di sebelahnya ada seorang gadis naga kecil dengan ekor.",
    chapters: [
        // Chapter 1-10
        ...Array.from({ length: 34 }, (_, i) => ({
            id: i + 1,
            pages: 28,
            images: generateImageUrls(
                `https://sv2.imgkc2.my.id/wp-content/img/S/Shut_Up_Evil_Dragon/${String(i + 1).padStart(3, '0')}`,
                28,  // Diperbaiki: jumlah gambar harus 28
                '',
                2    // Padding 3 digit (001, 002, dst)
            )
        })),
        ...Array.from({ length: 1 }, (_, i) => ({
            id: i + 35,
            pages: 28,
            images: generateImageUrls(
                `https://sv1.imgkc1.my.id/wp-content/img/S/Shut_Up_Evil_Dragon/${String(i + 35).padStart(3, '0')}`,
                28,  // Diperbaiki: jumlah gambar harus 28
                '',
                3    // Padding 3 digit (011, 012, dst)
            )
        })),
        // Chapter 11-21
        ...Array.from({ length: 1 }, (_, i) => ({
            id: i + 36,
            pages: 28,
            images: generateImageUrls(
                `https://sv1.imgkc1.my.id/wp-content/img/S/Shut_Up_Evil_Dragon/${String(i + 36).padStart(3, '0')}`,
                28,  // Diperbaiki: jumlah gambar harus 28
                '',
                3    // Padding 3 digit (011, 012, dst)
            )
        })),
        ...Array.from({ length: 1 }, (_, i) => ({
            id: i + 37,
            pages: 28,
            images: generateImageUrls(
                `https://sv3.imgkc3.my.id/wp-content/img/S/Shut_Up_Evil_Dragon/${String(i + 37).padStart(3, '0')}`,
                28,  // Diperbaiki: jumlah gambar harus 28
                '',
                3    // Padding 3 digit (011, 012, dst)
            )
        })),
        ...Array.from({ length: 1 }, (_, i) => ({
            id: i + 38,
            pages: 28,
            images: generateImageUrls(
                `https://sv1.imgkc1.my.id/wp-content/img/S/Shut_Up_Evil_Dragon/${String(i + 38).padStart(3, '0')}`,
                28,  // Diperbaiki: jumlah gambar harus 28
                '',
                3    // Padding 3 digit (011, 012, dst)
            )
        })),
        ...Array.from({ length: 5 }, (_, i) => ({
            id: i + 39,
            pages: 28,
            images: generateImageUrls(
                `https://sv3.imgkc3.my.id/wp-content/img/S/Shut_Up_Evil_Dragon/${String(i + 39).padStart(3, '0')}`,
                28,  // Diperbaiki: jumlah gambar harus 28
                '',
                3    // Padding 3 digit (011, 012, dst)
            )
        }))
    ],
    updatedAt: "2025-07-04"
},
{
    id: 5713535,
    title: "The Beginning After the End",
    author: "TurtleMe",
    country: "kr",
    cover: "https://komikcast.li/wp-content/uploads/2023/05/beginning.webp",
    rating: 8.6,
    genre: ["Action", "Adventure", "Fantasy"],
    synopsis: "Raja Grey, yang setelah kematian misterius, bereinkarnasi sebagai Arthur Leywin di dunia fantasi bernama Dicathen. Meskipun terlahir kembali sebagai bayi, ia membawa kebijaksanaan dan pengalaman dari kehidupan sebelumnya.",
    chapters: [
        // Chapter 1-10
        ...Array.from({ length: 10 }, (_, i) => ({
            id: i + 1,
            pages: 50,
            images: generateImageUrls(
                `https://sv2.imgkc2.my.id/wp-content/img/T/The_Reincarnation_of_King_Grey/${String(i + 1).padStart(3, '0')}`,
                50,  // Diperbaiki: jumlah gambar harus 28
                '',
                3    // Padding 3 digit (001, 002, dst)
            )
        })),
        // Chapter 11-20
        ...Array.from({ length: 10 }, (_, i) => ({
            id: i + 11,
            pages: 65,
            images: generateImageUrls(
                `https://sv2.imgkc2.my.id/wp-content/img/T/The_Reincarnation_of_King_Grey/${String(i + 11).padStart(3, '0')}`,
                65,  // Diperbaiki: jumlah gambar harus 28
                '',
                3    // Padding 3 digit (011, 012, dst)
            )
        })),
        ...Array.from({ length: 10 }, (_, i) => ({
            id: i + 21,
            pages: 65,
            images: generateImageUrls(
                `https://sv2.imgkc2.my.id/wp-content/img/T/The_Reincarnation_of_King_Grey/${String(i + 21).padStart(3, '0')}`,
                65,  // Diperbaiki: jumlah gambar harus 28
                '',
                3    // Padding 3 digit (011, 012, dst)
            )
        })),
        ...Array.from({ length: 10 }, (_, i) => ({
            id: i + 31,
            pages: 75,
            images: generateImageUrls(
                `https://sv2.imgkc2.my.id/wp-content/img/T/The_Reincarnation_of_King_Grey/${String(i + 31).padStart(3, '0')}`,
                75,  // Diperbaiki: jumlah gambar harus 28
                '',
                3    // Padding 3 digit (011, 012, dst)
            )
        })),
        ...Array.from({ length: 10 }, (_, i) => ({
            id: i + 41,
            pages: 75,
            images: generateImageUrls(
                `https://sv2.imgkc2.my.id/wp-content/img/T/The_Reincarnation_of_King_Grey/${String(i + 41).padStart(3, '0')}`,
                75,  // Diperbaiki: jumlah gambar harus 28
                '',
                3    // Padding 3 digit (011, 012, dst)
            )
        })),
        ...Array.from({ length: 50 }, (_, i) => ({
            id: i + 51,
            pages: 75,
            images: generateImageUrls(
                `https://sv2.imgkc2.my.id/wp-content/img/T/The_Reincarnation_of_King_Grey/${String(i + 51).padStart(3, '0')}`,
                75,  // Diperbaiki: jumlah gambar harus 28
                '',
                3    // Padding 3 digit (011, 012, dst)
            )
        })),
        ...Array.from({ length: 50 }, (_, i) => ({
            id: i + 101,
            pages: 100,
            images: generateImageUrls(
                `https://sv2.imgkc2.my.id/wp-content/img/T/The_Reincarnation_of_King_Grey/${String(i + 101).padStart(3, '0')}`,
                100,  // Diperbaiki: jumlah gambar harus 28
                '',
                3    // Padding 3 digit (011, 012, dst)
            )
        })),
        ...Array.from({ length: 50 }, (_, i) => ({
            id: i + 151,
            pages: 96,
            images: generateImageUrls(
                `https://sv2.imgkc2.my.id/wp-content/img/T/The_Reincarnation_of_King_Grey/${String(i + 151).padStart(3, '0')}`,
                96,  // Diperbaiki: jumlah gambar harus 28
                '',
                3    // Padding 3 digit (011, 012, dst)
            )
        })),
        ...Array.from({ length: 25 }, (_, i) => ({
            id: i + 201,
            pages: 40,
            images: generateImageUrls(
                `https://sv2.imgkc2.my.id/wp-content/img/T/The_Reincarnation_of_King_Grey/${String(i + 201).padStart(3, '0')}`,
                40,  // Diperbaiki: jumlah gambar harus 28
                '',
                3    // Padding 3 digit (011, 012, dst)
            )
        }))
    ],
    updatedAt: "2025-07-04"
},
{
    id: 5703535,
    title: "Mayonaka Heart Tune",
    author: "IGARASHI Masakuni",
    country: "jp",
    cover: "https://komikcast.li/wp-content/uploads/2025/06/brBNaE.jpg",
    rating: 8.4,
    genre: ["Comedy", "Harem", "Romance"],
    synopsis: "Ketika Arisu Yamabuki sendirian di tempat tidur pada malam hari, ia dapat menemukan penghiburan dalam suara penyiar radio yang bernama “Apollo”. Namun demikian, suatu hari, penyiar radio itu berhenti siaran tanpa penjelasan apa pun. Bertahun-tahun kemudian berlalu, dan Arisu sekarang menjadi siswa kelas dua SMA. Dia menjadikannya sebagai misinya untuk mencari Apollo, karena ada sesuatu yang ingin dia sampaikan padanya. Dia tidak tahu seperti apa dia, atau bahkan siapa nama aslinya, tapi dia berhasil mendapatkan beberapa petunjuk tentangnya di klub penyiaran sekolahnya. Di situlah dia bertemu dengan empat gadis yang semuanya bermimpi untuk mendapatkan pekerjaan di mana mereka dapat memanfaatkan suara mereka sepenuhnya! Siapakah Apollo, dan bagaimana impian keempatnya akan terwujud?",
    chapters: [
        // Chapter 1-10
        ...Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            pages: 42,
            images: generateImageUrls(
                `https://sv2.imgkc2.my.id/wp-content/img/M/Mayonaka_Heart_Tune/${String(i + 1).padStart(3, '0')}`,
                42,  // Diperbaiki: jumlah gambar harus 28
                '',
                3    // Padding 3 digit (001, 002, dst)
            )
        })),
        // Chapter 11-21
        ...Array.from({ length: 32 }, (_, i) => ({
            id: i + 51,
            pages: 40,
            images: generateImageUrls(
                `https://sv2.imgkc2.my.id/wp-content/img/M/Mayonaka_Heart_Tune/${String(i + 51).padStart(3, '0')}`,
                40,  // Diperbaiki: jumlah gambar harus 28
                '',
                3    // Padding 3 digit (011, 012, dst)
            )
        }))
    ],
    updatedAt: "2025-07-04"
},
    {
    id: 5426302,
    title: "Kaoru Hana wa Rin to Saku Bahasa",
    author: "MIKAMI Saka",
    country: "jp",
    cover: "https://komikcast.li/wp-content/uploads/2025/05/nR2aBm.jpg",
    rating: 8.2,
    genre: ["Comedy", "Drama", "Romance", "School"],
    synopsis: "Rintaro, murid kelas dua di Chidori yang memiliki wajah garang namun hati yang lembut, membantu di toko roti keluarganya ketika dia bertemu dengan seorang gadis bernama Kaoruko. Keduanya langsung akrab, namun kedamaian bahagia ini segera terganggu ketika Rintaro mengetahui bahwa Kaoruko sebenarnya adalah siswi di Kikyo. Lebih buruk lagi, dia tidak sepertinya menyadari betapa besar masalahnya ini! Akankah kedua orang ini mampu membentuk jalan mereka sendiri, dan menghindari perangkap (secara metaforis dan harfiah) yang diletakkan oleh teman sekelas mereka?",
    chapters: [
        // Chapter 1-10
        ...Array.from({ length: 139 }, (_, i) => ({
            id: i + 1,
            pages: 22,
            images: generateImageUrls(
                `https://sv2.imgkc2.my.id/wp-content/img/K/Kaoru_Hana_wa_Rin_to_Saku/${String(i + 1).padStart(3, '0')}`,
                22,  // Diperbaiki: jumlah gambar harus 28
                '',
                3    // Padding 3 digit (001, 002, dst)
            )
        })),
        // Chapter 1341-149
        ...Array.from({ length: 6 }, (_, i) => ({
            id: i + 140,
            pages: 22,
            images: generateImageUrls(
                `https://sv2.imgkc2.my.id/wp-content/img/K/Kaoru_Hana_wa_Rin_to_Saku/${String(i + 140).padStart(3, '0')}f`,
                22,  // Diperbaiki: jumlah gambar harus 28
                '',
                3    // Padding 3 digit (011, 012, dst)
            )
        })),
        ...Array.from({ length: 4 }, (_, i) => ({
            id: i + 146,
            pages: 22,
            images: generateImageUrls(
                `https://sv2.imgkc2.my.id/wp-content/img/K/Kaoru_Hana_wa_Rin_to_Saku/${String(i + 146).padStart(3, '0')}`,
                22,  // Diperbaiki: jumlah gambar harus 28
                '',
                3    // Padding 3 digit (011, 012, dst)
            )
        })),
        ...Array.from({ length: 2 }, (_, i) => ({
            id: i + 150,
            pages: 22,
            images: generateImageUrls(
                `https://sv2.imgkc2.my.id/wp-content/img/K/Kaoru_Hana_wa_Rin_to_Saku/${String(i + 150).padStart(3, '0')}`,
                22,  // Diperbaiki: jumlah gambar harus 28
                '',
                2    // Padding 3 digit (011, 012, dst)
            )
        }))
    ],
    updatedAt: "2025-07-11"
},
{
    id: 5639340,
    title: "Kimetsu no Yaiba",
    author: "Gotouge, Koyoharu",
    country: "jp",
    cover: "https://komikcast.li/wp-content/uploads/2019/08/nezukoyaiba-e1565478995401.jpg",
    rating: 8.5,
    genre: ["Action", "Historical", "Supernatural"],
    synopsis: "Tanjirou Kamado tinggal bersama keluarganya yang miskin di sebuah gunung terpencil. Sebagai anak tertua, ia memikul tanggung jawab untuk memastikan mata pencaharian keluarganya setelah kematian ayahnya. Pada suatu hari di musim dingin, dia pergi ke desa setempat untuk menjual arang. Saat senja tiba, dia terpaksa bermalam di rumah seorang pria yang penasaran yang memperingatkannya tentang makhluk aneh yang berkeliaran di malam hari: iblis jahat yang mendambakan daging manusia.",
    chapters: [        
        // Chapter 11-21
        ...Array.from({ length: 205 }, (_, i) => ({
            id: i + 1,
            pages: 28,
            images: generateImageUrls(
                `https://sv2.imgkc2.my.id/wp-content/img/K/Kimetsu%20no%20Yaiba/${String(i + 1).padStart(3, '0')}`,
                28,  // Diperbaiki: jumlah gambar harus 28
                '',
                3    // Padding 3 digit (011, 012, dst)
            )
        }))
    ],
    updatedAt: "2023-03-17"
},
  // Komik lainnya menggunakan pola yang sama
  {
    id: 2,
    title: "Naruto",
    author: "Masashi Kishimoto",
    country: "jp",
    cover: "https://via.placeholder.com/200x300/2196F3/FFFFFF?text=Naruto",
    rating: 4.8,
    genre: ["Action", "Adventure", "Fantasy"],
    synopsis: "Naruto Uzumaki, ninja muda yang bercita-cita menjadi Hokage, pemimpin desanya. Cerita mengikuti perjalanannya dan teman-temannya dalam dunia ninja.",
    chapters: [generatePlaceholderChapter("Uzumaki Naruto", 4)],
    updatedAt: "2022-07-01"
  },
  // Tambahkan komik lain di sini dengan pola yang sama...
];


// Sample genres
        const genres = [
            { id: 1, name: "Action", icon: "fas fa-person-running" },
            { id: 2, name: "Adult", icon: "fas fa-user-shield" },
            { id: 3, name: "Adventure", icon: "fas fa-mountain" },
            { id: 4, name: "Comedy", icon: "fas fa-laugh" },
            { id: 5, name: "Drama", icon: "fas fa-theater-masks" },
            { id: 6, name: "Ecchi", icon: "fas fa-hot-tub" },
            { id: 7, name: "Fantasy", icon: "fas fa-dragon" },
            { id: 8, name: "Harem", icon: "fas fa-users" },
            { id: 9, name: "Historical", icon: "fas fa-landmark" },
            { id: 10, name: "Horror", icon: "fas fa-ghost" },
            { id: 11, name: "Magic", icon: "fas fa-hat-wizard" },
            { id: 12, name: "Martial Arts", icon: "fas fa-hand-fist" },
            { id: 13, name: "Music", icon: "fas fa-music" },
            { id: 14, name: "Mecha", icon: "fas fa-robot" },
            { id: 15, name: "Mystery", icon: "fas fa-search" },
            { id: 16, name: "Psychological", icon: "fas fa-brain" },
            { id: 17, name: "Romance", icon: "fas fa-heart" },
            { id: 18, name: "School", icon: "fas fa-school" },
            { id: 19, name: "Sci-Fi", icon: "fas fa-flask" },
            { id: 20, name: "Slice of Life", icon: "fas fa-mug-hot" },
            { id: 21, name: "Superhero", icon: "fas fa-mask" },
            { id: 22, name: "Supernatural", icon: "fas fa-moon" },
            { id: 23, name: "Sports", icon: "fas fa-basketball-ball" },
            { id: 24, name: "Thriller", icon: "fas fa-person-falling-burst" }
        ];
    
