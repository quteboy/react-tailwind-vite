import { useEffect, useState } from "react";
import "./App.css";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());
function App() {
  const [addressData, setAddressData] = useState([]);
  const { data, error, isLoading } = useSWR(
    "https://fakerapi.it/api/v1/addresses?_quantity=100&_locale=en_US",
    fetcher
  );
  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";
  console.log("data", data.data);
  useEffect(() => {
    setAddressData(data.data);
  }, []);
  return (
    <>
      <div className="flex flex-row flex-wrap px-3 py-1 items-center justify-between gap-3 gap-y-1.5">
        {addressData.map((curEl) => {
          return (
            <div
              key={curEl.id}
              className="px-2 py-1 w-2/12 h-1/3 bg-slate-500 hover:bg-slate-300 shadow-xl rounded-lg hover:scale-125"
            >
              <div className="text-base antialiased text-clip text-slate-950">{curEl.street}</div>
              <div className="text-sm antialiased  text-slate-900">{curEl.streetName}</div>
              <div className="text-sm antialiased  text-slate-900">{curEl.buildingNumber}</div>
              <div className="text-sm antialiased  text-slate-900">{curEl.city}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
