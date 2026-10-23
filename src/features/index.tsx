import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Globe, Tv, Users, type LucideIcon } from "lucide-react";
import SearchBar from "../components/SearchBar";
import PortalAvatar from "../components/PortalAvatar";
import { HOME_MENU } from "../lib/data";

// Icon tiap kartu menu, dicocokkan lewat URL tujuannya
const MENU_ICONS: Record<(typeof HOME_MENU)[number]["to"], LucideIcon> = {
  "/characters": Users,
  "/location": Globe,
  "/episode": Tv,
};

const HomePage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  // Kata yang dicari dikirim lewat URL: /characters?name=rick
  const handleSearch = () => {
    navigate({
      to: "/characters",
      search: { name: query.trim() || undefined },
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-3xl bg-linear-to-br from-yellow-100 to-lime-200 p-8 shadow-lg md:p-12">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <div className="font-caveat text-5xl font-bold leading-tight text-ink md:text-7xl">
              <div>Welcome to the</div>
              <div>Rick and Morty</div>
            </div>

            <div className="max-w-md text-sm text-ink/70">
              Explore the multiverse! Search for characters, locations, and
              episodes from Rick and Morty.
            </div>

            <SearchBar
              value={query}
              onChange={setQuery}
              onSubmit={handleSearch}
              placeholder="Search for characters, locations, or episodes..."
              buttonLabel="Search"
            />
          </div>

          <PortalAvatar />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {HOME_MENU.map((item) => {
          const Icon = MENU_ICONS[item.to];

          return (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-4 rounded-2xl border border-portal/30 bg-paper p-5 shadow transition hover:-translate-y-1"
            >
              <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-portal/20 text-portal-dark">
                <Icon size={28} />
              </div>
              <div className="flex flex-col gap-1">
                <div className="font-title text-lg font-bold text-ink">
                  {item.title}
                </div>
                <div className="text-sm text-ink/70">{item.desc}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;