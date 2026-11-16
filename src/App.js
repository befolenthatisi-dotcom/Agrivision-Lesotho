import AuthScreen from "./AuthScreen";
import { listenToAuthChanges, logoutUser } from "./authService";
import { getWeatherForecast } from "./weatherService";
import { getVerifiedMarketPrices } from "./marketService";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import "./App.css";

const LanguageContext = createContext("en");

const sesotho = {
  "Overview": "Kakaretso",
  "Weather": "Boemo ba leholimo",
  "Market prices": "Litheko tsa mmaraka",
  "Learning hub": "Setsi sa thuto",
  "Success stories": "Lipale tsa katleho",
  "YOUR SPACE": "SEBAKA SA HAO",
  "Growing starts here.": "Kholo e qala mona.",
  "Small steps today can grow into something amazing.": "Mehato e menyenyane ea kajeno e ka tlisa kholo e kholo.",
  "Explore the learning hub": "Etela setsi sa thuto",
  "Made for growers in Lesotho": "E etselitsoe balemi ba Lesotho",
  "Home": "Lehae",
  "Choose location": "Khetha sebaka",
  "Choose language": "Khetha puo",
  "English": "Senyesemane",
  "Example only": "Mohlala feela",
  "Today": "Kajeno",
  "Wed": "Laboraro",
  "Thu": "Labone",
  "Fri": "Labohlano",
  "Sat": "Moqebelo",
  "Light showers": "Pula e fokolang",
  "Mostly sunny": "Letsatsi le chabile haholo",
  "Sunny": "Letsatsi le chabile",
  "Possible showers": "Pula e ka na",
  "January": "Pherekhong",
  "February": "Hlakola",
  "March": "Hlakubele",
  "April": "Mmesa",
  "May": "Mots’eanong",
  "June": "Phuptjane",
  "July": "Phupu",
  "August": "Phato",
  "September": "Loetse",
  "October": "Mphalane",
  "November": "Pulungoana",
  "December": "Tšitoe",
  "DEMO": "MOHLALA",
  "Community group": "Sehlopha sa sechaba",
  "Leribe · Young producer": "Leribe · Moetsi e mocha",
  "Berea · Community group": "Berea · Sehlopha sa sechaba",
  "Starting small with leafy greens helped me learn what grows best in my community.": "Ho qala ka meroho e menyenyane ho nthusitse ho ithuta hore na ke eng e melang hantle sechabeng sa heso.",
  "Sharing skills and working together gave our garden a stronger start.": "Ho arolelana tsebo le ho sebetsa hammoho ho thusitse serapa sa rona ho qala hantle.",
  "Save": "Boloka",
  "Unsave": "Tlosa polokelong",
  "Notifications": "Litsebiso",
  "Sesotho": "Sesotho",
  "You’re all caught up": "Ha ho tsebiso e ncha",
  "Weather alerts and community updates will appear here.": "Litemoso tsa boemo ba leholimo le litaba tsa sechaba li tla hlaha mona.",
  "Notification preferences": "Likhetho tsa litsebiso",
  "Notification preferences are coming soon": "Likhetho tsa litsebiso li tla fumaneha haufinyane",
  "PREVIEW AS": "SHEBA JOALO KA",
  "Producer · Demo": "Mohlahisi · Mohlala",
  "DEMO ACCOUNT": "AKHAONTO EA MOHLALA",
  "Authentication is not connected": "Netefatso ea akhaonto ha e so hokeloe",
  "Account registration, login and role permissions will be enabled after a secure backend is configured. This demo account has no administrator access.": "Ngoliso ea akhaonto, ho kena le litumello tsa mesebetsi li tla buloa ha ho se ho hlophisitsoe backend e sireletsehileng. Akhaonto ena ea mohlala ha e na litumello tsa motsamaisi.",
  "Account status": "Boemo ba akhaonto",
  "Young producer": "Moetsi e mocha",
  "Community leader": "Moetapele oa sechaba",
  "Agrivision admin": "Motsamaisi oa Agrivision",
  "Previewing as": "U sheba joalo ka",
  "Growing a brighter future, together": "Re aha bokamoso bo khanyang hammoho",
  "YOUR GROWING SPACE": "SEBAKA SA HAO SA TEMO",
  "Good morning, Karabo": "Lumela hoseng, Karabo",
  "A little knowledge today goes a long way. Here’s what’s happening around you.": "Tsebo e nyenyane kajeno e ka u thusa haholo. Mona ke se etsahalang haufi le uena.",
  "Let’s grow today": "Ha re holiseng kajeno",
  "One step at a time": "Mohato ka mohato",
  "A good day to": "Ke letsatsi le letle la",
  "tend your garden.": "ho hlokomela serapa sa hao.",
  "Partly cloudy": "Maru a seng makae",
  "Feels like 21° · Light breeze": "Ho utloahala 21° · Moea o fokola",
  "See full forecast": "Sheba bolepi bo feletseng",
  "RAIN CHANCE": "MONYETLA OA PULA",
  "WIND": "MOEA",
  "HUMIDITY": "MONGOBE",
  "Illustrative demo forecast · Not live weather": "Bolepi ba mohlala feela · Ha se ba sebele",
  "A little growing tip": "Keletso e nyenyane ea temo",
  "DEMO GUIDANCE": "KELETSO EA MOHLALA",
  "With a chance of showers, check that your garden beds drain well. Adjust watering to suit local conditions.": "Ha pula e ka na, hlahloba hore metsi a tsoa hantle lirapeng. Nosetsa ho latela maemo a sebaka sa heno.",
  "Weather-based example · Confirm advice with a trusted agricultural expert.": "Mohlala o thehiloeng ho boemo ba leholimo · Netefatsa keletso ho setsebi sa temo.",
  "View weather guidance": "Sheba keletso ea boemo ba leholimo",
  "WHAT’S HAPPENING": "SE ETSAHALANG",
  "Today at a glance": "Kakaretso ea kajeno",
  "Explore market": "Sheba mmaraka",
  "Market snapshot": "Kakaretso ea mmaraka",
  "Market details": "Lintlha tsa mmaraka",
  "Vegetable prices · Sample data": "Litheko tsa meroho · Lintlha tsa mohlala",
  "Cabbage": "Khabeche",
  "Tomatoes": "Litamati",
  "Spinach": "Sepinichi",
  "per head": "ka hlooho",
  "per kg": "ka kilo",
  "per bunch": "ka ngata",
  "No change": "Ha ea fetoha",
  "Example figures for display only": "Linomoro tsa mohlala feela",
  "About these prices": "Mabapi le litheko tsena",
  "Market prices are examples and are not current quotations": "Litheko tsena ke mehlala, ha se litheko tsa hona joale",
  "A GOOD PLACE TO START": "SEBAKA SE SETLE SA HO QALA",
  "Learn as you grow": "Ithute ha u ntse u lema",
  "Practical guides to help you build confidence in your garden.": "Litataiso tse u thusang ho ba le boits'epo serapeng sa hao.",
  "3 short guides to explore": "Litataiso tse 3 tse khutšoanyane",
  "Visit learning hub": "Etela setsi sa thuto",
  "Every grower has a story.": "Molemi e mong le e mong o na le pale.",
  "Get inspired by young producers across Lesotho.": "Khothatsoa ke bahlahisi ba bacha ho pholletsa le Lesotho.",
  "Read their stories": "Bala lipale tsa bona",
  "WEATHER FOR YOUR AREA": "BOEMO BA LEHOLIMO SEBAKENG SA HENO",
  "Plan with the weather.": "Rera ho latela boemo ba leholimo.",
  "See an example forecast for your selected location and explore practical, general growing tips.": "Sheba bolepi ba mohlala ba sebaka seo u se khethileng le malebela a temo.",
  "TEMPERATURE": "MOCHESO",
  "This is illustrative demo data, not a live forecast. Connect a verified weather provider before relying on forecasts or alerts.": "Lintlha tsena ke tsa mohlala, ha se bolepi ba sebele. Hokela mohloli oa boemo ba leholimo o netefalitsoeng pele u itšetleha ka bolepi kapa litemoso.",
  "COMING UP": "MATSATSI A TLANG",
  "5-day outlook": "Bolepi ba matsatsi a 5",
  "WEATHER-BASED EXAMPLES": "MEHLALA E THEHILOENG BOEMONG BA LEHOLIMO",
  "Growing guidance": "Keletso ea temo",
  "REVIEW REQUIRED": "E TLAMEHA HO HLAJOJOA",
  "When rain is expected": "Ha pula e lebeletsoe",
  "Check that beds and containers drain well. Avoid watering if the soil is already moist.": "Hlahloba hore metsi a tsoa hantle lirapeng le lijaneng. Qoba ho nosetsa ha mobu o se o le mongobo.",
  "On warm, sunny days": "Matsatsing a chesang le a letsatsi",
  "Check plants for signs of heat stress and water thoughtfully, following local advice.": "Hlahloba hore na limela li angoa ke mocheso, ’me u nosetse ka hloko ho latela keletso ea sebakeng sa heno.",
  "These general examples are not Agrivision-approved advice. Farming recommendations should be reviewed by a qualified local agricultural adviser.": "Mehlala ena ha se keletso e amohetsoeng ke Agrivision. Keletso ea temo e lokela ho hlahlojoa ke setsebi sa temo sa sebakeng sa heno.",
  "KNOW YOUR MARKET": "TSEBA MMARAKA OA HAO",
  "Market information.": "Litaba tsa mmaraka.",
  "Sample data only — not current market prices": "Lintlha tsa mohlala feela — ha se litheko tsa hona joale",
  "Agrivision still needs to confirm participating stores, buyers, and how price information will be collected and updated.": "Agrivision e ntse e lokela ho netefatsa mabenkele le bareki ba tla nka karolo, le hore na litheko li tla bokelloa le ho ntlafatsoa joang.",
  "Example vegetable prices": "Litheko tsa mohlala tsa meroho",
  "Illustrative figures · No verified source": "Linomoro tsa mohlala · Ha ho mohloli o netefalitsoeng",
  "PRODUCE": "LIHLAHISOA",
  "UNIT": "TEKANYO",
  "EXAMPLE PRICE": "THEKO EA MOHLALA",
  "CHANGE": "PHETOHO",
  "Source: Sample values for interface demonstration. Not real quotations.": "Mohloli: Linomoro tsa mohlala bakeng sa pontšo. Ha se litheko tsa sebele.",
  "Last updated: Demo": "E qetetse ho ntlafatsoa: Mohlala",
  "Know a local market or buyer?": "Na u tseba mmaraka kapa moreki oa sebakeng sa heno?",
  "Reliable market partners and data sources need to be confirmed with Agrivision.": "Balekane ba mmaraka le mehloli ea lintlha e tšepahalang li lokela ho netefatsoa le Agrivision.",
  "LEARN AT YOUR OWN PACE": "ITHUTE KA MOKHOA OA HAO",
  "Growing knowledge.": "Tsebo ea temo.",
  "Friendly, practical learning materials to support your journey as a grower.": "Lisebelisoa tsa thuto tse bonolo le tse sebetsang ho u thusa leetong la hao la temo.",
  "YOUR LEARNING JOURNEY": "LEETO LA HAO LA THUTO",
  "Every expert was once a beginner.": "Setsebi se seng le se seng se kile sa ba moqali.",
  "Pick a topic, learn something new, and keep growing.": "Khetha sehlooho, ithute ntho e ncha, ’me u tsoele pele ho hola.",
  "START EXPLORING": "QALA HO ITHUTA",
  "Guides for your garden": "Litataiso tsa serapa sa hao",
  "SHORT, PRACTICAL GUIDES": "LITATAISO TSE KHUTSOANYANE",
  "GROWING BASICS": "MOTHEO OA TEMO",
  "SOIL HEALTH": "BOPHELO BA MOBU",
  "CLIMATE SMART": "TEMO E NAHANELANG BOEMO BA LEHOLIMO",
  "Getting started with a vegetable garden": "Ho qala serapa sa meroho",
  "Understanding your soil": "Ho utloisisa mobu oa hao",
  "Water-wise growing": "Temo e sebelisang metsi ka bohlale",
  "Mark complete": "Tšoaea e phethiloe",
  "Completed": "E phethiloe",
  "Learning guides shown here are example content for the prototype. Confirm and add Agrivision-approved materials before launch.": "Litataiso tsena ke mehlala ea pontšo. Netefatsa le ho kenya lisebelisoa tse amohetsoeng ke Agrivision pele e qala.",
  "Stories that inspire.": "Lipale tse khothatsang.",
  "Meet growers and community groups sharing their journeys across Lesotho.": "Kopana le balemi le lihlopha tsa sechaba tse arolelanang maeto a tsona Lesotho.",
  "＋ Add a story": "＋ Kenya pale",
  "Story publishing will be available when administrator tools are connected": "Ho phatlalatsa lipale ho tla fumaneha ha lisebelisoa tsa motsamaisi li hoketsoe",
  "GROWING TOGETHER": "HO LEMA HAMMOHO",
  "COMMUNITY SPOTLIGHT": "SECHABA SE HLAHISITSOENG",
  "Good things grow when we grow together.": "Re hola hantle ha re lema hammoho.",
  "Every garden begins with a seed, and every growing journey has something worth sharing.": "Serapa se seng le se seng se qala ka peo, ’me leeto le leng le le leng la temo le na le pale e lokelang ho arolelanoa.",
  "A note from the Agrivision community": "Molaetsa o tsoang sechabeng sa Agrivision",
  "FROM THE COMMUNITY": "HO TSOA SECHABENG",
  "Meet fellow growers": "Kopana le balemi ba bang",
  "EXAMPLE STORIES": "LIPALE TSA MOHLALA",
  "Read story": "Bala pale",
  "Full community stories will be available when approved content is added": "Lipale tse feletseng li tla fumaneha ha litaba tse amohetsoeng li eketsoa",
  "These are illustrative story examples, not verified Agrivision testimonials. Stories should be shared with the author’s permission and approved before publication.": "Tsena ke lipale tsa mohlala, ha se lipale tsa nnete tse netefalitsoeng ke Agrivision. Lipale li lokela ho arolelanoa ka tumello ea mongoli le ho amoheloa pele li phatlalatsoa.",
  "Removed from your saved items": "E tlositsoe linthong tseo u li bolokileng",
  "Lesson marked as complete": "Thuto e tšoailoe e phethiloe",
  "Story saved for later": "Pale e boloketsoe hamorao"
};

