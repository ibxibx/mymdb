const { MongoClient, ObjectId } = require("mongodb");

async function main() {
  const url =
    "mongodb+srv://magnyt:sC9qc3JHCnHxKnGJ@mymdb.z2qogep.mongodb.net/test";
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("test");
    const moviesCollection = db.collection("movies");
    const directorsCollection = db.collection("directors");
    const genresCollection = db.collection("genres");

    // Fetch all movies
    const movies = await moviesCollection.find().toArray();

    for (let movie of movies) {
      try {
        // Convert DirectorId to ObjectId if it's a string
        const directorId =
          movie.DirectorId instanceof ObjectId
            ? movie.DirectorId
            : new ObjectId(movie.DirectorId);

        // Find the director
        const director = await directorsCollection.findOne({ _id: directorId });

        // Find the genres
        const genreIds = movie.Genres.map((genreId) => new ObjectId(genreId));
        const genres = await genresCollection
          .find({ _id: { $in: genreIds } })
          .toArray();

        if (director) {
          // Update movie document with full director details and genres
          await moviesCollection.updateOne(
            { _id: movie._id },
            {
              $set: {
                Director: director,
                Genres: genres,
              },
            }
          );
          console.log(`Updated movie: ${movie.Title}`);
        } else {
          console.log(`Director not found for movie: ${movie.Title}`);
        }
      } catch (updateError) {
        console.error(`Error updating movie ${movie.Title}:`, updateError);
      }
    }
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
