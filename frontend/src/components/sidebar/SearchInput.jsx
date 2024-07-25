import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search must be at least 3 characters long");
    }

    // First, check for exact name matches
    const exactMatch = conversations.find(
      (conv) => conv.fullName.toLowerCase() === search.toLowerCase()
    );

    if (exactMatch) {
      setSelectedConversation(exactMatch);
      setSearch("");
      return; // Return to avoid further processing
    }

    // If exact match not found, then check for substring matches
    const substringMatch = conversations.find((conv) =>
      conv.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (substringMatch) {
      setSelectedConversation(substringMatch);
      setSearch("");
    } else {
      toast.error("No user found");
    }
  };

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
