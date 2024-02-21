
import Image from "next/image";
import { useCount } from "./useCount";
import { Counter } from './Counter'

export default async function Home() {
  const [{ count },] = useCount()
  return (
    <>
      <div className="text-xl">{count}</div>
      <Counter></Counter>
    </>
  );
}
