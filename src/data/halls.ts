export type Hall = {
  name: string;
  description: string;
  capacity: string;
  area?: string;
  image: string;
  /** false = фото не подписано на официальном сайте как этот зал, используется как лучшая доступная замена */
  verifiedPhoto?: boolean;
};

// Привязка фото проверена на lesnaya-zaimka-vl.ru/ru/gallery/interiors/ — там подписи
// над каждой фотографией напрямую называют зал (Большой/Фиолетовый/Изумрудный/Банкетный/Бар).
// Для Бордового зала и Летней террасы подписанных фото на официальном сайте нет вообще —
// image ниже лучшая доступная замена, а не подтверждённый снимок именно этого зала.
export const HALLS: Hall[] = [
  {
    name: "Большой зал",
    description: "Основной зал, 1-й этаж, сцена, танцпол, проектор.",
    capacity: "200–250 чел",
    area: "400 м²",
    image: "/img/gallery/interiors/full/4.webp",
    verifiedPhoto: true,
  },
  {
    name: "Летняя терраса",
    description: "Открытая терраса Villa ArtE в два этажа — для больших торжеств и мероприятий на свежем воздухе.",
    capacity: "до 500 чел",
    image: "/img/gallery/holidays/full/2.webp",
    verifiedPhoto: false,
  },
  {
    name: "Фиолетовый зал",
    description: "Нижний этаж, отдельный выход на улицу, проектор.",
    capacity: "80–100 чел",
    area: "180 м²",
    image: "/img/gallery/interiors/full/1.webp",
    verifiedPhoto: true,
  },
  {
    name: "Бордовый зал",
    description: "3-й этаж, ЖК-экран — для торжеств камернее.",
    capacity: "до 40 чел",
    area: "70 м²",
    image: "/img/gallery/interiors/full/3.webp",
    verifiedPhoto: false,
  },
  {
    name: "Изумрудный зал",
    description: "2-й этаж, ЖК-экран.",
    capacity: "до 40 чел",
    area: "70 м²",
    image: "/img/gallery/interiors/full/2.webp",
    verifiedPhoto: true,
  },
  {
    name: "Банкетный зал",
    description: "2-й этаж, ЖК-экран — самый камерный из шести.",
    capacity: "до 35 чел",
    area: "60 м²",
    image: "/img/gallery/interiors/full/6.webp",
    verifiedPhoto: true,
  },
];

export const EVENT_FORMATS = [
  "Организация банкетов и фуршетов",
  "Свадьбы",
  "Корпоративные и частные мероприятия",
  "Кейтеринг и выезд шеф-повара",
  "Служба доставки блюд",
];
