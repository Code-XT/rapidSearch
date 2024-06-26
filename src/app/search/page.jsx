const SearchPage = ({ searchParams }) => {
  const { query } = searchParams;
  return <div>{query}</div>;
};

export default SearchPage;
