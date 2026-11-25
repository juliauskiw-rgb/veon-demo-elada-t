// Single source of client facts for the page (veon/client.json). Nothing here is invented.
export const PHONES = [
  { display: "+38 (067) 382 51 07", href: "tel:+380673825107" },
  { display: "+38 (067) 383 43 37", href: "tel:+380673834337" },
  { display: "+38 (032) 225 66 13", href: "tel:+380322256613" },
] as const;
export const PHONE = PHONES[0];
export const EMAIL = "elada.lviv@gmail.com";
export const ADDRESS = "м. Львів, вул. Кирила і Мефодія, 21";
export const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("вул. Кирила і Мефодія, 21, Львів");
export const FACEBOOK =
  "https://www.facebook.com/people/%D0%9F%D0%9F-%D0%95%D0%BB%D0%B0%D0%B4%D0%B0-%D0%A2/100035394623558/";
export const FUTURE_NOTE = "Розділ у розробці";

export const NAV = [
  { href: "#napryamy", label: "Напрями" },
  { href: "#obiekty", label: "Об'єкти" },
  { href: "#yak-pratsiuiemo", label: "Як працюємо" },
  { href: "#obladnannia", label: "Обладнання" },
  { href: "#umovy", label: "Умови" },
  { href: "#kontakty", label: "Контакти" },
] as const;

export interface Direction { name: string; items: string; brands?: string }
export interface Group { name: string; pipe: "hot" | "cold"; dirs: Direction[] }
// Two pipes: hot (Тепло, Енергія) and cold (Вода, Клімат), as in design/concept.md.
export const PIPES: { pipe: "hot" | "cold"; groups: Group[] }[] = [
  {
    pipe: "hot",
    groups: [
      {
        name: "Тепло", pipe: "hot",
        dirs: [
          { name: "Опалення", items: "радіатори, конвектори, котельні, димоходи, ремонт котлів і сервіс" },
          { name: "Котли", items: "газові, твердопаливні, електричні" },
          { name: "Теплові насоси", items: "ґрунт-вода, вода-вода, повітря-вода", brands: "GREEN IQ / Vaillant" },
          { name: "Тепла підлога", items: "водяна, електрична", brands: "DEVI, THERMO, IQWATT та ін." },
        ],
      },
      {
        name: "Енергія", pipe: "hot",
        dirs: [{ name: "Сонячні колектори і батареї", items: "колектори, фотомодулі, інвертори, акумулятори" }],
      },
    ],
  },
  {
    pipe: "cold",
    groups: [
      {
        name: "Вода", pipe: "cold",
        dirs: [{ name: "Водопостачання і каналізація", items: "насосні станції, очисні споруди, біосептики, водоочищення", brands: "PipeLife" }],
      },
      {
        name: "Клімат", pipe: "cold",
        dirs: [{ name: "Кондиціонування", items: "встановлення кондиціонерів", brands: "Cooper&Hunter" }],
      },
    ],
  },
];

export const OBJECTS = [
  { slug: "avtosalon", type: "Автосалон Porsche", place: "", tile: "Автосалон" },
  { slug: "hotel-truskavets", type: "Готель «Алькор»", place: "Трускавець", tile: "Готель" },
  { slug: "budynok-lviv", type: "Приватний будинок", place: "Львів", tile: "Приватний будинок" },
  { slug: "kvartyra-novobudova", type: "Квартири в новобудові", place: "вул. Буйка, 27", tile: "Квартири в новобудові" },
  { slug: "teplovyi-nasos-buisk", type: "Тепловий насос", place: "Буськ", tile: "Тепловий насос" },
  { slug: "ochysni-konopnytsia", type: "Очисні споруди", place: "с. Конопниця", tile: "Очисні споруди" },
] as const;

export const CATEGORIES = ["Котли", "Теплові насоси", "Сонячні установки", "Радіатори", "Регулятори і програматори", "Бойлери", "Кондиціонери"];
export const BRANDS = ["Vaillant", "Danfoss", "DEVI", "Cooper&Hunter", "PipeLife"];

export const FOOTER_COLS = [
  { title: "Напрями", items: ["Системи опалення", "Котли", "Теплові насоси", "Тепла підлога", "Сонячні колектори", "Вода і каналізація", "Кондиціонування"] },
  { title: "Компанія", items: ["Каталог обладнання", "Портфоліо", "Гарантія та оплата", "Про компанію"] },
];
