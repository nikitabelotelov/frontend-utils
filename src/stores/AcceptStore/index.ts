import { makeAutoObservable, reaction } from "mobx";
import { TExtDescription } from "./types";
import { flatArray, getExtensions } from "./utils";
import { EXTS_DESCR } from "./exts";

type TDefaults = {
  allImages: boolean;
  allVideo: boolean;
  allAudio: boolean;
}

function getAllExtsMap() {
  return new Map(EXTS_DESCR.map(el => [el.ext, el]));
}

export class AcceptStore {
  private _textInput = "";
  private _extDescriptions: TExtDescription[] = [];
  private _exts: string[] = [];
  private _includeExtensions = false;
  private _includeUnknownExtensions = false;
  private _allExts: Map<string | string[], TExtDescription> = getAllExtsMap();
  private _defaults: TDefaults = {
    allImages: false,
    allVideo: false,
    allAudio: false
  };
  private _asArray = false;
  public get defaults(): TDefaults {
    return this._defaults;
  }
  public set defaults(value: TDefaults) {
    this._defaults = value;
  }
  public get asArray() {
    return this._asArray;
  }
  public set asArray(value) {
    this._asArray = value;
  }
  public get exts(): string[] {
    return this._exts;
  }
  public set exts(value: string[]) {
    this._exts = value;
  }
  public get allExts(): Map<string | string[], TExtDescription> {
    return this._allExts;
  }
  public set allExts(value: Map<string | string[], TExtDescription>) {
    this._allExts = value;
  }
  public get extDescriptions(): TExtDescription[] {
    return this._extDescriptions;
  }
  public set extDescriptions(value: TExtDescription[]) {
    this._extDescriptions = value;
  }
  public get includeUnknownExtensions() {
    return this._includeUnknownExtensions;
  }
  public set includeUnknownExtensions(value) {
    this._includeUnknownExtensions = value;
  }
  public get includeExtensions() {
    return this._includeExtensions;
  }
  public set includeExtensions(value) {
    this._includeExtensions = value;
  }
  public get textInput() {
    return this._textInput;
  }
  public set textInput(value) {
    this._textInput = value;
  }
  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
    reaction(
      () => this.textInput,
      () => {
        const extInfo = getExtensions(this.textInput);
        this.exts = extInfo.exts;
        this.extDescriptions = extInfo.descriptions;
      }
    );
  }
  get extsString() {
    const extsArr = this.extDescriptions.map((el) => {
      if (this.includeExtensions) {
        if (Array.isArray(el.ext)) {
          return [...el.ext, el.mime];
        }
        return [el.ext, el.mime];
      }
      return el.mime;
    });
    const flattenArray = flatArray(extsArr);
    let res = flattenArray;
    if (this.includeExtensions && this.includeUnknownExtensions) {
      res = [...new Set([...flattenArray, ...this.exts])];
    }
    if (this.defaults.allAudio) {
      res.push("audio/*");
    }
    if (this.defaults.allImages) {
      res.push("image/*");
    }
    if (this.defaults.allVideo) {
      res.push("video/*");
    }
    if (this.asArray) {
      return JSON.stringify(res);
    } else {
      return res.join(", ");
    }
  }
}
