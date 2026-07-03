export interface Team {
  id: string;
  name: string;
  marketValue: number; // in Millions Euro
  type: 'club' | 'country';
  country?: string;
  logo?: string;
}

export const mockTeams: Team[] = [
  // ENGLAND (Premier League & Championship)
  { id: '1', name: 'Manchester City', marketValue: 1260, type: 'club', country: 'England' },
  { id: '2', name: 'Arsenal FC', marketValue: 1160, type: 'club', country: 'England' },
  { id: '5', name: 'Chelsea FC', marketValue: 928, type: 'club', country: 'England' },
  { id: '7', name: 'Liverpool FC', marketValue: 921, type: 'club', country: 'England' },
  { id: '9', name: 'Tottenham Hotspur', marketValue: 777, type: 'club', country: 'England' },
  { id: '10', name: 'Manchester United', marketValue: 734, type: 'club', country: 'England' },
  { id: '11', name: 'Aston Villa', marketValue: 646, type: 'club', country: 'England' },
  { id: '20', name: 'Newcastle United', marketValue: 638, type: 'club', country: 'England' },
  { id: '21', name: 'Brighton & Hove Albion', marketValue: 488, type: 'club', country: 'England' },
  { id: '22', name: 'West Ham United', marketValue: 462, type: 'club', country: 'England' },
  { id: '23', name: 'Crystal Palace', marketValue: 432, type: 'club', country: 'England' },
  { id: '24', name: 'Nottingham Forest', marketValue: 365, type: 'club', country: 'England' },
  { id: '25', name: 'Wolverhampton Wanderers', marketValue: 342, type: 'club', country: 'England' },
  { id: '26', name: 'Everton FC', marketValue: 335, type: 'club', country: 'England' },
  { id: '27', name: 'Brentford FC', marketValue: 328, type: 'club', country: 'England' },
  { id: '28', name: 'Fulham FC', marketValue: 315, type: 'club', country: 'England' },
  { id: '29', name: 'Leicester City', marketValue: 285, type: 'club', country: 'England' },
  { id: '30', name: 'Southampton FC', marketValue: 265, type: 'club', country: 'England' },
  { id: '31', name: 'Ipswich Town', marketValue: 185, type: 'club', country: 'England' },
  { id: '32', name: 'Bournemouth', marketValue: 325, type: 'club', country: 'England' },
  { id: 'e21', name: 'Leeds United', marketValue: 195, type: 'club', country: 'England' },
  { id: 'e22', name: 'Burnley FC', marketValue: 180, type: 'club', country: 'England' },
  { id: 'e23', name: 'Sheffield United', marketValue: 155, type: 'club', country: 'England' },

  // SPAIN (La Liga)
  { id: '3', name: 'Real Madrid', marketValue: 1040, type: 'club', country: 'Spain' },
  { id: '8', name: 'FC Barcelona', marketValue: 840, type: 'club', country: 'Spain' },
  { id: '17', name: 'Atletico Madrid', marketValue: 454, type: 'club', country: 'Spain' },
  { id: 's4', name: 'Real Sociedad', marketValue: 478, type: 'club', country: 'Spain' },
  { id: 's5', name: 'Athletic Bilbao', marketValue: 260, type: 'club', country: 'Spain' },
  { id: 's6', name: 'Girona FC', marketValue: 245, type: 'club', country: 'Spain' },
  { id: 's7', name: 'Villarreal CF', marketValue: 210, type: 'club', country: 'Spain' },
  { id: 's8', name: 'Real Betis', marketValue: 205, type: 'club', country: 'Spain' },
  { id: 's9', name: 'Valencia CF', marketValue: 215, type: 'club', country: 'Spain' },
  { id: 's10', name: 'Sevilla FC', marketValue: 185, type: 'club', country: 'Spain' },
  { id: 's11', name: 'CA Osasuna', marketValue: 110, type: 'club', country: 'Spain' },
  { id: 's12', name: 'Getafe CF', marketValue: 105, type: 'club', country: 'Spain' },

  // ITALY (Serie A)
  { id: '13', name: 'Inter Milan', marketValue: 622, type: 'club', country: 'Italy' },
  { id: '14', name: 'AC Milan', marketValue: 533, type: 'club', country: 'Italy' },
  { id: '15', name: 'SSC Napoli', marketValue: 513, type: 'club', country: 'Italy' },
  { id: '16', name: 'Juventus FC', marketValue: 490, type: 'club', country: 'Italy' },
  { id: 'i5', name: 'AS Roma', marketValue: 335, type: 'club', country: 'Italy' },
  { id: 'i6', name: 'Atalanta BC', marketValue: 350, type: 'club', country: 'Italy' },
  { id: 'i7', name: 'SS Lazio', marketValue: 240, type: 'club', country: 'Italy' },
  { id: 'i8', name: 'ACF Fiorentina', marketValue: 255, type: 'club', country: 'Italy' },
  { id: 'i9', name: 'Bologna FC 1909', marketValue: 220, type: 'club', country: 'Italy' },
  { id: 'i10', name: 'Torino FC', marketValue: 180, type: 'club', country: 'Italy' },

  // GERMANY (Bundesliga)
  { id: '6', name: 'FC Bayern Munich', marketValue: 929, type: 'club', country: 'Germany' },
  { id: '12', name: 'Bayer 04 Leverkusen', marketValue: 595, type: 'club', country: 'Germany' },
  { id: '18', name: 'Borussia Dortmund', marketValue: 465, type: 'club', country: 'Germany' },
  { id: '19', name: 'RB Leipzig', marketValue: 496, type: 'club', country: 'Germany' },
  { id: 'g5', name: 'Eintracht Frankfurt', marketValue: 275, type: 'club', country: 'Germany' },
  { id: 'g6', name: 'VfB Stuttgart', marketValue: 280, type: 'club', country: 'Germany' },
  { id: 'g7', name: 'VfL Wolfsburg', marketValue: 225, type: 'club', country: 'Germany' },
  { id: 'g8', name: 'SC Freiburg', marketValue: 165, type: 'club', country: 'Germany' },
  { id: 'g9', name: 'Borussia M\u00f6nchengladbach', marketValue: 155, type: 'club', country: 'Germany' },

  // FRANCE (Ligue 1)
  { id: '4', name: 'Paris Saint-Germain', marketValue: 1020, type: 'club', country: 'France' },
  { id: 'f2', name: 'AS Monaco', marketValue: 345, type: 'club', country: 'France' },
  { id: 'f3', name: 'LOSC Lille', marketValue: 285, type: 'club', country: 'France' },
  { id: 'f4', name: 'Olympique Marseille', marketValue: 235, type: 'club', country: 'France' },
  { id: 'f5', name: 'Olympique Lyon', marketValue: 220, type: 'club', country: 'France' },
  { id: 'f6', name: 'Stade Rennais', marketValue: 250, type: 'club', country: 'France' },
  { id: 'f7', name: 'OGC Nice', marketValue: 240, type: 'club', country: 'France' },
  { id: 'f8', name: 'RC Lens', marketValue: 215, type: 'club', country: 'France' },

  // PORTUGAL (Liga Portugal)
  { id: 'p1', name: 'SL Benfica', marketValue: 365, type: 'club', country: 'Portugal' },
  { id: 'p2', name: 'Sporting CP', marketValue: 330, type: 'club', country: 'Portugal' },
  { id: 'p3', name: 'FC Porto', marketValue: 285, type: 'club', country: 'Portugal' },
  { id: 'p4', name: 'SC Braga', marketValue: 125, type: 'club', country: 'Portugal' },

  // NETHERLANDS (Eredivisie)
  { id: 'n1', name: 'PSV Eindhoven', marketValue: 285, type: 'club', country: 'Netherlands' },
  { id: 'n2', name: 'Feyenoord Rotterdam', marketValue: 315, type: 'club', country: 'Netherlands' },
  { id: 'n3', name: 'Ajax Amsterdam', marketValue: 215, type: 'club', country: 'Netherlands' },
  { id: 'n4', name: 'AZ Alkmaar', marketValue: 95, type: 'club', country: 'Netherlands' },

  // TURKEY (S\u00fcper Lig)
  { id: 't1', name: 'Galatasaray', marketValue: 195, type: 'club', country: 'Turkey' },
  { id: 't2', name: 'Fenerbahce', marketValue: 205, type: 'club', country: 'Turkey' },
  { id: 't3', name: 'Besiktas JK', marketValue: 125, type: 'club', country: 'Turkey' },
  { id: 't4', name: 'Trabzonspor', marketValue: 95, type: 'club', country: 'Turkey' },

  // BRAZIL (S\u00e9rie A)
  { id: 'b1', name: 'Flamengo', marketValue: 172, type: 'club', country: 'Brazil' },
  { id: 'b2', name: 'Palmeiras', marketValue: 210, type: 'club', country: 'Brazil' },
  { id: 'b3', name: 'Botafogo', marketValue: 75, type: 'club', country: 'Brazil' },
  { id: 'b4', name: 'Fluminense', marketValue: 98, type: 'club', country: 'Brazil' },
  { id: 'b5', name: 'S\u00e3o Paulo FC', marketValue: 92, type: 'club', country: 'Brazil' },

  // ARGENTINA (Primera Divisi\u00f3n)
  { id: 'a1', name: 'River Plate', marketValue: 95, type: 'club', country: 'Argentina' },
  { id: 'a2', name: 'Boca Juniors', marketValue: 78, type: 'club', country: 'Argentina' },

  // SAUDI ARABIA (Saudi Pro League)
  { id: 'sa1', name: 'Al-Hilal SFC', marketValue: 242, type: 'club', country: 'Saudi Arabia' },
  { id: 'sa2', name: 'Al-Nassr FC', marketValue: 144, type: 'club', country: 'Saudi Arabia' },
  { id: 'sa3', name: 'Al-Ahli SFC', marketValue: 165, type: 'club', country: 'Saudi Arabia' },
  { id: 'sa4', name: 'Al-Ittihad Club', marketValue: 155, type: 'club', country: 'Saudi Arabia' },

  // USA (MLS)
  { id: 'm1', name: 'Inter Miami CF', marketValue: 95, type: 'club', country: 'USA' },
  { id: 'm2', name: 'Columbus Crew', marketValue: 55, type: 'club', country: 'USA' },
  { id: 'm3', name: 'LAFC', marketValue: 58, type: 'club', country: 'USA' },

  // SCOTLAND
  { id: 'sc1', name: 'Celtic FC', marketValue: 118, type: 'club', country: 'Scotland' },
  { id: 'sc2', name: 'Rangers FC', marketValue: 80, type: 'club', country: 'Scotland' },

  // COUNTRIES
  { id: 'c1', name: 'England', marketValue: 1470, type: 'country' },
  { id: 'c2', name: 'France', marketValue: 1210, type: 'country' },
  { id: 'c3', name: 'Portugal', marketValue: 1050, type: 'country' },
  { id: 'c4', name: 'Brazil', marketValue: 1040, type: 'country' },
  { id: 'c5', name: 'Spain', marketValue: 906, type: 'country' },
  { id: 'c6', name: 'Argentina', marketValue: 727, type: 'country' },
  { id: 'c7', name: 'Germany', marketValue: 655, type: 'country' },
  { id: 'c8', name: 'Italy', marketValue: 610, type: 'country' },
  { id: 'c9', name: 'Netherlands', marketValue: 615, type: 'country' },
  { id: 'c10', name: 'Belgium', marketValue: 541, type: 'country' },
  { id: 'c11', name: 'Norway', marketValue: 446, type: 'country' },
  { id: 'c12', name: 'Uruguay', marketValue: 486, type: 'country' },
  { id: 'c13', name: 'Nigeria', marketValue: 462, type: 'country' },
  { id: 'c14', name: 'Morocco', marketValue: 347, type: 'country' },
  { id: 'c15', name: 'Denmark', marketValue: 416, type: 'country' },
  { id: 'c16', name: 'Croatia', marketValue: 325, type: 'country' },
  { id: 'c17', name: 'Senegal', marketValue: 285, type: 'country' },
  { id: 'c18', name: 'USA', marketValue: 310, type: 'country' },
  { id: 'c19', name: 'Japan', marketValue: 275, type: 'country' },
  { id: 'c20', name: 'South Korea', marketValue: 185, type: 'country' },
  { id: 'c21', name: 'Mexico', marketValue: 215, type: 'country' },
  { id: 'c22', name: 'Switzerland', marketValue: 280, type: 'country' },
  { id: 'c23', name: 'Austria', marketValue: 255, type: 'country' },
  { id: 'c24', name: 'Turkey', marketValue: 320, type: 'country' },
  { id: 'c25', name: 'Ukraine', marketValue: 380, type: 'country' },
];
