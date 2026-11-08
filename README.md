\## Schema Decisions



\*\*Why Book references Genre instead of embedding it:\*\*

Each Book stores a `genreId` that points to a row in the Genre table, instead of copying the genre name into every book. PostgreSQL is a relational database, so relationships are kept in separate tables linked by foreign keys. This means a genre's name is stored in one place. If a genre name changes, we update one row, not every book in that genre. It also avoids copies that could drift apart over time.



\*\*Role enum:\*\*

The `Role` enum (PATRON, LIBRARIAN) limits a user's role to those two values, so a typo such as "LIBRAIN" can't be saved.

