import { revalidatePath } from 'next/cache';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic'; // static by default, unless reading the request

export async function GET(request: Request) {
  revalidatePath('/', 'layout');
  return new Response(`ok`);
}
