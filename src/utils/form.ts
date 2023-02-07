export const mapFormData = <T, K extends string = string>(
  fn: (value: string) => T
) => {
  return (formData: FormData) => {
    return [...formData.entries()].reduce(
      (data, [key, value]) => ({
        ...data,
        [key]: fn(value.toString()),
      }),
      {} as Record<K, T>
    );
  };
};
