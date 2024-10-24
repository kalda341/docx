// http://officeopenxml.com/WPtableRowProperties.php

// <xsd:complexType name="CT_TrPrBase">
//     <xsd:choice maxOccurs="unbounded">
//         <xsd:element name="cnfStyle" type="CT_Cnf" minOccurs="0" maxOccurs="1"/>
//         <xsd:element name="divId" type="CT_DecimalNumber" minOccurs="0"/>
//         <xsd:element name="gridBefore" type="CT_DecimalNumber" minOccurs="0"/>
//         <xsd:element name="gridAfter" type="CT_DecimalNumber" minOccurs="0"/>
//         <xsd:element name="wBefore" type="CT_TblWidth" minOccurs="0" maxOccurs="1"/>
//         <xsd:element name="wAfter" type="CT_TblWidth" minOccurs="0" maxOccurs="1"/>
//         <xsd:element name="cantSplit" type="CT_OnOff" minOccurs="0"/>
//         <xsd:element name="trHeight" type="CT_Height" minOccurs="0"/>
//         <xsd:element name="tblHeader" type="CT_OnOff" minOccurs="0"/>
//         <xsd:element name="tblCellSpacing" type="CT_TblWidth" minOccurs="0" maxOccurs="1"/>
//         <xsd:element name="jc" type="CT_JcTable" minOccurs="0" maxOccurs="1"/>
//         <xsd:element name="hidden" type="CT_OnOff" minOccurs="0"/>
//     </xsd:choice>
// </xsd:complexType>
// <xsd:complexType name="CT_TrPr">
//     <xsd:complexContent>
//         <xsd:extension base="CT_TrPrBase">
//             <xsd:sequence>
//                 <xsd:element name="ins" type="CT_TrackChange" minOccurs="0"/>
//                 <xsd:element name="del" type="CT_TrackChange" minOccurs="0"/>
//                 <xsd:element name="trPrChange" type="CT_TrPrChange" minOccurs="0"/>
//             </xsd:sequence>
//         </xsd:extension>
//     </xsd:complexContent>
// </xsd:complexType>
import { IgnoreIfEmptyXmlComponent, OnOffElement } from "@file/xml-components";
import { PositiveUniversalMeasure } from "@util/values";

import { IChangedAttributesProperties } from "@file/track-revision/track-revision";
import { InsertedElement } from "@file/track-revision/track-revision-components/inserted-element";
import { DeletedElement } from "@file/track-revision/track-revision-components/deleted-element";
import { HeightRule, TableRowHeight } from "./table-row-height";

export interface ITableRowPropertiesOptions {
    readonly cantSplit?: boolean;
    readonly tableHeader?: boolean;
    readonly height?: {
        readonly value: number | PositiveUniversalMeasure;
        readonly rule: (typeof HeightRule)[keyof typeof HeightRule];
    };
    readonly trackedInsertion?: IChangedAttributesProperties;
    readonly trackedDeletion?: IChangedAttributesProperties;
}

export class TableRowProperties extends IgnoreIfEmptyXmlComponent {
    public constructor(options: ITableRowPropertiesOptions) {
        super("w:trPr");

        if (options.cantSplit !== undefined) {
            this.root.push(new OnOffElement("w:cantSplit", options.cantSplit));
        }

        if (options.tableHeader !== undefined) {
            this.root.push(new OnOffElement("w:tblHeader", options.tableHeader));
        }

        if (options.height) {
            this.root.push(new TableRowHeight(options.height.value, options.height.rule));
        }

        if (options.trackedInsertion) {
            this.root.push(new InsertedElement(options.trackedInsertion));
        }
        if (options.trackedDeletion) {
            this.root.push(new DeletedElement(options.trackedDeletion));
        }
    }
}
