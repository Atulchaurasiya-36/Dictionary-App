import { useState } from "react";

const Search = () => {
  const [search, setSearch] = useState("");
  const [displayData, setDisplayData] = useState(null);

  const handleInput = (event) => {
    setSearch(event.target.value);
  };

  const myFun = async () => {
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${search}`);
      const data = await response.json();

      if (Array.isArray(data)) {
        setDisplayData(data[0]); // Store the first result
      } else {
        setDisplayData(null);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setDisplayData(null);
    }
  };

  return (
    <div>
      <div className="app">
        <h1>Dictionary App</h1>
        <div className="container">
          <div className="searchBar">
            <input type="text" placeholder="Search words" onChange={handleInput} />
            <button onClick={myFun}>Search</button>
          </div>
          <div className="datas">
            {displayData ? (
              <div className="data">
                <h2>Word: {displayData.word}</h2>
                <p>Part Of Speech: {displayData.meanings[0]?.partOfSpeech}</p>
                <p>Definition: {displayData.meanings[0]?.definitions[0]?.definition}</p>
                <p>Synonyms: {displayData.meanings[0].synonyms[0]}</p>
                <p>Example: {displayData.meanings[0].definitions[0].example}</p>
               <button className="last" onClick={()=>window.open(displayData.sourceUrls[0],"_blank")}>Read More</button> 
              </div>
            ) : (
              <p>No data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
