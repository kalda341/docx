import { XmlComponent } from "@file/xml-components";
import { ChangeAttributes, IChangedAttributesProperties } from "../track-revision";

export class DeletedElement extends XmlComponent {
    public constructor(props: IChangedAttributesProperties) {
        super("w:del");
        this.root.push(new ChangeAttributes(props));
    }
}
