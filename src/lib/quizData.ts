export type ArchetypeId = "striker" | "vanguard" | "overseer";

export interface Answer {
  text: string;
  archetype: ArchetypeId;
  points: 1 | 2 | 3;
}

export interface Question {
  id: number;
  text: string;
  answers: Answer[];
}

// Weighted scoring to break ties: Strategic > Empathic > Technic
// overseer (S) = count × 1.02, vanguard (E) = count × 1.01, striker (T) = count × 1.00
export function getArchetypeFromCounts(counts: Record<ArchetypeId, number>): ArchetypeId {
  const scoreS = counts.overseer * 1.02;
  const scoreE = counts.vanguard  * 1.01;
  const scoreT = counts.striker   * 1.00;
  if (scoreS >= scoreE && scoreS >= scoreT) return "overseer";
  if (scoreE >= scoreT) return "vanguard";
  return "striker";
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Pas pertama kali buka game baru, apa yang kamu perhatiin duluan?",
    answers: [
      {
        text: "Aturan mainnya, nyari tahu cara paling efisien buat dapet poin dan menang.",
        archetype: "overseer",
        points: 3,
      },
      {
        text: "Estetika visual, karakter, dan seberapa bagus grafis atau komponen mainnya.",
        archetype: "striker",
        points: 1,
      },
      {
        text: "Seberapa asik interaksi game ini kalau dimaenin bareng-bareng pas nongkrong.",
        archetype: "vanguard",
        points: 2,
      },
    ],
  },
  {
    id: 2,
    text: "Kalau lagi main bareng kelompok, kamu biasanya ngambil peran apa?",
    answers: [
      {
        text: "Penengah yang mastiin semua orang nyaman, kebagian jatah main, dan bisa seru bareng-bareng.",
        archetype: "vanguard",
        points: 2,
      },
      {
        text: "Pengatur strategi yang ngasih aba-aba kapan kelompok harus maju atau bertahan.",
        archetype: "overseer",
        points: 3,
      },
      {
        text: "Eksekutor yang paling banyak unjuk ketangkasan dan kelihatan menonjol.",
        archetype: "striker",
        points: 1,
      },
    ],
  },
  {
    id: 3,
    text: "Waktu ketemu tantangan/level yang susah banget dilewatin, kamu ngapain?",
    answers: [
      {
        text: "Coba terus sampai gerakan atau ketelitian kamu bener-bener sempurna tanpa cacat.",
        archetype: "striker",
        points: 1,
      },
      {
        text: "Mundur bentar, baca ulang pola tantangannya, lalu ganti cara main.",
        archetype: "overseer",
        points: 3,
      },
      {
        text: "Cairin suasana biar temen-temen satu tim nggak pada frustrasi atau nyerah.",
        archetype: "vanguard",
        points: 2,
      },
    ],
  },
  {
    id: 4,
    text: "Pas kamu dapet sumber daya (poin/waktu/giliran) yang terbatas banget, kamu apain?",
    answers: [
      {
        text: "Dipakai buat ngebantu temen yang lagi kesusahan biar mereka bisa tetep main.",
        archetype: "vanguard",
        points: 2,
      },
      {
        text: "Dipakai buat ngelakuin langkah yang paling memuaskan dan kelihatan keren.",
        archetype: "striker",
        points: 1,
      },
      {
        text: "Disimpen buat langkah krusial di akhir yang bisa langsung ngunci kemenangan.",
        archetype: "overseer",
        points: 3,
      },
    ],
  },
  {
    id: 5,
    text: "Menurut kamu, permainan yang memuaskan itu yang kayak gimana?",
    answers: [
      {
        text: "Pas rencana yang kamu susun dari awal jalan persis sesuai target dan menang telak.",
        archetype: "overseer",
        points: 3,
      },
      {
        text: "Pas semua orang ketawa, saling interaksi, dan nggak ada ego yang mendominasi.",
        archetype: "vanguard",
        points: 2,
      },
      {
        text: "Pas kamu berhasil ngelakuin aksi yang rapi, mulus, dan presisi tinggi.",
        archetype: "striker",
        points: 1,
      },
    ],
  },
  {
    id: 6,
    text: "Kemampuan apa yang paling pengen kamu latih buat main game apapun?",
    answers: [
      {
        text: "Kemampuan mikir beberapa langkah ke depan dan baca peluang.",
        archetype: "overseer",
        points: 3,
      },
      {
        text: "Ketangkasan tangan dan fokus tinggi biar eksekusi kamu jarang meleset.",
        archetype: "striker",
        points: 1,
      },
      {
        text: "Kemampuan komunikasi buat ngebaca situasi dan emosi pemain lain.",
        archetype: "vanguard",
        points: 2,
      },
    ],
  },
  {
    id: 7,
    text: "Saat tim mengalami kegagalan atau kekalahan telak, apa reaksi pertamamu?",
    answers: [
      {
        text: "Membedah letak kesalahan taktik untuk langsung diubah pada ronde selanjutnya.",
        archetype: "overseer",
        points: 3,
      },
      {
        text: "Menjaga mental pemain lain agar tidak ada yang tilting atau saling menyalahkan.",
        archetype: "vanguard",
        points: 2,
      },
      {
        text: "Mengidentifikasi dan melatih ulang mekanik atau gerakan yang tadi meleset sampai sempurna.",
        archetype: "striker",
        points: 1,
      },
    ],
  },
];

export const ARCHETYPE_DATA = {
  striker: {
    name: "The Striker",
    description:
      "Jagoan eksekusi yang memastikan setiap detail visual dan teknis selesai dengan presisi sempurna",
    nextMove:
      "Pertajam pemikiran strategis di awal agar fokus eksekusimu sejalan dengan tujuan akhir",
    color: "#E9312A",
  },
  vanguard: {
    name: "The Vanguard",
    description:
      "Penjaga kenyamanan manusia yang selalu mengutamakan empati, dan pengalaman terbaik",
    nextMove:
      "Perkuat analisis objektif agar keputusan empatimu memiliki dasar yang solid",
    color: "#FF8E4E",
  },
  overseer: {
    name: "The Overseer",
    description:
      "Ahli strategi yang andal melihat gambaran besar dan memetakan langkah jangka panjang",
    nextMove:
      "Pertajam komunikasi taktis agar perencanaan besarmu bisa langsung dieksekusi",
    color: "#4D49FC",
  },
} as const;
