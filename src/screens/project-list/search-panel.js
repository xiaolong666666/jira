export const SearchPanel = ({ param, user, setParam }) => {
  return (
    <form action="">
      <input
        type="text"
        value={param.name}
        onChange={(e) => {
          setParam({
            ...param,
            name: e.target.value,
          });
        }}
      />
      <select
        value={param.personId}
        onChange={(e) => {
          setParam({
            ...param,
            personId: e.target.value,
          });
        }}
      >
        <option value="">负责人</option>
        {user.map((item) => {
          return (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          );
        })}
      </select>
    </form>
  );
};

export default SearchPanel;
