import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear old data so running this twice doesn't duplicate books
  await prisma.book.deleteMany();
  await prisma.genre.deleteMany();

  const fantasy = await prisma.genre.create({
    data: { name: 'Fantasy', slug: 'fantasy' },
  });
  const mystery = await prisma.genre.create({
    data: { name: 'Mystery', slug: 'mystery' },
  });
  const scifi = await prisma.genre.create({
    data: { name: 'Science Fiction', slug: 'science-fiction' },
  });
  const history = await prisma.genre.create({
    data: { name: 'History', slug: 'history' },
  });

  await prisma.book.createMany({
    data: [
      { title: 'The Hobbit', author: 'J.R.R. Tolkien', isbn: '9780547928227', genreId: fantasy.id, totalCopies: 3, availableCopies: 3 },
      { title: 'A Game of Thrones', author: 'George R.R. Martin', isbn: '9780553103540', genreId: fantasy.id, totalCopies: 2, availableCopies: 2 },
      { title: 'The Name of the Wind', author: 'Patrick Rothfuss', isbn: '9780756404741', genreId: fantasy.id, totalCopies: 2, availableCopies: 1 },
      { title: 'Mistborn: The Final Empire', author: 'Brandon Sanderson', isbn: '9780765311788', genreId: fantasy.id, totalCopies: 1, availableCopies: 1 },
      { title: 'The Girl with the Dragon Tattoo', author: 'Stieg Larsson', isbn: '9780307454546', genreId: mystery.id, totalCopies: 2, availableCopies: 2 },
      { title: 'And Then There Were None', author: 'Agatha Christie', isbn: '9780062073488', genreId: mystery.id, totalCopies: 3, availableCopies: 3 },
      { title: 'The Big Sleep', author: 'Raymond Chandler', isbn: '9780679722656', genreId: mystery.id, totalCopies: 1, availableCopies: 1 },
      { title: 'Gone Girl', author: 'Gillian Flynn', isbn: '9780307588371', genreId: mystery.id, totalCopies: 2, availableCopies: 0 },
      { title: 'Dune', author: 'Frank Herbert', isbn: '9780441172719', genreId: scifi.id, totalCopies: 3, availableCopies: 3 },
      { title: 'Neuromancer', author: 'William Gibson', isbn: '9780441569595', genreId: scifi.id, totalCopies: 1, availableCopies: 1 },
      { title: 'The Left Hand of Darkness', author: 'Ursula K. Le Guin', isbn: '9780441478125', genreId: scifi.id, totalCopies: 2, availableCopies: 2 },
      { title: 'Foundation', author: 'Isaac Asimov', isbn: '9780553293357', genreId: scifi.id, totalCopies: 2, availableCopies: 1 },
      { title: 'Guns, Germs, and Steel', author: 'Jared Diamond', isbn: '9780393317558', genreId: history.id, totalCopies: 2, availableCopies: 2 },
      { title: 'SPQR', author: 'Mary Beard', isbn: '9781631492280', genreId: history.id, totalCopies: 1, availableCopies: 1 },
      { title: 'The Guns of August', author: 'Barbara W. Tuchman', isbn: '9780345476098', genreId: history.id, totalCopies: 2, availableCopies: 2 },
      { title: 'Sapiens', author: 'Yuval Noah Harari', isbn: '9780062316097', genreId: history.id, totalCopies: 3, availableCopies: 2 },
    ],
  });

  console.log('Seed complete: 4 genres and 16 books added.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

