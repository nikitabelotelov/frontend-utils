import { EXTS_DESCR } from "./exts";
import { TExtDescription } from "./types";

const extRegexp = /\.[a-zA-Z0-9]+/g;

export function getExtensions(s: string) {
  const extRaw = [...s.matchAll(extRegexp)];
  let exts = extRaw.map((el) => el[0]);
  exts = [...new Set(exts)];
  return {
    exts,
    descriptions: [
      ...new Set(
        exts
          .map((el) => {
            const found = EXTS_DESCR.find((inner) => {
              if (Array.isArray(inner.ext)) {
                return inner.ext.includes(el);
              }
              return inner.ext === el;
            });
            if (found) {
              return found;
            }
            return null;
          })
          .filter((el): el is TExtDescription => !!el)
      ),
    ],
  };
}

export function flatArray(s: Array<string | string[]>) {
  const res: string[] = [];
  s.forEach((el) => {
    if (Array.isArray(el)) {
      res.push(...el);
    } else {
      res.push(el);
    }
  });
  return res;
}
