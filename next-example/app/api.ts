export async function getCount(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(20)
    }, 1500);
  });
}