function useTranslate() {
  const language = useContext(LanguageContext);
  return (text) => language === "st" ? sesotho[text] || text : text;
}

const locations = [
  { name: "Teyateyaneng", district: "Berea" },
  { name: "Maseru", district: "Maseru" },
  { name: "Hlotse", district: "Leribe" },
  { name: "Maputsoe", district: "Leribe" },
  { name: "Butha-Buthe", district: "Butha-Buthe" },
  { name: "Mokhotlong", district: "Mokhotlong" },
  { name: "Thaba-Tseka", district: "Thaba-Tseka" },
  { name: "Qacha’s Nek", district: "Qacha’s Nek" },
  { name: "Quthing", district: "Quthing" },
  { name: "Mohale’s Hoek", district: "Mohale’s Hoek" },
  { name: "Semonkong", district: "Maseru" },
  { name: "Mafeteng", district: "Mafeteng" }
];

const sections = [
  { id: "overview", label: "Overview", icon: "grid" },
  { id: "weather", label: "Weather", icon: "cloud" },
  { id: "market", label: "Market prices", icon: "market" },
  { id: "learning", label: "Learning hub", icon: "book" },
  { id: "stories", label: "Success stories", icon: "heart" }
];

const lessons = [
  { title: "Getting started with a vegetable garden", category: "GROWING BASICS", time: "8 min read", icon: "🌱", color: "lesson-green" },
  { title: "Understanding your soil", category: "SOIL HEALTH", time: "6 min read", icon: "🪴", color: "lesson-yellow" },
  { title: "Water-wise growing", category: "CLIMATE SMART", time: "5 min read", icon: "💧", color: "lesson-blue" }
];

