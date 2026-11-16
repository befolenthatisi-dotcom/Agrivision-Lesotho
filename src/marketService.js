import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

export async function getVerifiedMarketPrices() {
  const pricesQuery = query(
    collection(db, "marketPrices"),
    where("isSample", "==", false)
  );

  const snapshot = await getDocs(pricesQuery);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
}