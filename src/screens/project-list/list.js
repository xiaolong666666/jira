export const List = ({ list, user }) => {
  return (
    <table>
      <thead>
        <th>项目名称</th>
        <th>负责人</th>
      </thead>
      <tbody>
        {list.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>
                {user.find((u) => u.id === item.personId)?.name || "未知"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default List;