const stories = [
  { name: "M’e ’Mapuleng’s garden", place: "Leribe · Young producer", quote: "Starting small with leafy greens helped me learn what grows best in my community.", initials: "M", color: "avatar-peach" },
  { name: "Growing together in Berea", place: "Berea · Community group", quote: "Sharing skills and working together gave our garden a stronger start.", initials: "B", color: "avatar-green" }
];

function weatherDescription(code) {
  if (code === 0) return "Clear sky";
  if (code === 1) return "Mainly clear";
  if (code === 2) return "Partly cloudy";
  if (code === 3) return "Overcast";
  if ([45, 48].includes(code)) return "Fog";
  if ([51, 53, 55, 56, 57].includes(code)) return "Drizzle";
  if ([61, 63, 65, 66, 67].includes(code)) return "Rain";
  if ([71, 73, 75, 77].includes(code)) return "Snow";
  if ([80, 81, 82].includes(code)) return "Rain showers";
  if ([85, 86].includes(code)) return "Snow showers";
  if ([95, 96, 99].includes(code)) return "Thunderstorm";
  return "Weather conditions unavailable";
}

function weatherIcon(code) {
  if (code === 0) return "☀️";
  if ([1, 2].includes(code)) return "🌤️";
  if (code === 3) return "☁️";
  if ([45, 48].includes(code)) return "🌫️";
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67].includes(code)) return "🌧️";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "❄️";
  if ([80, 81, 82].includes(code)) return "🌦️";
  if ([95, 96, 99].includes(code)) return "⛈️";
  return "🌤️";
}

