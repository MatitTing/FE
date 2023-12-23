type Options = Record<string, string>;

const replacePlaceholder = (
  options: Options,
  key: string
): ((str: string) => string) => {
  const regex = new RegExp(`\\{\\{${key}}}`, "g");
  return (str: string) => str.replace(regex, options[key]);
};

const variableAssignment = (template: string, options?: Options): string => {
  if (
    typeof template !== "string" ||
    (options && !Object.keys(options).length)
  ) {
    throw new Error("Invalid input parameters");
  }

  if (!options) return template;

  const replaceFunctions = Object.keys(options).map((key) =>
    replacePlaceholder(options, key)
  );

  return replaceFunctions.reduce(
    (result, replaceFn) => replaceFn(result),
    template
  );
};

export default variableAssignment;
