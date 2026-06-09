-- Seed London System puzzles
insert into puzzles (fen, solution, opening, opening_day, difficulty, hiro_tip, is_daily, daily_date) values
(
  'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3 0 1',
  array['d7d5'],
  'London System',
  1,
  1,
  'In the London System, 1.d4 controls the center. Black should respond symmetrically with 1...d5 to contest it.',
  true,
  current_date
),
(
  'rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq d6 0 2',
  array['g1f3'],
  'London System',
  2,
  1,
  'Nf3 is the signature London move. It develops the knight toward the center while avoiding the more aggressive lines.',
  false,
  null
),
(
  'rnbqkbnr/ppp1pppp/8/3p4/3P4/5N2/PPP1PPPP/RNBQKB1R b KQkq - 1 2',
  array['g8f6'],
  'London System',
  3,
  2,
  'Nf6 mirrors White''s development. Black fights for central control and prepares to castle kingside.',
  false,
  null
),
(
  'rnbqkb1r/ppp1pppp/5n2/3p4/3P4/5N2/PPP1PPPP/RNBQKB1R w KQkq - 2 3',
  array['c1f4'],
  'London System',
  4,
  2,
  'Bf4 is the London''s defining move. The bishop heads to f4 before closing the pawn chain. This is the key idea!',
  false,
  null
),
(
  'rnbqkb1r/ppp1pppp/5n2/3p4/3P1B2/5N2/PPP1PPPP/RN1QKB1R b KQkq - 3 3',
  array['e7e6'],
  'London System',
  5,
  3,
  'e6 solidifies Black''s center and prepares to develop the dark-squared bishop. The Bf4 is now locked out of key squares.',
  false,
  null
);