function Icon({ name, size = 20 }) {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
    cloud: <path d="M20 16.2A4.8 4.8 0 0 0 18.5 7a6.5 6.5 0 0 0-12.4 1.8A4.2 4.2 0 0 0 7 17h12" />,
    market: <><path d="M3 9h18l-1.6-5H4.6L3 9Z" /><path d="M5 9v11h14V9M9 20v-6h6v6" /><path d="M3 9a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0" /></>,
    book: <><path d="M12 7v14" /><path d="M3 18V5a1 1 0 0 1 1-1h4a4 4 0 0 1 4 4 4 4 0 0 1 4-4h4a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-5a3 3 0 0 0-3 2 3 3 0 0 0-3-2H4a1 1 0 0 1-1-1Z" /></>,
    heart: <path d="M20.8 8.6c0 4.5-8.8 10-8.8 10s-8.8-5.5-8.8-10a4.6 4.6 0 0 1 8.8-1.8 4.6 4.6 0 0 1 8.8 1.8Z" />,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    chevron: <path d="m7 10 5 5 5-5" />,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    arrow: <><path d="M7 17 17 7M7 7h10v10" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></>
  };

  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}


function App() {
  // ALL STATE DECLARATIONS
  const [activeSection, setActiveSection] = useState("overview");
  const [selectedLocation, setSelectedLocation] = useState("Teyateyaneng");
  const [language, setLanguage] = useState(
    () => localStorage.getItem("agrivision-language") || "en"
  );
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [savedStories, setSavedStories] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [liveMarketItems, setLiveMarketItems] = useState([]);
  const [marketLoading, setMarketLoading] = useState(true);
  const [marketError, setMarketError] = useState("");

  const [weatherData, setWeatherData] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState("");

  const [authUser, setAuthUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [toast, setToast] = useState("");

  // MEMOIZED LOCATION
  const location = useMemo(
    () => locations.find((item) => item.name === selectedLocation) || locations[0],
    [selectedLocation]
  );

  const t = (text) => language === "st" ? sesotho[text] || text : text;

  // FIREBASE AUTHENTICATION LISTENER
  useEffect(() => {
    const unsubscribe = listenToAuthChanges((user) => {
      setAuthUser(user);
      setAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  // LOAD MARKET PRICES
  useEffect(() => {
    async function loadMarketPrices() {
      try {
        setMarketLoading(true);
        const prices = await getVerifiedMarketPrices();
        setLiveMarketItems(prices);
        setMarketError("");
      } catch (error) {
        console.error("Market prices error:", error);
        setMarketError("Could not load market prices. Please try again later.");
      } finally {
        setMarketLoading(false);
      }
    }

    loadMarketPrices();
  }, []);

  // LOAD WEATHER
  useEffect(() => {
    let cancelled = false;

    async function loadWeather() {
      try {
        setWeatherLoading(true);
        setWeatherError("");

        const data = await getWeatherForecast(location.name);

        if (!cancelled) {
          setWeatherData(data);
        }
      } catch (error) {
        console.error("Weather error:", error);

        if (!cancelled) {
          setWeatherError(
            "Unable to load live weather. Check your internet connection and try again."
          );
          setWeatherData(null);
        }
      } finally {
        if (!cancelled) {
          setWeatherLoading(false);
        }
      }
    }

    loadWeather();

    return () => {
      cancelled = true;
    };
  }, [location.name]);

  // SAVE LANGUAGE
  useEffect(() => {
    localStorage.setItem("agrivision-language", language);
    document.documentElement.lang = language === "st" ? "st" : "en";
  }, [language]);

  // NOTIFICATIONS
  const notify = (message) => {
    setToast(t(message));
    window.setTimeout(() => setToast(""), 2600);
  };

  // NAVIGATION
  const goTo = (section) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
    setShowNotifications(false);
    setShowProfile(false);
  };

  // SAVE AND COMPLETE ITEMS
  const toggleItem = (items, setItems, item, message) => {
    const alreadySaved = items.includes(item);

    setItems(
      alreadySaved
        ? items.filter((value) => value !== item)
        : [...items, item]
    );

    notify(alreadySaved ? "Removed from your saved items" : message);
  };

  // AUTHENTICATION CHECKS
  if (authLoading) {
    return (
      <div className="auth-loading">
        Loading your Agrivision account...
      </div>
    );
  }

  if (!authUser) {
    return <AuthScreen />;
  }

  // PAGE TITLE
  const pageTitle = t(
    sections.find((section) => section.id === activeSection)?.label || "Overview"
  );




  return (
    <LanguageContext.Provider value={language}>
      <div className="app-shell">
        {mobileMenuOpen && (
          <button className="mobile-backdrop" aria-label="Close menu" onClick={() => setMobileMenuOpen(false)} />
        )}

        <aside className={`sidebar ${mobileMenuOpen ? "sidebar-open" : ""}`}>
          <a className="brand" href="#overview" onClick={(event) => { event.preventDefault(); goTo("overview"); }}>
            <span className="brand-mark"><span /><span /><span /></span>
            <span className="brand-name">agrivision<span>LESOTHO</span></span>
          </a>

          <div className="sidebar-label">{t("YOUR SPACE")}</div>

          <nav className="side-nav" aria-label="Main navigation">
            {sections.map((section) => (
              <button key={section.id} className={`nav-link ${activeSection === section.id ? "nav-active" : ""}`} onClick={() => goTo(section.id)}>
                <Icon name={section.icon} size={19} />
                <span>{t(section.label)}</span>
                {section.id === "weather" && <span className="nav-dot" />}
              </button>
            ))}
          </nav>

          <div className="sidebar-spacer" />

          <div className="sidebar-tip">
            <div className="tip-icon"><Icon name="sun" size={18} /></div>
            <strong>{t("Growing starts here.")}</strong>
            <p>{t("Small steps today can grow into something amazing.")}</p>
            <button onClick={() => goTo("learning")}>{t("Explore the learning hub")} <span>→</span></button>
          </div>

          <div className="sidebar-foot"><span className="online-dot" /> {t("Made for growers in Lesotho")}</div>
        </aside>

        <main className="main-area">
          <header className="topbar">
            <button className="mobile-menu-button icon-button" aria-label="Open menu" onClick={() => setMobileMenuOpen(true)}>
              <Icon name="menu" />
            </button>

            <div className="breadcrumb">
              <span>{t("Home")}</span>
              <span className="breadcrumb-slash">/</span>
              <strong>{pageTitle}</strong>
            </div>

            <div className="topbar-actions">
              <label className="language-select">
                <span className="language-globe" aria-hidden="true">文</span>
                <select aria-label={t("Choose language")} value={language} onChange={(event) => setLanguage(event.target.value)}>
                  <option value="en">English</option>
                  <option value="st">Sesotho</option>
                </select>
                <Icon name="chevron" size={14} />
              </label>

              <label className="location-select">
                <Icon name="pin" size={17} />
                <select aria-label={t("Choose location")} value={selectedLocation} onChange={(event) => setSelectedLocation(event.target.value)}>
                  {locations.map((item) => <option key={item.name} value={item.name}>{item.name}</option>)}
                </select>
                <Icon name="chevron" size={15} />
              </label>

              <div className="popover-wrap">
                <button className={`icon-button notification-button ${showNotifications ? "button-selected" : ""}`} aria-label={t("Notifications")} onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}>
                  <Icon name="bell" size={19} />
                  <span className="notification-dot" />
                </button>

                {showNotifications && (
                  <div className="popover notification-popover">
                    <strong>{t("You’re all caught up")}</strong>
                    <p>{t("Weather alerts and community updates will appear here.")}</p>
                    <button className="text-button" onClick={() => { setShowNotifications(false); notify("Notification preferences are coming soon"); }}>
                      {t("Notification preferences")}
                    </button>
                  </div>
                )}
              </div>

              <div className="popover-wrap profile-wrap">
  <button
    className="profile-button"
    onClick={() => {
      setShowProfile(!showProfile);
      setShowNotifications(false);
    }}
    aria-expanded={showProfile}
  >
    <span className="profile-avatar">
      {(authUser.email || authUser.phoneNumber || "U")
        .charAt(0)
        .toUpperCase()}
    </span>

    <span className="profile-copy">
      <strong>
        {authUser.displayName ||
          authUser.email ||
          authUser.phoneNumber ||
          "Agrivision user"}
      </strong>
      <small>Signed in</small>
    </span>

    <Icon name="chevron" size={15} />
  </button>

  {showProfile && (
    <div className="popover profile-popover">
      <span className="popover-label">YOUR ACCOUNT</span>

      <strong className="account-status-title">
        {authUser.email || authUser.phoneNumber}
      </strong>

      <button
        className="text-button"
        onClick={async () => {
          try {
            await logoutUser();
            setShowProfile(false);
          } catch (error) {
            console.error("Sign out error:", error);
            notify("Could not sign out. Please try again.");
          }
        }}
      >
        Sign out
      </button>
    </div>
  )}
</div>
            </div>
          </header>

          <div className="content-wrap">
            {activeSection === "overview" && (
              <Overview
                location={location}
                onNavigate={goTo}
                marketItems={liveMarketItems}
                marketLoading={marketLoading}
                marketError={marketError}
                weatherData={weatherData}
                weatherLoading={weatherLoading}
                weatherError={weatherError}
              />
            )}

            {activeSection === "weather" && (
              <WeatherPage
                location={location}
                weatherData={weatherData}
                weatherLoading={weatherLoading}
                weatherError={weatherError}
              />
            )}

            {activeSection === "market" && (
              <MarketPage
                marketItems={liveMarketItems}
                marketLoading={marketLoading}
                marketError={marketError}
              />
            )}

            {activeSection === "learning" && (
              <LearningPage
                completed={completedLessons}
                onToggle={(title) => toggleItem(completedLessons, setCompletedLessons, title, "Lesson marked as complete")}
              />
            )}

            {activeSection === "stories" && (
              <StoriesPage
                saved={savedStories}
                onToggle={(name) => toggleItem(savedStories, setSavedStories, name, "Story saved for later")}
                onNotify={notify}
              />
            )}

            <footer className="page-footer">
              <span>© 2025 Agrivision Lesotho</span>
              <span>{t("Growing a brighter future, together")} <span className="footer-heart">♥</span></span>
            </footer>
          </div>
        </main>

        {toast && (
          <div className="toast" role="status">
            <span className="toast-check"><Icon name="check" size={15} /></span>
            {toast}
          </div>
        )}
      </div>
    </LanguageContext.Provider>
  );
}

function Eyebrow({ children }) {
  return <div className="eyebrow"><span />{children}</div>;
}

function Overview({
  location,
  onNavigate,
  marketItems,
  marketLoading,
  marketError,
  weatherData,
  weatherLoading,
  weatherError
}) {
  const t = useTranslate();
  const current = weatherData?.current;
  const daily = weatherData?.daily;
  const todayCode = current?.weather_code;

  return (
    <>
      <section className="welcome-row">
        <div>
          <Eyebrow>{t("YOUR GROWING SPACE")}</Eyebrow>
          <h1>{t("Good morning, Karabo")} <span className="wave">✳</span></h1>
          <p className="welcome-subtitle">{t("A little knowledge today goes a long way. Here’s what’s happening around you.")}</p>
        </div>

        <div className="welcome-date">
          <span className="date-icon"><Icon name="sun" size={18} /></span>
          <span><strong>{t("Let’s grow today")}</strong><small>{t("One step at a time")}</small></span>
        </div>
      </section>

      <section className="hero-weather">
        <div className="hero-copy">
          <div className="hero-location">
            <Icon name="pin" size={15} />
            {location.name}, {location.district}
          </div>

          <h2>
            {weatherLoading ? "Loading weather..." : weatherError ? "Weather unavailable" : "A good day to"}
            {!weatherLoading && !weatherError && <><br />{t("tend your garden.")}</>}
          </h2>

          <div className="hero-temp">
            <span>{current ? `${Math.round(current.temperature_2m)}°` : "--"}</span>
            <div>
              <strong>{current ? weatherDescription(todayCode) : weatherLoading ? "Loading..." : "Unavailable"}</strong>
              <small>{current ? `Feels like ${Math.round(current.apparent_temperature)}°` : weatherError || "Live weather forecast"}</small>
            </div>
          </div>

          <button className="hero-link" onClick={() => onNavigate("weather")}>
            {t("See full forecast")} <span>→</span>
          </button>
        </div>

        <div className="hero-sun" aria-hidden="true">
          <div className="sun-halo" />
          <span>{current ? weatherIcon(todayCode) : "🌤️"}</span>
          <i className="cloud cloud-one" />
          <i className="cloud cloud-two" />
        </div>

        <div className="hero-summary">
          <div>
            <span>{t("RAIN CHANCE")}</span>
            <strong>{daily?.precipitation_probability_max?.[0] ?? "--"}%</strong>
          </div>
          <div>
            <span>{t("WIND")}</span>
            <strong>{current ? `${Math.round(current.wind_speed_10m)} km/h` : "--"}</strong>
          </div>
          <div>
            <span>{t("HUMIDITY")}</span>
            <strong>{current ? `${current.relative_humidity_2m}%` : "--"}</strong>
          </div>
        </div>

        <div className="sample-note">
          {weatherError || (weatherLoading ? "Retrieving weather forecast..." : "Live weather data provided by Open-Meteo")}
        </div>
      </section>

      <section className="recommendation-card">
        <div className="recommendation-icon"><span>✦</span></div>
        <div className="recommendation-copy">
          <div className="recommendation-heading">{t("A little growing tip")} <span className="review-tag">{t("DEMO GUIDANCE")}</span></div>
          <p>{t("With a chance of showers, check that your garden beds drain well. Adjust watering to suit local conditions.")}</p>
          <small>{t("Weather-based example · Confirm advice with a trusted agricultural expert.")}</small>
        </div>
        <button className="round-arrow" aria-label={t("View weather guidance")} onClick={() => onNavigate("weather")}>
          <Icon name="arrow" size={17} />
        </button>
      </section>

      <section className="section-block market-block">
        <div className="section-heading">
          <div><Eyebrow>{t("WHAT’S HAPPENING")}</Eyebrow><h2>{t("Today at a glance")}</h2></div>
          <button className="view-all" onClick={() => onNavigate("market")}>{t("Explore market")} <span>→</span></button>
        </div>

        <div className="dashboard-grid">
          <div className="market-card">
            <h3>Latest Market Prices</h3>

            {marketLoading ? (
              <p>Loading market prices...</p>
            ) : marketError ? (
              <p>{marketError}</p>
            ) : marketItems.length === 0 ? (
              <p>No verified market prices available yet.</p>
            ) : (
              marketItems.slice(0, 3).map((item) => (
                <div className="market-item" key={item.id}>
                  <div>
                    <strong>{item.vegetable}</strong>
                    <p>{item.district} · {item.marketName}</p>
                  </div>
                  <div>
                    <strong>{item.currency || "M"} {item.price}</strong>
                    <p>{item.unit}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="quick-card">
            <div className="quick-top">
              <span className="quick-badge">{t("A GOOD PLACE TO START")}</span>
              <span className="quick-emoji">🌿</span>
            </div>
            <h3>{t("Learn as you grow")}</h3>
            <p>{t("Practical guides to help you build confidence in your garden.")}</p>
            <div className="quick-progress"><span><i /></span><small>{t("3 short guides to explore")}</small></div>
            <button className="quick-link" onClick={() => onNavigate("learning")}>{t("Visit learning hub")} <span>→</span></button>
          </div>
        </div>
      </section>

      <section className="story-strip">
        <div className="story-strip-copy">
          <span className="story-icon">♡</span>
          <div><strong>{t("Every grower has a story.")}</strong><p>{t("Get inspired by young producers across Lesotho.")}</p></div>
        </div>
        <button className="view-all" onClick={() => onNavigate("stories")}>{t("Read their stories")} <span>→</span></button>
      </section>
    </>
  );
}

function WeatherPage({ location, weatherData, weatherLoading, weatherError }) {
  const t = useTranslate();
  const current = weatherData?.current;
  const daily = weatherData?.daily;

  const today = new Date();
  const dateLabel = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long"
  }).format(today);

  return (
    <>
      <section className="page-intro">
        <Eyebrow>{t("WEATHER FOR YOUR AREA")}</Eyebrow>
        <h1>{t("Plan with the weather.")}</h1>
        <p>Get current weather conditions and forecasts for your selected location.</p>
      </section>

      <section className="weather-detail-card">
        {weatherLoading ? (
          <p>Loading live weather forecast...</p>
        ) : weatherError ? (
          <p role="alert">{weatherError}</p>
        ) : current && daily ? (
          <>
            <div className="weather-detail-top">
              <div>
                <div className="hero-location">
                  <Icon name="pin" size={15} />
                  {location.name}, {location.district}, Lesotho
                </div>
                <h2>{weatherDescription(current.weather_code)}</h2>
                <p>{dateLabel} · Live forecast</p>
              </div>
              <span className="weather-big-icon">{weatherIcon(current.weather_code)}</span>
            </div>

            <div className="weather-stats">
              <div>
                <span>{t("TEMPERATURE")}</span>
                <strong>{Math.round(current.temperature_2m)}° <small> / {Math.round(daily.temperature_2m_min[0])}°</small></strong>
              </div>
              <div>
                <span>{t("RAIN CHANCE")}</span>
                <strong>{daily.precipitation_probability_max?.[0] ?? "--"}%</strong>
              </div>
              <div>
                <span>{t("WIND")}</span>
                <strong>{Math.round(current.wind_speed_10m)} <small>km/h</small></strong>
              </div>
              <div>
                <span>{t("HUMIDITY")}</span>
                <strong>{current.relative_humidity_2m}%</strong>
              </div>
            </div>

            <div className="sample-banner">
              <span>ⓘ</span>
              Weather data provided by Open-Meteo. Forecasts can change. Check local conditions before making farming decisions.
            </div>
          </>
        ) : (
          <p>Weather information is currently unavailable.</p>
        )}
      </section>

      <section className="section-block forecast-block">
        <div className="section-heading">
          <div><Eyebrow>{t("COMING UP")}</Eyebrow><h2>7-day outlook</h2></div>
        </div>

        {daily && !weatherLoading && !weatherError && (
          <div className="forecast-grid">
            {daily.time.map((date, index) => (
              <div className="forecast-day" key={date}>
                <span className="forecast-name">
                  {new Intl.DateTimeFormat("en-GB", {
                    weekday: "short",
                    day: "numeric"
                  }).format(new Date(`${date}T12:00:00`))}
                </span>
                <span className="forecast-emoji">{weatherIcon(daily.weather_code[index])}</span>
                <strong>
                  {Math.round(daily.temperature_2m_max[index])}°
                  <small> / {Math.round(daily.temperature_2m_min[index])}°</small>
                </strong>
                <span className="forecast-detail">{weatherDescription(daily.weather_code[index])}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="section-block guidance-block">
        <div className="section-heading">
          <div><Eyebrow>{t("WEATHER-BASED EXAMPLES")}</Eyebrow><h2>{t("Growing guidance")}</h2></div>
          <span className="review-tag">{t("REVIEW REQUIRED")}</span>
        </div>

        <div className="guidance-grid">
          <article className="guidance-card">
            <span className="guidance-symbol blue-symbol">☂</span>
            <div>
              <h3>{t("When rain is expected")}</h3>
              <p>{t("Check that beds and containers drain well. Avoid watering if the soil is already moist.")}</p>
            </div>
          </article>
          <article className="guidance-card">
            <span className="guidance-symbol green-symbol">✿</span>
            <div>
              <h3>{t("On warm, sunny days")}</h3>
              <p>{t("Check plants for signs of heat stress and water thoughtfully, following local advice.")}</p>
            </div>
          </article>
        </div>

        <p className="disclaimer">
          {t("These general examples are not Agrivision-approved advice. Farming recommendations should be reviewed by a qualified local agricultural adviser.")}
        </p>
      </section>
    </>
  );
}

function MarketPage({ marketItems, marketLoading, marketError }) {
  const t = useTranslate();

  const formatDate = (date) => {
    if (!date) return "Date not recorded";
    const value = date?.toDate ? date.toDate() : new Date(date);

    if (Number.isNaN(value.getTime())) return "Date not recorded";

    return value.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  return (
    <>
      <section className="page-intro">
        <Eyebrow>{t("KNOW YOUR MARKET")}</Eyebrow>
        <h1>{t("Market information.")}</h1>
        <p>
          Compare verified vegetable price records where available.
          Prices should include a reliable local source before guiding
          selling decisions.
        </p>
      </section>

      <section className="market-notice">
        <span>ⓘ</span>
        <div>
          <strong>Verified market records only</strong>
          <p>
            Sample records are excluded. Always check the market,
            recording date and source before making selling decisions.
          </p>
        </div>
      </section>

      <section className="market-table-card">
        <div className="card-title-row">
          <div>
            <h3>Vegetable market prices</h3>
            <p>Prices retrieved from the Agrivision database</p>
          </div>
          <span className="market-period">DATABASE</span>
        </div>

        {marketLoading ? (
          <p className="market-source">Loading market prices...</p>
        ) : marketError ? (
          <p className="market-source">{marketError}</p>
        ) : marketItems.length === 0 ? (
          <p className="market-source">No verified market prices are available yet. Please check again later.</p>
        ) : (
          <>
            <div className="market-table">
              <div className="table-header">
                <span>PRODUCE</span>
                <span>MARKET / DISTRICT</span>
                <span>UNIT</span>
                <span>PRICE</span>
              </div>

              {marketItems.map((item) => (
                <div className="table-row" key={item.id}>
                  <span className="table-produce">
                    <span className="produce-icon mint">
                      {String(item.vegetable || "VE").slice(0, 2).toUpperCase()}
                    </span>
                    <strong>{item.vegetable || "Vegetable"}</strong>
                  </span>
                  <span>{item.marketName || item.district || "Not specified"}</span>
                  <span>{item.unit || "Unit not specified"}</span>
                  <strong>
                    {item.currency || "M"}{" "}
                    {Number.isFinite(Number(item.price))
                      ? Number(item.price).toFixed(2)
                      : item.price}
                  </strong>
                </div>
              ))}
            </div>

            <div className="market-source">
              Prices are database records, not guaranteed current quotations.
            </div>

            <div className="market-source">
              {marketItems.map((item) => (
                <p key={`${item.id}-details`}>
                  <strong>{item.vegetable}</strong>
                  {" — "}Source: {item.source || "Not recorded"}
                  {" · "}Recorded: {formatDate(item.dateRecorded)}
                  {" · "}District: {item.district || "Not specified"}
                </p>
              ))}
            </div>
          </>
        )}
      </section>

      <section className="market-help">
        <span className="help-mark">?</span>
        <div>
          <strong>{t("Know a local market or buyer?")}</strong>
          <p>{t("Reliable market partners and data sources need to be confirmed with Agrivision.")}</p>
        </div>
      </section>
    </>
  );
}

function LearningPage({ completed, onToggle }) {
  const t = useTranslate();

  return (
    <>
      <section className="page-intro">
        <Eyebrow>{t("LEARN AT YOUR OWN PACE")}</Eyebrow>
        <h1>{t("Growing knowledge.")}</h1>
        <p>{t("Friendly, practical learning materials to support your journey as a grower.")}</p>
      </section>

      <section className="learning-banner">
        <div>
          <span className="banner-label">{t("YOUR LEARNING JOURNEY")}</span>
          <h2>{t("Every expert was once a beginner.")}</h2>
          <p>{t("Pick a topic, learn something new, and keep growing.")}</p>
        </div>
        <div className="learning-illustration">🌱</div>
      </section>

      <section className="section-block learning-block">
        <div className="section-heading">
          <div><Eyebrow>{t("START EXPLORING")}</Eyebrow><h2>{t("Guides for your garden")}</h2></div>
          <span className="offline-pill">{t("SHORT, PRACTICAL GUIDES")}</span>
        </div>

        <div className="lesson-grid">
          {lessons.map((lesson, index) => (
            <article className="lesson-card" key={lesson.title}>
              <div className={`lesson-art ${lesson.color}`}>
                <span>{lesson.icon}</span><small>0{index + 1}</small>
              </div>
              <div className="lesson-content">
                <span className="lesson-category">{t(lesson.category)}</span>
                <h3>{t(lesson.title)}</h3>
                <div className="lesson-meta">
                  <span>{t(lesson.time)}</span>
                  <button
                    className={`lesson-button ${completed.includes(lesson.title) ? "lesson-done" : ""}`}
                    onClick={() => onToggle(lesson.title)}
                  >
                    {completed.includes(lesson.title)
                      ? <><Icon name="check" size={14} /> {t("Completed")}</>
                      : t("Mark complete")}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="disclaimer">{t("Learning guides shown here are example content for the prototype. Confirm and add Agrivision-approved materials before launch.")}</p>
      </section>
    </>
  );
}

function StoriesPage({ saved, onToggle, onNotify }) {
  const t = useTranslate();

  return (
    <>
      <section className="page-intro stories-intro">
        <div>
          <Eyebrow>{t("GROWING TOGETHER")}</Eyebrow>
          <h1>{t("Stories that inspire.")}</h1>
          <p>{t("Meet growers and community groups sharing their journeys across Lesotho.")}</p>
        </div>
      </section>

      <section className="story-feature">
        <div className="feature-art">
          <div className="feature-sun" />
          <span className="feature-plant">🌿</span>
          <span className="feature-tag">{t("GROWING TOGETHER")}</span>
        </div>
        <div className="feature-copy">
          <Eyebrow>{t("COMMUNITY SPOTLIGHT")}</Eyebrow>
          <h2>{t("Good things grow when we grow together.")}</h2>
          <p>{t("Every garden begins with a seed, and every growing journey has something worth sharing.")}</p>
          <span className="feature-caption">{t("A note from the Agrivision community")}</span>
        </div>
      </section>

      <section className="section-block stories-block">
        <div className="section-heading">
          <div><Eyebrow>{t("FROM THE COMMUNITY")}</Eyebrow><h2>{t("Meet fellow growers")}</h2></div>
          <span className="review-tag">{t("EXAMPLE STORIES")}</span>
        </div>

        <div className="stories-grid">
          {stories.map((story) => (
            <article className="community-story" key={story.name}>
              <div className="community-story-top">
                <span className={`story-avatar ${story.color}`}>{story.initials}</span>
                <button
                  className={`save-story ${saved.includes(story.name) ? "saved-story" : ""}`}
                  aria-label={`${t(saved.includes(story.name) ? "Unsave" : "Save")} ${story.name}`}
                  onClick={() => onToggle(story.name)}
                >
                  {saved.includes(story.name) ? "♥" : "♡"}
                </button>
              </div>
              <h3>{story.name}</h3>
              <span className="story-place">{t(story.place)}</span>
              <p>“{t(story.quote)}”</p>
              <button className="story-read" onClick={() => onNotify(t("Full community stories will be available when approved content is added"))}>
                {t("Read story")} <span>→</span>
              </button>
            </article>
          ))}
        </div>

        <p className="disclaimer">{t("These are illustrative story examples, not verified Agrivision testimonials. Stories should be shared with the author’s permission and approved before publication.")}</p>
      </section>
    </>
  );
}

export default App;
