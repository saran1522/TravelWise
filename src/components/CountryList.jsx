import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { useCities } from "../contexts/CitiesContext";

export default function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  if (!cities.length) return <Message message="👋 start adding cities" />;

  const countries = cities.reduce((acc, city) => {
    if (!acc.includes(city)) acc.push(city);
    return acc;
  }, []);

  return (
    <div className={styles.cityList}>
      {countries.map((country, i) => {
        return <CountryItem country={country} key={i} />;
      })}
    </div>
  );
}
