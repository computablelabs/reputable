export default interface ParsedUrl {
  readonly source?: string;
  readonly protocol?: string;
  readonly authority?: string;
  readonly userInfo?: string;
  readonly user?: string;
  readonly password?: string;
  readonly host?: string;
  readonly port?: string;
  readonly relative?: string;
  readonly path?: string;
  readonly directory?: string;
  readonly file?: string;
  readonly query?: string;
  readonly anchor?: string;
  readonly queryKey?: any;
}
