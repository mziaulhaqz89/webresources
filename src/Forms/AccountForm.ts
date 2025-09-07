// Using @types/xrm - no imports needed, Xrm is globally available
import { AccountAttributes } from "../constants/EntityAttributes";

export class AccountForm {
  static async onLoad(context: Xrm.Events.EventContext): Promise<void> {
    context.getFormContext().getAttribute(AccountAttributes.WebSiteURL).addOnChange(AccountForm.onWebsiteChanged);
  }

  static onWebsiteChanged(context: Xrm.Events.EventContext): void {
    const formContext = context.getFormContext();
    const websiteAttribute = formContext.getAttribute(AccountAttributes.WebSiteURL) as Xrm.Attributes.StringAttribute;
    const websiteRegex = /^(https?:\/\/)?([\w\d]+\.)?[\w\d]+\.\w+\/?.+$/g;

    let isValid = true;
    if (websiteAttribute && websiteAttribute.getValue()) {
      const match = websiteAttribute.getValue().match(websiteRegex);
      isValid = match != null;
    }

    websiteAttribute.controls.forEach((c) => {
      if (isValid) {
        (c as Xrm.Controls.StringControl).clearNotification(AccountAttributes.WebSiteURL);
      } else {
        (c as Xrm.Controls.StringControl).setNotification(
          "Hi, This is Invalid Website Address! Please enter a valid URL. Thanks",
          AccountAttributes.WebSiteURL,
        );
      }
    });
  }
}
