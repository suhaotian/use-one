'use server';

let count = 20;
export async function getCount(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(count)
    }, 1500);
  });
}

export async function updateCount(n: number) {
  count = n;
}