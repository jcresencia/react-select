import { MagicalNode, MagicalNodeIndex } from '@magical-types/types';
export declare type MagicalNodeMetadata = Record<string, Record<string, MagicalNodeRecord>>;
export declare type MagicalNodeRecord = {
    type: 'component' | 'other';
    index: MagicalNodeIndex;
};
export declare type MagicalNodesForPackage = Record<string, {
    type: 'component' | 'other';
    node: MagicalNode;
}>;
export declare type MagicalNodes = Record<string, MagicalNodesForPackage>;
