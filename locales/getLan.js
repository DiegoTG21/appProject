//translations
import en from './en.json';
import sp from './sp.json';
import i18n from 'ex-react-native-i18n';
//import * as Localization from 'expo-localization';
import { I18nManager } from 'react-native';
i18n.translations={
  en,
  sp
}
//set defaults
i18n.defaultLocale='en';
i18n.locale='en'; 
//set the the app to local device settings
  export function getLan(){
    console.log("Language is being obtained");
    try{
        const choice = Localization.locale;
        console.log("Choice: ", choice, choice.substr(0,2));
        i18n.locale= choice.substr(0,2);
        i18n.initAsync();
    }catch(err){
      console.log("Error: ",err);
    }
  }
export function t(name){
  return i18n.t(name);
}