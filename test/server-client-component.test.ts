import { execSync } from 'child_process';

const sleep = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

beforeAll(() => {
  setTimeout(() => {
    execSync('cd next-example && pnpm i && pnpm dev');
  });
  return sleep(3000);
});

afterAll(() => {
  process.exit(1);
});

describe('should work with server/client components in next.js', () => {
  it('ok', async () => {
    const text = await fetch('http://localhost:3000/').then((res) =>
      res.text()
    );
    console.log(text)
  });
});
