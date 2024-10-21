import { useMemo, useState } from "react";
import cities from "../../utils/cities-list";
import { Input } from "../ui/input";

const LocationInput = ({ onLocationSelected, ...props }) => {
  const [locationSearchInput, setLocationSearchInput] = useState("");
  const [hasFocus, setHasFocus] = useState(false);

  // Şehirleri filtreleme ve arama algoritması
  const citiesList = useMemo(() => {
    if (!locationSearchInput.trim()) return [];

    const searchWords = locationSearchInput.split(" ");
    return cities
      .map((city) => `${city.name}, ${city.subcountry}, ${city.country}`)
      .filter((city) =>
        searchWords.every((word) =>
          city.toLowerCase().includes(word.toLowerCase())
        )
      )
      .slice(0, 5);
  }, [locationSearchInput]);

  const handleCitySelect = (city) => {
    onLocationSelected(city);
    setLocationSearchInput("");
  };

  return (
    <div className="">
      <Input
        value={locationSearchInput}
        onChange={(e) => setLocationSearchInput(e.target.value)}
        placeholder="Şehir arayın..."
        onFocus={() => setHasFocus(true)}
        onBlur={() => {
          if (!locationSearchInput.trim()) {
            setHasFocus(false);
          }
        }}
        {...props}
      />
      {hasFocus && locationSearchInput.trim() && (
        <div className="absolute z-20 divide-y bg-background shadow-xl border-x border-b rounded-b-lg">
          {!citiesList.length && <p className="p-3">Bilgi bulunamadı</p>}
          {citiesList.map((city) => (
            <button
              onMouseDown={(e) => {
                e.preventDefault();
                handleCitySelect(city); // Şehri seçme fonksiyonu
              }}
              className="block w-full text-start p-2"
              key={city}
            >
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationInput;
