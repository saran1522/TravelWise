import { useParams, useSearchParams } from "react-router-dom";
import styles from "./City.module.css";
import { useEffect } from "react";
import { useCities } from "../contexts/CitiesContext";
// import Button from "./Button";
import Spinner from "./Spinner";
import BackButton from "./BackButton";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  // const [serachParams, setSearchParams] = useSearchParams();
  // const lat = serachParams.get("lat");
  // const lng = serachParams.get("lng");
  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useCities();

  useEffect(() => {
    getCity(id);
  }, [id]);

  console.log("rendering");
  return isLoading ? (
    <Spinner />
  ) : (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>{currentCity.cityName}</h6>
        <h3>
          <span>{currentCity.emoji}</span>
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {currentCity.cityName} on</h6>
        <p>{formatDate(currentCity.date || null)}</p>
      </div>

      {currentCity.notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{currentCity.notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${currentCity.cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {currentCity.cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
