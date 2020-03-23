export const sprites = (height: number, names: string[]) => {
  const classes = names.map(
    (name, i) => `
        &.${name} { 
            background-position-y: -${height * i}px;
        }
    `
  );
  return classes.join();
};
