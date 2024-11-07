/// <reference path="../.astro/types.d.ts" />
/// <reference path="../.astro/icon.d.ts" />
import type { Icon } from 'virtual:astro-icon';

declare module 'virtual:notes' {
  export type Colors =
    | 'text'
    | 'base'
    | 'rosewater'
    | 'flamingo'
    | 'pink'
    | 'mauve'
    | 'red'
    | 'maroon'
    | 'peach'
    | 'yellow'
    | 'green'
    | 'teal'
    | 'sky'
    | 'sapphire'
    | 'blue';
}
