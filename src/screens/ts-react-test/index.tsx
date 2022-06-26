import { useMount, useArray } from "../../utils/hooks";

interface Person {
  name: string;
  age: number;
}

const TsReactTestScreen = () => {
  const person: Person[] = [
    { name: "tom", age: 25 },
    { name: "jack", age: 22 },
  ];
  const [value, clear, removeIndex, add] = useArray(person);

  useMount(() => {
    // console.log(value.notExist)
    // add({ name: 'davai' })
    // removeIndex('123')
  });

  return (
    <>
      <button onClick={() => add({ name: "mark", age: 22 })}>add mark</button>
      <button onClick={() => removeIndex(0)}>remove 0</button>
      <button onClick={clear}>clear</button>
      <table>
        <thead>
          <tr>
            <td>Index</td>
            <td>Name</td>
            <td>Age</td>
          </tr>
        </thead>
        <tbody>
          {value.map(({ name, age }, i: number) => (
            <tr key={`key${i}`}>
              <td>{i}</td>
              <td>{name}</td>
              <td>{age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TsReactTestScreen;
