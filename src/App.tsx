import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import UserList, { UserType } from "./components/UserList";
import SearchInput from "./components/SearchInput";
import InfiniteScroll from "react-infinite-scroll-component";
import './App.css';

const App = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<null|Error>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Method for fetching user data
  const fetchData = async () => {
    setError(null);
  
    try {
      const response = await fetch(`https://reqres.in/api/users?per_page=4&page=${page}`);
      const data = await response.json();
      
      data.total_pages > page
      ? setPage(prevPage => prevPage + 1)
      : setHasMore(false);
      
      setUsers(prevUsers => [...prevUsers, ...data.data]);

    } catch (error) {
      error instanceof Error ? setError(error) : console.log(error);
    }
  };

  useEffect(() => {
    // Add class to body element
    document.body.classList.add('bg-gray-100');
    
    // Set timer for 3 seconds
    setTimeout(() => {
      
      fetchData(); // Fetch users data from API

    }, 3000);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // Fixing scrolling issue if window is larger than loaded data
    if (typeof window !== 'undefined' && window.innerHeight >= document.documentElement.scrollHeight)
      window.dispatchEvent(new CustomEvent('scroll'));
  }, [users, search]);

  // Show loader if there are no users
  if (users.length === 0)
    return <Loader />;

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-semibold text-center mb-8">Ombori Code Test</h1>
      
      <SearchInput onChange={(e) => setSearch(e.target.value)} />

      <InfiniteScroll
        dataLength={users.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<p className="text-slate-500 text-center mt-4">Loading...</p>}
        endMessage={<p className="text-slate-500 text-center mt-4">No more data to load.</p>}
      >
        <UserList users={users} search={search} />
      </InfiniteScroll>
      
      {error && <p className="text-red-500 text-center mt-4">Error: {error.message}</p>}
    </div>
  );
}

export default App;
