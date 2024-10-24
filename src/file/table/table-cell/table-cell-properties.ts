import { VerticalAlign, VerticalAlignElement } from "@file/vertical-align";
import { IgnoreIfEmptyXmlComponent } from "@file/xml-components";
import { IChangedAttributesProperties } from "@file/track-revision/track-revision";
import { InsertedElement } from "@file/track-revision/track-revision-components/inserted-element";
import { DeletedElement } from "@file/track-revision/track-revision-components/deleted-element";

import { IShadingAttributesProperties, Shading } from "../../shading";
import { ITableCellMarginOptions, TableCellMargin, TableCellMarginElementType } from "../table-properties/table-cell-margin";
import { ITableWidthProperties, TableWidthElement } from "../table-width";
import {
    GridSpan,
    ITableCellBorders,
    TableCellBorders,
    TDirection,
    TextDirection,
    VerticalMerge,
    VerticalMergeType,
} from "./table-cell-components";

export interface ITableCellPropertiesOptions {
    readonly shading?: IShadingAttributesProperties;
    readonly margins?: ITableCellMarginOptions;
    readonly verticalAlign?: (typeof VerticalAlign)[keyof typeof VerticalAlign];
    readonly textDirection?: (typeof TextDirection)[keyof typeof TextDirection];
    readonly verticalMerge?: (typeof VerticalMergeType)[keyof typeof VerticalMergeType];
    readonly width?: ITableWidthProperties;
    readonly columnSpan?: number;
    readonly rowSpan?: number;
    readonly borders?: ITableCellBorders;
    readonly trackedInsertion?: IChangedAttributesProperties;
    readonly trackedDeletion?: IChangedAttributesProperties;
}

export class TableCellProperties extends IgnoreIfEmptyXmlComponent {
    public constructor(options: ITableCellPropertiesOptions) {
        super("w:tcPr");

        if (options.width) {
            this.root.push(new TableWidthElement("w:tcW", options.width));
        }

        if (options.columnSpan) {
            this.root.push(new GridSpan(options.columnSpan));
        }

        if (options.verticalMerge) {
            this.root.push(new VerticalMerge(options.verticalMerge));
        } else if (options.rowSpan && options.rowSpan > 1) {
            // if cell already have a `verticalMerge`, don't handle `rowSpan`
            this.root.push(new VerticalMerge(VerticalMergeType.RESTART));
        }

        if (options.borders) {
            this.root.push(new TableCellBorders(options.borders));
        }

        if (options.shading) {
            this.root.push(new Shading(options.shading));
        }

        if (options.margins) {
            this.root.push(new TableCellMargin(TableCellMarginElementType.TABLE_CELL, options.margins));
        }

        if (options.textDirection) {
            this.root.push(new TDirection(options.textDirection));
        }

        if (options.verticalAlign) {
            this.root.push(new VerticalAlignElement(options.verticalAlign));
        }

        if (options.trackedInsertion) {
            this.root.push(new InsertedElement(options.trackedInsertion));
        }
        if (options.trackedDeletion) {
            this.root.push(new DeletedElement(options.trackedDeletion));
        }
    }
}
