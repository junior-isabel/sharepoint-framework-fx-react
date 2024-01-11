import { Log } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  Command,
  IListViewCommandSetExecuteEventParameters,
  ListViewStateChangedEventArgs
} from '@microsoft/sp-listview-extensibility';
import {
  SPHttpClient,
  SPHttpClientResponse
} from '@microsoft/sp-http'
import { Dialog } from '@microsoft/sp-dialog';

import { DialogTable } from './DialogTable'

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IListUsersCommandSetProperties {
  // This is an example; replace with your own properties
  sampleTextOne: string;
  sampleTextTwo: string;
  sampleTextThree: string;
}
/*
interface IRoleAssignments {
  Id: number,
  Title: string,
  Email: string,

  RoleDefinitionBindings: Array<{
    RoleTypeKind: number,
    Name: string
  }>
}
*/
const LOG_SOURCE: string = 'ListUsersCommandSet';

export default class ListUsersCommandSet extends BaseListViewCommandSet<IListUsersCommandSetProperties> {

  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized ListUsersCommandSet');

    // initial state of the command's visibility
    const compareOneCommand: Command = this.tryGetCommand('COMMAND_3');
    compareOneCommand.visible = false;

    this.context.listView.listViewStateChangedEvent.add(this, this._onListViewStateChanged);

    return Promise.resolve();
  }

  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    switch (event.itemId) {
      case 'COMMAND_1':
        this._getPermissoesBiblioteca().then((response) => {
         
          var data = response.value.filter((it: any) => it.Member.PrincipalType == 1).map((it: any) => {
            var obj: any = {};

            obj.Id = it.Member.Id
            obj.Email = it.Member.Email
            obj.Title = it.Member.Title
            obj.RoleTypeKind = it.RoleDefinitionBindings[0]!.RoleTypeKind ?? -1
            obj.RoleName = it.RoleDefinitionBindings[0]!.Name ?? ""

            return obj;
          })
          var table = new DialogTable();

          table.show();
          Dialog.alert(`dados: ${data.map((it: any) => it.Title).join(" | ")}`).catch(() => {
        })
        

        })
        break;
      case 'COMMAND_2':
        Dialog.alert(`${this.properties.sampleTextTwo}`).catch(() => {
          /* handle error */
        });
      case 'COMMAND_3':
        Dialog.alert(`${this.properties.sampleTextThree}`).catch(() => {
          /* handle error */
        });
        break;
      default:
        throw new Error('Unknown command');
    }
  }

  private _onListViewStateChanged = (args: ListViewStateChangedEventArgs): void => {
    Log.info(LOG_SOURCE, 'List view state changed');

    const compareOneCommand: Command = this.tryGetCommand('COMMAND_3');
    if (compareOneCommand) {
      // This command should be hidden unless exactly one row is selected.
      compareOneCommand.visible = this.context.listView.selectedRows?.length === 1;
    }

    // TODO: Add your logic here

    // You should call this.raiseOnChage() to update the command bar
    this.raiseOnChange();
  }

  //Obter Permissões Pagina

  private _getPermissoesBiblioteca(): Promise<any> {

    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists/getbytitle('Documentos Partilhados')/RoleAssignments?$expand=Member/Users,RoleDefinitionBindings`, SPHttpClient.configurations.v1)

      .then((response: SPHttpClientResponse) => {

        return response.json();

      });

  }
}
