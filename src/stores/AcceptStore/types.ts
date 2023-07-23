export type TExtDescription = {
  ext: string | string[];
  description: string;
  mime: string;
}

export type TExtDescriptWithInput = TExtDescription & { input: string }