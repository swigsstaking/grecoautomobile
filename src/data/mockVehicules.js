const mockVehicules = [
  {
    _id: 'mock-1',
    name: 'BMW Série 3 320d M Sport',
    brand: 'BMW',
    model: '320d M Sport',
    year: 2022,
    mileage: 34500,
    fuelType: 'Diesel',
    transmission: 'Automatique',
    color: 'Noir Saphir',
    price: 42900,
    description: `BMW Série 3 320d M Sport en excellent état, première main.

Équipements :
- Pack M Sport intérieur et extérieur
- Navigation professionnelle avec écran tactile 12.3"
- Sièges sport en cuir Dakota noir
- Système audio Harman Kardon
- Caméra de recul avec aide au stationnement
- Phares LED adaptatifs
- Jantes alliage M 19"
- Régulateur de vitesse adaptatif
- Toit ouvrant panoramique

Historique complet disponible. Carnet d'entretien à jour chez BMW.
Garantie 12 mois incluse.`,
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=800&h=500&fit=crop',
    ],
    status: 'available',
    createdAt: '2026-03-01T10:00:00Z',
  },
  {
    _id: 'mock-2',
    name: 'Mercedes-Benz Classe C 300e AMG Line',
    brand: 'Mercedes-Benz',
    model: 'C 300e AMG Line',
    year: 2023,
    mileage: 18200,
    fuelType: 'Hybride',
    transmission: 'Automatique',
    color: 'Gris Sélénite',
    price: 54900,
    description: `Mercedes-Benz Classe C 300e hybride rechargeable, finition AMG Line.

Équipements :
- Pack AMG Line intérieur et extérieur
- Écran MBUX 11.9" avec navigation
- Sièges en cuir nappa chauffants et ventilés
- Système audio Burmester 3D surround
- Autonomie électrique ~100 km
- Digital Light LED haute résolution
- Suspension adaptative AIRMATIC
- Jantes AMG 19" multibranches
- Head-up display couleur
- Aide active au stationnement avec caméra 360°

Véhicule en état irréprochable, comme neuf.
Garantie constructeur jusqu'en mars 2027.`,
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800&h=500&fit=crop',
    ],
    status: 'available',
    createdAt: '2026-02-28T14:00:00Z',
  },
  {
    _id: 'mock-3',
    name: 'Audi A4 Avant 40 TDI S-Line',
    brand: 'Audi',
    model: 'A4 Avant 40 TDI S-Line',
    year: 2021,
    mileage: 56800,
    fuelType: 'Diesel',
    transmission: 'Automatique',
    color: 'Bleu Navarre',
    price: 36500,
    description: `Audi A4 Avant 40 TDI quattro S-Line, véhicule familial sportif.

Équipements :
- Pack S-Line extérieur et intérieur
- Transmission intégrale quattro
- Virtual Cockpit Plus 12.3"
- MMI Navigation Plus avec écran tactile 10.1"
- Sièges sport S-Line en cuir/alcantara
- Bang & Olufsen Premium Sound
- Phares Matrix LED
- Jantes alliage 19" design S
- Hayon électrique mains-libres
- Audi Pre Sense 360

Parfait état mécanique et esthétique.
Garantie 12 mois incluse.`,
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f373e?w=800&h=500&fit=crop',
    ],
    status: 'available',
    createdAt: '2026-02-25T09:00:00Z',
  },
  {
    _id: 'mock-4',
    name: 'Porsche Cayenne E-Hybrid',
    brand: 'Porsche',
    model: 'Cayenne E-Hybrid',
    year: 2023,
    mileage: 12400,
    fuelType: 'Hybride',
    transmission: 'Automatique',
    color: 'Blanc Carrara',
    price: 89900,
    description: `Porsche Cayenne E-Hybrid, le SUV sportif par excellence.

Équipements :
- Puissance combinée 470 ch
- Pack Sport Chrono
- Suspension pneumatique adaptative PASM
- Intérieur cuir naturel noir
- Porsche Communication Management (PCM) 12.3"
- BOSE Surround Sound System
- Toit panoramique fixe en verre
- Jantes RS Spyder Design 21"
- Phares LED Matrix avec PDLS Plus
- Attelage de remorque rétractable

Véhicule quasi neuf, état exceptionnel.
Garantie Porsche Approved jusqu'en 2028.`,
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=500&fit=crop',
    ],
    status: 'available',
    createdAt: '2026-03-05T11:00:00Z',
  },
  {
    _id: 'mock-5',
    name: 'Volkswagen Golf 8 GTI',
    brand: 'Volkswagen',
    model: 'Golf 8 GTI',
    year: 2022,
    mileage: 28700,
    fuelType: 'Essence',
    transmission: 'Automatique DSG',
    color: 'Rouge Tornado',
    price: 34900,
    description: `Volkswagen Golf 8 GTI, la sportive du quotidien.

Équipements :
- Moteur 2.0 TSI 245 ch
- Boîte DSG 7 rapports
- Digital Cockpit Pro 10.25"
- Discover Pro 10" avec navigation
- Sièges sport GTI "Clark" tartan
- Différentiel à blocage électronique XDS
- Phares LED IQ.LIGHT Matrix
- Jantes alliage 18" Richmond
- Caméra de recul avec Park Assist
- Adaptive Cruise Control

Sportive et polyvalente, en excellent état.
Garantie 12 mois incluse.`,
    images: [
      'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&h=500&fit=crop',
    ],
    status: 'available',
    createdAt: '2026-02-20T16:00:00Z',
  },
  {
    _id: 'mock-6',
    name: 'Tesla Model 3 Long Range',
    brand: 'Tesla',
    model: 'Model 3 Long Range',
    year: 2023,
    mileage: 15300,
    fuelType: 'Électrique',
    transmission: 'Automatique',
    color: 'Gris Midnight Silver',
    price: 41900,
    description: `Tesla Model 3 Long Range, la berline électrique de référence.

Caractéristiques :
- Autonomie ~600 km (WLTP)
- 0-100 km/h en 4.4 secondes
- Transmission intégrale Dual Motor
- Autopilot de série
- Écran tactile 15.4" avec navigation
- Intérieur cuir vegan noir
- Toit en verre panoramique
- Jantes aero 18"
- Supercharge gratuit 1 an
- Audio Premium 14 haut-parleurs

Batterie en excellent état (98% de capacité).
Garantie Tesla jusqu'en 2031 (batterie et moteur).`,
    images: [
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1571987502227-9231b837d92a?w=800&h=500&fit=crop',
    ],
    status: 'available',
    createdAt: '2026-03-08T08:00:00Z',
  },
  {
    _id: 'mock-7',
    name: 'Range Rover Sport D300 HSE Dynamic',
    brand: 'Land Rover',
    model: 'Range Rover Sport D300',
    year: 2022,
    mileage: 41200,
    fuelType: 'Diesel',
    transmission: 'Automatique',
    color: 'Noir Santorini',
    price: 72500,
    description: `Range Rover Sport D300 HSE Dynamic, le luxe tout-terrain.

Équipements :
- Moteur 3.0 D300 Ingenium 300 ch
- Terrain Response 2 avec modes automatiques
- Suspension pneumatique adaptative
- Intérieur cuir Windsor ébène
- Meridian Surround Sound 825W
- Pivi Pro 13.1" avec navigation
- Digital Driver Display 13.7"
- Phares Pixel LED avec signature DRL
- Toit ouvrant panoramique coulissant
- Pack Driving Assist Pro

SUV premium, parfait pour la route et le hors-piste.
Garantie 12 mois incluse.`,
    images: [
      'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1519245659620-e859806a8d7b?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1583267746897-2cf415887172?w=800&h=500&fit=crop',
    ],
    status: 'available',
    createdAt: '2026-02-15T13:00:00Z',
  },
  {
    _id: 'mock-8',
    name: 'Fiat 500e La Prima',
    brand: 'Fiat',
    model: '500e La Prima',
    year: 2023,
    mileage: 8900,
    fuelType: 'Électrique',
    transmission: 'Automatique',
    color: 'Vert Latte Menthe',
    price: 28500,
    description: `Fiat 500e La Prima, la citadine électrique au style unique.

Équipements :
- Autonomie ~320 km (WLTP)
- Moteur 118 ch
- Finition La Prima (haut de gamme)
- Toit ouvrant en toile électrique
- Écran tactile UConnect 10.25"
- Sièges en éco-cuir
- Navigation avec services connectés
- Jantes alliage 17" diamantées
- Caméra de recul avec capteurs 360°
- Charge rapide DC 85 kW

Idéale pour la ville, faible kilométrage.
Garantie constructeur jusqu'en 2028.`,
    images: [
      'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0aca?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&h=500&fit=crop',
    ],
    status: 'available',
    createdAt: '2026-03-10T10:00:00Z',
  },
  {
    _id: 'mock-9',
    name: 'Volvo XC60 T6 Recharge Inscription',
    brand: 'Volvo',
    model: 'XC60 T6 Recharge',
    year: 2022,
    mileage: 37600,
    fuelType: 'Hybride',
    transmission: 'Automatique',
    color: 'Bleu Denim',
    price: 49900,
    description: `Volvo XC60 T6 Recharge AWD Inscription, le SUV familial suédois.

Équipements :
- Motorisation hybride rechargeable 350 ch
- Transmission intégrale AWD
- Finition Inscription (la plus complète)
- Écran Sensus 9" vertical avec navigation
- Cockpit digital 12.3"
- Sièges cuir nappa ventilés et massants
- Bowers & Wilkins Premium Sound
- Toit panoramique
- Pilot Assist (conduite semi-autonome)
- 4 caméras surround avec vue 360°

Sécurité maximale, confort premium.
Garantie 12 mois incluse.`,
    images: [
      'https://images.unsplash.com/photo-1583267746897-2cf415887172?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&h=500&fit=crop',
    ],
    status: 'sold',
    createdAt: '2026-01-20T09:00:00Z',
  },
];

export default mockVehicules;
