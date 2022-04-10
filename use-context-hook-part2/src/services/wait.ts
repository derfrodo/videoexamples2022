
export const wait = async (delayInMs: number) => {
    return new Promise((r) => setTimeout(r, delayInMs));
  };