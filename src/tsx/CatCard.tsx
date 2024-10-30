import React, {
  useState,
  useEffect,
  ChangeEvent,
  MouseEventHandler,
} from "react";

// Type definition for a breed object
interface Breed {
  id: string;
  name: string;
  description: string;
  life_span: string;
  child_friendly: number;
  vocalisation: number;
}

// Type definition for the Cat API image response
interface CatImageResponse {
  url: string;
}

function CatBreedExplorer() {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [selectedBreedId, setSelectedBreedId] = useState<string>("");
  const [breedImages, setBreedImages] = useState<{ [key: string]: string }>({});

  // Fetch breeds from The Cat API
  useEffect(() => {
    async function fetchBreeds() {
      const response = await fetch("https://api.thecatapi.com/v1/breeds");
      const data: Breed[] = await response.json();
      setBreeds(data);

      // Fetch images for all breeds
      const imagePromises = data.map((breed) =>
        fetch(
          `https://api.thecatapi.com/v1/images/search?breed_ids=${breed.id}`
        )
          .then((res) => res.json())
          .then((imageData) => {
            // Set the image for each breed in the state
            setBreedImages((prevImages) => ({
              ...prevImages,
              [breed.id]:
                imageData[0]?.url ||
                "https://media.istockphoto.com/id/1300144006/vector/black-cat-silhouette-on-white-background.jpg?s=612x612&w=0&k=20&c=VW6-p5P-KfRkvXTK_Hax_SnbuLpwLHfGok9kxyjfbQw=", // Store the image URL
            }));
          })
      );

      await Promise.all(imagePromises); // Wait for all images to be fetched
    }
    fetchBreeds();
  }, []);

  // Handle breed selection change
  const handleBreedChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedBreedId(e.target.value);
  };

  return (
    <div className="container">
      {/* Dropdown to select breed */}
      <select onChange={handleBreedChange} value={selectedBreedId}>
        <option value="">Select a breed</option>
        {breeds.map((breed) => (
          <option key={breed.id} value={breed.id}>
            {breed.name}
          </option>
        ))}
      </select>

      {/* Display breed cards */}
      <div className="cardWrapper">
        {breeds
          .filter((breed) => !selectedBreedId || breed.id === selectedBreedId) // Show all or filtered by selection
          .map((breed) => (
            <div className="card">
              <div key={breed.id}>
                {breedImages[breed.id] && (
                  <img src={breedImages[breed.id]} alt={`${breed.name}`} />
                )}
                <div className="info">
                  <h1>{breed.name}</h1>
                  <div className="tinyInfo">
                    <div>
                      <p>
                        <strong>Life Span:</strong>
                      </p>
                      <p>{breed.life_span} </p>
                    </div>
                    <div>
                      <p>
                        <strong>Child Friendly:</strong>
                      </p>
                      <p>{breed.child_friendly}/5</p>
                    </div>
                    <div>
                      <p>
                        <strong>Vocalisation:</strong>
                      </p>
                      <p>{breed.vocalisation}/5</p>
                    </div>
                  </div>
                  <p>{breed.description}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CatBreedExplorer;
