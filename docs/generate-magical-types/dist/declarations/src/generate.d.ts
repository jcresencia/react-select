import { MagicalNode } from '@magical-types/types';
declare type MagicalNodesForPackage = Record<string, {
    type: 'component' | 'other';
    node: MagicalNode;
}>;
export declare type MagicalNodes = Record<string, MagicalNodesForPackage>;
export {};
