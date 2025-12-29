// Centralized translations for ES and CA
export const copy = {
  es: {
    nav: {
      ariaLabel: 'Navegación principal',
      logoLabel: 'Oaxaca Brunch - Inicio',
      menu: 'Menú',
      story: 'Historia',
      gallery: 'Galería',
      reviews: 'Reseñas',
      visit: 'Visita',
      reserve: 'Reservar',
      reserveUrl: 'https://wa.me/34930123456?text=Hola,%20%bfpuedo%20reservar%20para...?'
    },
    hero: {
      title: 'Brunch artesanal y café de especialidad',
      subtitle: [
        'Recetas familiares transmitidas de generación en generación.',
        'Brunch mediterráneo en el corazón de Badalona.'
      ],
      cta: 'Explorar nuestra carta',
      banner:
        '☕ Café de especialidad • 🥐 Brunch artesanal • 🌱 Ingredientes frescos • 👨‍🍳 Recetas familiares • 🏠 Tradición oaxaqueña'
    },
    menuTeaser: {
      title: 'Nuestros favoritos',
      subtitle: 'Sabores destacados de la carta real de Oaxaca Brunch',
      filters: {
        all: 'Todos',
        vegetarian: 'Vegetariano',
        glutenFree: 'Sin gluten'
      },
      buttons: {
        viewMenu: 'Ver carta completa',
        whatsapp: 'Pedir por WhatsApp',
        whatsappUrl:
          'https://wa.me/34930123456?text=Hola%2C%20me%20gustar%C3%ADa%20hacer%20un%20pedido'
      },
      items: [
        {
          id: 1,
          name: 'Espresso doble',
          description: 'Doble shot de café de especialidad',
          price: '2,50 €',
          image:
            'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&h=400&q=80',
          tags: []
        },
        {
          id: 2,
          name: 'Iced Latte',
          description: 'Café de filtro con leche fría y hielo',
          price: '3,50 €',
          image:
            'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=400&h=400&q=80',
          tags: []
        },
        {
          id: 3,
          name: 'Matcha Latte',
          description: 'Infusión de matcha suave, caliente o frío',
          price: '3 €',
          image:
            'https://images.unsplash.com/photo-1527169402691-feff5539e52c?auto=format&fit=crop&w=400&h=400&q=80',
          tags: ['vegetarian']
        },
        {
          id: 4,
          name: 'Jugo Dante',
          description: 'Naranja, remolacha, zanahoria y limón recién exprimidos',
          price: '5,50 €',
          image:
            'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=400&h=400&q=80',
          tags: ['vegetarian', 'gluten-free']
        },
        {
          id: 5,
          name: 'Bagel de salmón y aguacate',
          description: 'Salmón, aguacate, rúcula y queso crema',
          price: '8,50 €',
          image: '/assets/images/menu/Croissant_de_salmo.webp',
          tags: []
        },
        {
          id: 6,
          name: 'Power bagel',
          description: 'Salmón, huevo revuelto, crema de queso al limón y aguacate',
          price: '10 €',
          image:
            'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&h=400&q=80',
          tags: []
        },
        {
          id: 7,
          name: 'Torrada de hummus y aguacate',
          description: 'Pan de masa madre con hummus de garbanzo y aguacate',
          price: '6,50 €',
          image: '/assets/images/menu/tostada_hummus.webp',
          tags: ['vegetarian']
        },
        {
          id: 8,
          name: 'Granola casera',
          description: 'Yogur natural, frutos rojos, plátano y miel',
          price: '7 €',
          image: '/assets/images/menu/granola_casolana.webp',
          tags: ['vegetarian']
        }
      ]
    },
    visit: {
      title: 'Ven a visitarnos',
      hoursTitle: 'Horarios',
      hoursData: [
        { day: 'Lunes', time: '08:00 - 13:30 / 15:30 - 18:00', dayNum: 1 },
        { day: 'Martes - Miércoles', time: 'Cerrado', dayNum: [2, 3], closed: true },
        { day: 'Jueves - Viernes', time: '08:00 - 13:30 / 15:30 - 18:00', dayNum: [4, 5] },
        { day: 'Sábado - Domingo', time: '08:30 - 18:00', dayNum: [6, 0] }
      ],
      status: {
        open: 'Abierto ahora',
        closed: 'Cerrado',
        opensIn: (hours) => `Abre en ${hours}h`
      },
      buttons: {
        directions: 'Cómo llegar',
        call: 'Llamar'
      },
      mapTitle: 'Ubicación de Oaxaca Brunch en Carrer de Arnús 31, Badalona',
      addressTitle: 'Dirección',
      addressLines: ['Carrer de Arnús, 31', '08911 Badalona, Barcelona'],
      transport: '🚇 Metro L2 Pompeu Fabra (5 min a pie)'
    },
    footer: {
      contactTitle: 'Contacto',
      hoursTitle: 'Horarios',
      followTitle: 'Síguenos',
      languageTitle: 'Idioma',
      hoursLines: [
        'Lunes: 08:00 - 13:30 / 15:30 - 18:00',
        'Martes - Miércoles: Cerrado',
        'Jueves - Viernes: 08:00 - 13:30 / 15:30 - 18:00',
        'Sábado - Domingo: 08:30 - 18:00'
      ],
      languages: { es: 'Español', ca: 'Català' },
      rights: '© 2024 Oaxaca Brunch. Todos los derechos reservados.',
      legal: {
        privacy: 'Política de privacidad',
        cookies: 'Cookies',
        legal: 'Aviso legal'
      }
    },
    seo: {
      title: 'Oaxaca Brunch — Café de especialidad en Badalona',
      description:
        'Brunch artesanal y café de especialidad en Badalona. Café de origen, repostería artesanal y platos de temporada en el centro de la ciudad.',
      servesCuisine: 'Brunch, café de especialidad'
    }
  },
  ca: {
    nav: {
      ariaLabel: 'Navegació principal',
      logoLabel: 'Oaxaca Brunch - Inici',
      menu: 'Menú',
      story: 'Història',
      gallery: 'Galeria',
      reviews: 'Ressenyes',
      visit: 'Visita',
      reserve: 'Reservar',
      reserveUrl: 'https://wa.me/34930123456?text=Hola,%20puc%20reservar%20per...?'
    },
    hero: {
      title: "Brunch artesanal i cafè d'especialitat",
      subtitle: [
        'Receptes familiars transmeses de generació en generació.',
        'Brunch mediterrani al cor de Badalona.'
      ],
      cta: 'Explora la nostra carta',
      banner:
        "☕ Cafè d'especialitat • 🥐 Brunch artesanal • 🌱 Ingredients frescos • 👨‍🍳 Receptes familiars • 🏠 Tradició oaxaqueña"
    },
    menuTeaser: {
      title: 'Els nostres favorits',
      subtitle: "Sabors destacats de la carta real d'Oaxaca Brunch",
      filters: {
        all: 'Tots',
        vegetarian: 'Vegetarià',
        glutenFree: 'Sense gluten'
      },
      buttons: {
        viewMenu: 'Veure carta completa',
        whatsapp: 'Demanar per WhatsApp',
        whatsappUrl:
          'https://wa.me/34930123456?text=Hola%2C%20m%27agradaria%20fer%20una%20comanda'
      },
      items: [
        {
          id: 1,
          name: 'Espresso doble',
          description: "Doble shot de cafè d'especialitat",
          price: '2,50 €',
          image:
            'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&h=400&q=80',
          tags: []
        },
        {
          id: 2,
          name: 'Iced Latte',
          description: 'Cafè de filtre amb llet freda i gel',
          price: '3,50 €',
          image:
            'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=400&h=400&q=80',
          tags: []
        },
        {
          id: 3,
          name: 'Matcha Latte',
          description: 'Infusió de matcha suau, calenta o freda',
          price: '3 €',
          image:
            'https://images.unsplash.com/photo-1527169402691-feff5539e52c?auto=format&fit=crop&w=400&h=400&q=80',
          tags: ['vegetarian']
        },
        {
          id: 4,
          name: 'Suc Dante',
          description: 'Taronja, remolatxa, pastanaga i llimona acabades de premsar',
          price: '5,50 €',
          image:
            'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=400&h=400&q=80',
          tags: ['vegetarian', 'gluten-free']
        },
        {
          id: 5,
          name: "Bagel de salmó i alvocat",
          description: 'Salmó, alvocat, ruca i formatge crema',
          price: '8,50 €',
          image: '/assets/images/menu/Croissant_de_salmo.webp',
          tags: []
        },
        {
          id: 6,
          name: 'Power bagel',
          description: 'Salmó, ous remenats, crema de formatge al llimó i alvocat',
          price: '10 €',
          image:
            'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&h=400&q=80',
          tags: []
        },
        {
          id: 7,
          name: "Torrada d'hummus i alvocat",
          description: 'Pa de massa mare amb hummus de cigró i alvocat',
          price: '6,50 €',
          image: '/assets/images/menu/tostada_hummus.webp',
          tags: ['vegetarian']
        },
        {
          id: 8,
          name: 'Granola casolana',
          description: 'Iogurt natural, fruits vermells, plàtan i mel',
          price: '7 €',
          image: '/assets/images/menu/granola_casolana.webp',
          tags: ['vegetarian']
        }
      ]
    },
    visit: {
      title: 'Vine a visitar-nos',
      hoursTitle: 'Horaris',
      hoursData: [
        { day: 'Dilluns', time: '08:00 - 13:30 / 15:30 - 18:00', dayNum: 1 },
        { day: 'Dimarts - Dimecres', time: 'Tancat', dayNum: [2, 3], closed: true },
        { day: 'Dijous - Divendres', time: '08:00 - 13:30 / 15:30 - 18:00', dayNum: [4, 5] },
        { day: 'Dissabte - Diumenge', time: '08:30 - 18:00', dayNum: [6, 0] }
      ],
      status: {
        open: 'Obert ara',
        closed: 'Tancat',
        opensIn: (hours) => `Obre en ${hours}h`
      },
      buttons: {
        directions: 'Com arribar',
        call: 'Trucar'
      },
      mapTitle: "Ubicació d'Oaxaca Brunch a Carrer de Arnús 31, Badalona",
      addressTitle: 'Adreça',
      addressLines: ['Carrer de Arnús, 31', '08911 Badalona, Barcelona'],
      transport: '🚇 Metro L2 Pompeu Fabra (5 min a peu)'
    },
    footer: {
      contactTitle: 'Contacte',
      hoursTitle: 'Horaris',
      followTitle: 'Segueix-nos',
      languageTitle: 'Idioma',
      hoursLines: [
        'Dilluns: 08:00 - 13:30 / 15:30 - 18:00',
        'Dimarts - Dimecres: Tancat',
        'Dijous - Divendres: 08:00 - 13:30 / 15:30 - 18:00',
        'Dissabte - Diumenge: 08:30 - 18:00'
      ],
      languages: { es: 'Español', ca: 'Català' },
      rights: '© 2024 Oaxaca Brunch. Tots els drets reservats.',
      legal: {
        privacy: 'Política de privacitat',
        cookies: 'Galetes',
        legal: 'Avís legal'
      }
    },
    seo: {
      title: "Oaxaca Brunch — Cafè d'especialitat a Badalona",
      description:
        "Brunch artesanal i cafè d'especialitat a Badalona. Cafè d'origen, rebosteria artesanal i plats de temporada al centre de la ciutat.",
      servesCuisine: "Brunch, cafè d'especialitat"
    }
  }
}
