'use server';

import fs from 'fs/promises';
import { revalidatePath } from 'next/cache';
import { countStore } from './useCount';

const file = '../count';

export async function getCount(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(async () => {
      let result = '0';
      try {
        result = await fs.readFile(file, 'utf-8');
      } catch (e) {
        console.log(e);
      }
      resolve(+result);
    }, 1500);
  });
}

export async function updateCount(n: number) {
  const res = await fs.writeFile(file, n + '');
  countStore.syncState({ count: n });
  revalidatePath('/', 'layout');
  return res;
}
