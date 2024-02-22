import 'isomorphic-fetch';
import { spawn } from 'child_process';
import * as cheerio from 'cheerio';

const sleep = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

let handler: ReturnType<typeof spawn>;

beforeAll(() => {
  handler = spawn('cd next-example && pnpm dev', {
    shell: true,
  });
  return sleep(1000);
});

afterAll(async () => {
  spawn('kill', [handler.pid as any]);
  handler.kill('SIGTERM');
  handler.stdin!.destroy();
  handler.stdout!.destroy();
  handler.stderr!.destroy();
  await sleep(1000);
});

describe('should work with server/client components in next.js', () => {
  it('ok', async () => {
    await fetch('http://localhost:3000/')
    const text = await fetch('http://localhost:3000/').then((res) =>
      res.text()
    );
    const $ = cheerio.load(text);

    expect($('[test-id=server-count]').text()).toBe(
      $('[test-id=client-count]').text()
    );
  });
});
