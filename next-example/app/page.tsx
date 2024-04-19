
import { countStore } from "./useCount";
import { Counter } from './Counter'

export default async function Home() {
  const [{ count },] = countStore.use()
  return (
    <>
      <div className="text-xl" test-id="server-count">{count}</div>
      <Counter></Counter>
    </>
  );
}
