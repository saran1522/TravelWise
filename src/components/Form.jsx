// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import { useCities } from "../contexts/CitiesContext";
import "react-datepicker/dist/react-datepicker.css";

// function convertToEmoji(countryCode) {
//   const codePoints = countryCode
//     .toUpperCase()
//     .split("")
//     .map((char) => 127397 + char.charCodeAt());
//   return String.fromCodePoint(...codePoints);
// }

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [lat, lng] = useUrlPosition();
  const { isLoading, createCity } = useCities();
  const navigate = useNavigate();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeolocation, setIsLoadingGeolocation] = useState(false);
  const [errorGeolocation, setErrorGeolocation] = useState("");
  const [emoji, setEmoji] = useState("");

  const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
  // const BASE_URL = "";
  useEffect(() => {
    async function fetchCity() {
      if (!lat && !lng) return;
      try {
        setIsLoadingGeolocation(true);
        setErrorGeolocation("");
        const response = await fetch(
          `${BASE_URL}?latitude=${lat}&longitude=${lng}&localityLanguage=en`
        );
        const data = await response.json();
        console.log(data);
        if (!data.countryCode) {
          throw new Error(
            "Looks like you are in the middle of the ocean! try clicking somewhere else."
          );
        }
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        setErrorGeolocation(err.message);
      } finally {
        setIsLoadingGeolocation(false);
      }
    }
    fetchCity();
  }, [lat, lng]);

  async function handleSubmit(e) {
    if (!lat && !lng) return;
    e.preventDefault();
    const city = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    // creating a post request to cities object (adding this new city to database)
    await createCity(city);
    navigate("/app/cities");
  }

  console.log("rendering");

  if (isLoadingGeolocation) return <Spinner></Spinner>;

  if (errorGeolocation) return <Message message={errorGeolocation}></Message>;
  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}</label>
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat={"dd/MM/yyyy"}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;

// ("this endpoint does not support server-side operations. use '/data/reverse-geocode' endpoint instead. your ip address 42.105.17.121 is now banned. to lift the ban email support@bigdatacloud.com");
