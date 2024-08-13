const { MongoClient, ObjectId } = require("mongodb");

const uri =
  "mongodb+srv://magnyt:sC9qc3JHCnHxKnGJ@mymdb.z2qogep.mongodb.net/test?retryWrites=true&w=majority&appName=mymdb";
const client = new MongoClient(uri);

async function updateGenres() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("test"); // Using "test" as the database name based on your output
    console.log("Connected to database:", db.databaseName);

    const moviesCollection = db.collection("movies");
    console.log("Connected to collection:", moviesCollection.collectionName);

    // Check if the collection exists and has documents
    const count = await moviesCollection.countDocuments();
    console.log("Number of documents in collection:", count);

    if (count > 0) {
      // Function to update a movie
      async function updateMovie(title, genres) {
        try {
          const result = await moviesCollection.updateOne(
            { Title: title },
            {
              $set: { Genres: genres.map((id) => new ObjectId(id)) },
              $unset: { GenreId: "" },
            }
          );
          console.log(`Updated ${title}:`, result.modifiedCount);
        } catch (updateError) {
          console.error(`Error updating ${title}:`, updateError);
        }
      }

      // Update all movies
      await updateMovie("Avatar", [
        "66a958c29204ace2bd730a05",
        "66a958c29204ace2bd730a06",
        "66a958c29204ace2bd730a0b",
      ]);
      await updateMovie("Dogville", [
        "66a958c29204ace2bd730a08",
        "66a958c29204ace2bd730a12",
      ]);
      await updateMovie("Navalny", [
        "66a958c29204ace2bd730a0a",
        "66a958c29204ace2bd730a09",
      ]);
      await updateMovie("Alexander", [
        "66a958c29204ace2bd730a12",
        "66a958c29204ace2bd730a05",
        "66a958c29204ace2bd730a09",
      ]);
      await updateMovie("2001: A Space Odyssey", [
        "66a958c29204ace2bd730a06",
        "66a958c29204ace2bd730a0f",
      ]);
      await updateMovie("The Devil Wears Prada", [
        "66a958c29204ace2bd730a12",
        "66a958c29204ace2bd730a07",
      ]);
      await updateMovie("Anna", [
        "66a958c29204ace2bd730a05",
        "66a958c29204ace2bd730a10",
      ]);
      await updateMovie("The Good Liar", [
        "66a958c29204ace2bd730a08",
        "66a958c29204ace2bd730a12",
        "66a958c29204ace2bd730a0d",
      ]);
      await updateMovie("American Beauty", ["66a958c29204ace2bd730a12"]);
      await updateMovie("The Debt", [
        "66a958c29204ace2bd730a12",
        "66a958c29204ace2bd730a10",
      ]);
      await updateMovie("Vivarium", [
        "66a958c29204ace2bd730a0c",
        "66a958c29204ace2bd730a0d",
        "66a958c29204ace2bd730a0f",
      ]);
      await updateMovie("The House That Jack Built", [
        "66a958c29204ace2bd730a08",
        "66a958c29204ace2bd730a12",
        "66a958c29204ace2bd730a0c",
      ]);
      await updateMovie("Kill Bill Vol. 2", [
        "66a958c29204ace2bd730a05",
        "66a958c29204ace2bd730a08",
        "66a958c29204ace2bd730a12",
      ]);
      await updateMovie("Forrest Gump", [
        "66a958c29204ace2bd730a12",
        "66a958c29204ace2bd730a0e",
      ]);
      await updateMovie("Schindler's List", [
        "66a958c29204ace2bd730a09",
        "66a958c29204ace2bd730a12",
        "66a958c29204ace2bd730a09",
      ]);
      await updateMovie("The Hundred-Foot Journey", [
        "66a958c29204ace2bd730a12",
        "66a958c29204ace2bd730a07",
      ]);
      await updateMovie("Woman in Gold", [
        "66a958c29204ace2bd730a12",
        "66a958c29204ace2bd730a09",
        "66a958c29204ace2bd730a09",
      ]);
      await updateMovie("Interstellar", [
        "66a958c29204ace2bd730a06",
        "66a958c29204ace2bd730a12",
        "66a958c29204ace2bd730a0f",
      ]);
      await updateMovie("The Lord of the Rings: The Return of the King", [
        "66a958c29204ace2bd730a06",
        "66a958c29204ace2bd730a12",
        "66a958c29204ace2bd730a0b",
      ]);
      await updateMovie("Melancholia", [
        "66a958c29204ace2bd730a12",
        "66a958c29204ace2bd730a0f",
      ]);
      await updateMovie("The Platform", [
        "66a958c29204ace2bd730a0c",
        "66a958c29204ace2bd730a0f",
        "66a958c29204ace2bd730a10",
      ]);
      await updateMovie("Inception", [
        "66a958c29204ace2bd730a05",
        "66a958c29204ace2bd730a06",
        "66a958c29204ace2bd730a0f",
      ]);
      await updateMovie("The Social Network", [
        "66a958c29204ace2bd730a09",
        "66a958c29204ace2bd730a12",
      ]);
      await updateMovie("The Messenger: The Story of Joan of Arc", [
        "66a958c29204ace2bd730a06",
        "66a958c29204ace2bd730a09",
        "66a958c29204ace2bd730a12",
      ]);
      await updateMovie("Kill Bill Vol. 1", [
        "66a958c29204ace2bd730a05",
        "66a958c29204ace2bd730a08",
        "66a958c29204ace2bd730a12",
      ]);
      await updateMovie("The Great Dictator", [
        "66a958c29204ace2bd730a07",
        "66a958c29204ace2bd730a12",
        "66a958c29204ace2bd730a11",
      ]);
    } else {
      console.log(
        "No documents found in the collection. Please check your database and collection names."
      );
    }
  } catch (error) {
    console.error("Error updating genres:", error);
  } finally {
    await client.close();
    console.log("Disconnected from MongoDB");
  }
}

updateGenres();
