
import { BaseDialog } from '@microsoft/sp-dialog'




export class DialogTable extends BaseDialog {

   public message: string;

    public render() : void {

        this.domElement.innerHTML += `
        <div style="display: block; position: absolute; top: 0; left: 0; right: 0; bottom: 0; text-align: center; z-index: 9999">
        <h1>Hello world </h1>
        </div>
        `
    };

}