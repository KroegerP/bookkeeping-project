export function makeNonNullRef() {
  return {
    graphql: {
      isNonNull: {
        read: true,
        create: true,
        update: true,
      },
    },
  };
}