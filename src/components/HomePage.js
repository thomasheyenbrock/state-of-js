import React from "react";

import Axis from "./Axis";
import Element from "./Element";
import Filter from "./Filter";
import processedData from "../data/processedData.json";

const elementsWithAdditionalInformation = Promise.all(
  processedData.elements.map(async element => {
    if (!element.repo) {
      return element;
    }

    try {
      const repoId = element.repo.replace("https://github.com/", "");
      const response = await fetch(
        `https://api.github.com/repos/${repoId}?client_id=18b1af213b66674854b1&client_secret=5fab570119af1edcbbff934c7efc17dcab456c0c`
      );
      const data = await response.json();

      return { ...element, stars: data.stargazers_count };
    } catch (err) {
      return element;
    }
  })
);

const Spinner = () => <span>loading...</span>;

const HomePage = () => {
  const [elements, setElements] = React.useState([]);
  const [metric, setMetric] = React.useState("none");
  const [numbers, setNumbers] = React.useState("counts");
  const [sortBy, setSortBy] = React.useState("category");
  const [view, setView] = React.useState("initial");

  const hooks = {
    metric,
    setMetric,
    numbers,
    setNumbers,
    view,
    setView,
    sortBy,
    setSortBy
  };

  React.useEffect(() => {
    elementsWithAdditionalInformation.then(setElements);
    return null;
  }, []);

  return (
    <>
      {elements.length === 0 ? (
        <Spinner />
      ) : (
        elements.map(element => (
          <Element key={element.name} {...element} {...hooks} />
        ))
      )}
      <Axis metric={metric} numbers={numbers} view={view} />
      <Filter {...hooks} />
    </>
  );
};

export default HomePage;
