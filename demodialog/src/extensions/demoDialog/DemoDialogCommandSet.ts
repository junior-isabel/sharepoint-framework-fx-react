import { Log } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  Command,
  IListViewCommandSetExecuteEventParameters,
  ListViewStateChangedEventArgs
} from '@microsoft/sp-listview-extensibility';
import { Dialog } from '@microsoft/sp-dialog';
import { SPHttpClient } from '@microsoft/sp-http';

//import ColorPickerDialog from './DemoDialog'
/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IDemoDialogCommandSetProperties {
  // This is an example; replace with your own properties
  sampleTextOne: string;
  sampleTextTwo: string;
}

const LOG_SOURCE: string = 'DemoDialogCommandSet';

export default class DemoDialogCommandSet extends BaseListViewCommandSet<IDemoDialogCommandSetProperties> {

  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized DemoDialogCommandSet');

    // initial state of the command's visibility
    const compareOneCommand: Command = this.tryGetCommand('COMMAND_1');
    compareOneCommand.visible = false;

    this.context.listView.listViewStateChangedEvent.add(this, this._onListViewStateChanged);

    this.context.spHttpClient.get(`${this.context.pageContext.web.absoluteUrl}/_api/lists/getbytitle('Despesas')?$select=Title`, SPHttpClient.configurations.v1)
    .then(res => res.json())
        .then(data => {
          console.log(data);
        })

    return Promise.resolve();
  }

  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    switch (event.itemId) {
      case 'COMMAND_1':
       // let dialog: ColorPickerDialog = new ColorPickerDialog();

        // dialog.show().then(value => {

        //   //this._colorCode = dialog.colorCode;
        //   Dialog.alert(`Picked color: ${dialog.colorCode.hex}`);
        // })
        
       // console.log(this.context)
      
        Dialog.alert(`${this.properties.sampleTextOne}`).catch(() => {
          /* handle error */
        });
        break;
      case 'COMMAND_2':
        Dialog.alert(`${this.properties.sampleTextTwo}`).catch(() => {
          /* handle error */
        });
        break;
      default:
        throw new Error('Unknown command');
    }
  }

  private _onListViewStateChanged = (args: ListViewStateChangedEventArgs): void => {
    Log.info(LOG_SOURCE, 'List view state changed');

    const compareOneCommand: Command = this.tryGetCommand('COMMAND_1');
    if (compareOneCommand) {
      // This command should be hidden unless exactly one row is selected.
      compareOneCommand.visible = this.context.listView.selectedRows?.length === 1;
    }

    // TODO: Add your logic here

    // You should call this.raiseOnChage() to update the command bar
    this.raiseOnChange();
  }
}
