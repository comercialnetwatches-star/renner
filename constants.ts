import { BusinessInfo, MenuItem, Review } from './types';

export const BUSINESS_INFO: BusinessInfo = {
  name: "Restaurante do Renner",
  address: "R. Pedra Azul - Dom Bosco, Betim - MG",
  fullAddress: "R. Pedra Azul - Dom Bosco, Betim - MG, 32662-500",
  phone: "(31) 97314-4549",
  whatsappRaw: "5531973144549",
  hours: "Seg-Sáb: 10:30 às 15:00",
  rating: 4.8,
  reviewCount: 165,
  priceRange: "R$1–20",
  mapLink: "https://www.google.com/maps/search/?api=1&query=Restaurante+do+Renner+Betim",
  openingHours: [
    { label: "Segunda a Sexta", time: "10:30 - 15:00" },
    { label: "Sábado", time: "11:00 - 15:00" },
    { label: "Domingo", time: "Fechado" }
  ],
  holidayNote: "Horários sujeitos a alteração em feriados."
};

export const REVIEWS: Review[] = [
  {
    id: 1,
    author: "Renato Sampaio",
    rating: 5,
    text: "Atendimento excelente, as meninas da cozinha são top. Resumindo melhor restaurante. Sou freguês a muito tempo.",
    timeAgo: "4 meses atrás",
    highlight: true
  },
  {
    id: 2,
    author: "César Mio",
    rating: 5,
    text: "Restaurante diferenciado comida bem temperada, atendimento nota 1000, parabéns.",
    timeAgo: "3 meses atrás",
    highlight: true
  },
  {
    id: 3,
    author: "Maria Oliveira",
    rating: 5,
    text: "Comida caseira de verdade com preço justo. O melhor almoço da região.",
    timeAgo: "1 mês atrás"
  }
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    name: "Marmitex Tradicional",
    description: "Arroz, feijão, macarrão, legumes e opção de carne do dia.",
    price: "A partir de R$ 15,00",
    category: "Prato Feito",
    image: "https://images.unsplash.com/photo-1628294895950-98052523e036?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    details: "Feijão carioca cozido no dia, arroz branco soltinho, macarrão al dente e legumes da estação refogados na manteiga. Acompanha carne a sua escolha (boi, porco ou frango)."
  },
  {
    id: 2,
    name: "Feijão Tropeiro",
    description: "Tropeiro completo mineiro, couve, torresmo e ovo frito.",
    price: "R$ 18,00",
    category: "Prato Feito",
    image: "https://images.unsplash.com/photo-1594911772125-07fc7a2d8d1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    details: "Feijão tropeiro tradicional com farinha de mandioca torrada, couve manteiga fininha refogada no alho, torresmo crocante, ovo frito e lombo suíno."
  },
  {
    id: 3,
    name: "Frango Assado",
    description: "Coxa e sobrecoxa assada com batatas coradas.",
    price: "R$ 17,00",
    category: "Prato Feito",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    details: "Coxa e sobrecoxa marinadas por 12h em ervas finas e assadas lentamente para manter a suculência. Acompanha batatas coradas e arroz branco."
  },
  {
    id: 4,
    name: "Salada Completa",
    description: "Mix de folhas, tomate, pepino, cenoura e molho especial.",
    price: "R$ 12,00",
    category: "Saladas",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    details: "Alface americana, rúcula, tomate cereja, pepino japonês, cenoura ralada, croutons e molho de mostarda e mel servido à parte."
  }
];