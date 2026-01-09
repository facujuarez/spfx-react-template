import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'WebPartStrings';
import Hello from './components/Hello';
import { IHelloProps } from './components/IHelloProps';
import { IServicesState } from '../../view/store/services/Reducer';
import { SPService } from '../../services/data/SPService';
import * as SPConstants from "../../services/utils/SPConstants";
import { AZService } from '../../services/data/AZService';
import { CreateNode, EnsureSlash, IsUndefinedOrNull } from '../../utils/Utils';
import { IMainProperties, MainComponent } from '../../view/components/main/MainComponent';
import { MainInitialState } from '../../view/store/main/Reducer';


export interface IHelloWebPartProps {
  description: string;
}

export default class HelloWebPart extends BaseClientSideWebPart<IHelloWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';
  private _idReactComponent: string = "3D26E14E405E4DE2A76C215500F36B30";

  public render(): void {
    try {
      const containerComponent = document.getElementById(this._idReactComponent);

      if (!IsUndefinedOrNull(containerComponent)) {
        containerComponent?.parentElement?.removeChild(containerComponent);
      }

      const contenedor = CreateNode(this._idReactComponent);

      const properties: IMainProperties = {
        StoreInitialValues: {
          Main: {...MainInitialState, WebPartName: 'Hello' },
          //Services: { ...this.GetServicesImplementation() }
        }
      };

      const element: React.ReactElement<any> = React.createElement(
        MainComponent,
        {
          ...properties
        }
      );

      ReactDom.render(element, contenedor);
      this.domElement.appendChild(contenedor);



      // const element: React.ReactElement<IHelloProps> = React.createElement(
      //   Hello,
      //   {
      //     description: this.properties.description,
      //     isDarkTheme: this._isDarkTheme,
      //     environmentMessage: this._environmentMessage,
      //     hasTeamsContext: !!this.context.sdks.microsoftTeams,
      //     userDisplayName: this.context.pageContext.user.displayName
      //   }
      // );

      ReactDom.render(element, this.domElement);
    } catch (err) {
      console.error(`Error in HelloWebPart render: ${err}`);
    }
  }

  protected onInit(): Promise<void> {
    return this._getEnvironmentMessage().then(message => {
      this._environmentMessage = message;
    });
  }

  /**
   * Services implementation
   * @returns returns the services implementation
   */
  private GetServicesImplementation = (): IServicesState => {

    const { absoluteUrl: SiteAbsoluteUrl, serverRelativeUrl: SiteRelativeUrl } = this.context.pageContext.site;

    const services: IServicesState = {
      SPService: new SPService(
        { 
          Context: this.context, 
          WebAbsoluteUrl: `${EnsureSlash(SiteAbsoluteUrl)}${SPConstants.W_Participadas}`,
          WebListRootFolder: `${EnsureSlash(SiteRelativeUrl)}${EnsureSlash(SPConstants.W_Participadas)}${SPConstants.L_Empresas}`
        }),
      AZService: new AZService(
        this.context.aadHttpClientFactory, 
        this.context.aadTokenProviderFactory, 
        this.context.httpClient, 
        SPConstants.ResolveAzureConfiguracion(SiteAbsoluteUrl))
    }

    return services;
  }

  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
        .then(context => {
          let environmentMessage: string = '';
          switch (context.app.host.name) {
            case 'Office': // running in Office
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
              break;
            case 'Outlook': // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
              break;
            case 'Teams': // running in Teams
            case 'TeamsModern':
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
              break;
            default:
              environmentMessage = strings.UnknownEnvironment;
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
