import { XmlComponent } from "@file/xml-components";
import { ChangeAttributes, IChangedAttributesProperties } from "../track-revision";

export class InsertedElement extends XmlComponent {
    public constructor(props: IChangedAttributesProperties) {
        super("w:ins");
        this.root.push(new ChangeAttributes(props));
    }
}
