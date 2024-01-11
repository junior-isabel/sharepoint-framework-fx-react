/* eslint-disable */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BaseDialog, IDialogConfiguration} from '@microsoft/sp-dialog'
import { IColor } from 'office-ui-fabric-react/lib/Color'
//import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button'
//import { DialogContent, DialogFooter } from 'office-ui-fabric-react/lib/Dialog'
//import { ColorPicker } from 'office-ui-fabric-react/lib/ColorPicker'



interface IColorPickerDialogContentProps {
    message: string;
    close: () => void;
    submit: (color: IColor) => void;
    defaultColor?: IColor;
    id?: string;
  }
  class ColorPickerDialogContent extends React.Component<IColorPickerDialogContentProps, {}> {
    //private _pickedColor: IColor;
  
    constructor(props: any) {
      super(props);
      // Default Color
      //this._pickedColor = props.defaultColor || { hex: 'FFFFFF', str: '', r: null, g: null, b: null, h: null, s: null, v: null };
    }
  
    public render(): JSX.Element {
      return <>
      <div>
        <h1>Hello World</h1>
      </div>
      </>;
    }
  
    // private _onColorChange = (ev: React.SyntheticEvent<HTMLElement, Event>, color: IColor) => {
    //   this._pickedColor = color;
    // }
    
  }
  

  export default class ColorPickerDialog extends BaseDialog {
    public message: string;
    public colorCode: IColor;
    
    public render(): void {
        
      ReactDOM.render(<ColorPickerDialogContent
      close={ this.close }
      message={ this.message }
      defaultColor={ this.colorCode }
      submit={ this._submit }
      id={Date.now().toString()}
      />, this.domElement);
      

      this.domElement.innerText = "hello world"
    }
  
    public getConfig(): IDialogConfiguration {
      return { isBlocking: false };
    }
  
    protected onAfterClose(): void {
      super.onAfterClose();
  
      // Clean up the element for the next dialog
      ReactDOM.unmountComponentAtNode(this.domElement);
    }
  
    private _submit = (color: IColor) => {
      this.colorCode = color;
      this.close();
    }
    
  }