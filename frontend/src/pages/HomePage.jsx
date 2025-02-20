import { useCallback, useEffect, useState } from "react";

import Search from "../components/Search.jsx";
import SortRepos from "../components/SortRepos.jsx";
import ProfileInfo from "../components/ProfileInfo.jsx";
import Repos from "../components/Repos.jsx";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner.jsx";

function HomePage() {
  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortType, setSortType] = useState("recent");

  const getUserProfileAndRepos = useCallback(async (username = "shoaeeb") => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/profile/${username}`
      );
      const { userProfile, repos } = await response.json();
      setUserProfile(userProfile);

      setRepos(repos);
      console.log("userProfile", userProfile);
      console.log("repos", repos);
      return { userProfile, repos };
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const onSearch = async (e, username) => {
    e.preventDefault();
    setLoading(true);
    setUserProfile(null);
    setRepos([]);
    setSortType("recent");
    await getUserProfileAndRepos(username);
  };

  const onSort = (sortType) => {
    if (sortType === "recent") {
      repos.sort(
        (a, b) =>
          new Date(b?.created_at).getTime() - new Date(a?.created_at).getTime()
      );
    } else if (sortType === "stars") {
      repos.sort((a, b) => b?.stargazers_count - a?.stargazers_count);
    } else if (sortType === "forks") {
      repos.sort((a, b) => b?.forks_count - a?.forks_count);
    }
    setSortType(sortType);
    setRepos([...repos]);
  };

  useEffect(() => {
    getUserProfileAndRepos();
  }, [getUserProfileAndRepos]);

  return (
    <div className="m-4">
      <Search onSearch={onSearch} />
      {repos.length > 0 && <SortRepos sortType={sortType} onSort={onSort} />}

      <div className="flex gap-4 flex-col lg:flex-row justify-center items-start">
        <ProfileInfo userProfile={userProfile} />
        {!loading && <Repos repos={repos} />}

        {loading && <Spinner />}
      </div>
    </div>
  );
}
export default HomePage;
