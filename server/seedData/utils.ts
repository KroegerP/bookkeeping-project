import type { Context }  from ".keystone/types";



export async function resetSequence(name: string, context: Context) {
  // eslint-disable-next-line quotes
  const seqReset = `ALTER SEQUENCE
    "${name}" RESTART WITH 1`;
  await context.prisma.$queryRawUnsafe(seqReset);
}