import { Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdduserComponent } from './adduser/adduser.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { CategoryComponent } from './categories/categories.component';
import { SubCategoryComponent } from './subcategories/subcategories.component'; 
import { karaokeComponent } from './karaoke/karaoke.component';
import { AuthGuard } from './guards/index';
import { CmsComponent } from './cms/cms.component';
import { JsonCreatorComponent } from './json-creator/json-creator.component';
import { ContactComponent } from './contact/contact.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsnConditionsComponent } from './terms/terms.component';
import { HelpComponent } from './help/help.component';
import { FaqComponent } from './faq/faq.component';
import { GuideComponent } from './guide/guide.component';
   
export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent , canActivate: [AuthGuard]},  
  
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'adduser', component: AdduserComponent },  
  { path: 'Changepassword', component: ChangepasswordComponent },
  { path: 'forgotpassword/:id', component: ForgotpasswordComponent },
  { path: 'category', component: CategoryComponent , canActivate: [AuthGuard]},
  { path: 'subcategory', component: SubCategoryComponent , canActivate: [AuthGuard]},
  { path: 'music', component: karaokeComponent , canActivate: [AuthGuard] },
  { path: 'cms', component: CmsComponent, canActivate: [AuthGuard] },
  { path: 'json-creator', component: JsonCreatorComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent},
  { path: 'privacy', component: PrivacyComponent },
  { path: 'terms', component: TermsnConditionsComponent },
  { path: 'help', component: HelpComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'guide', component: GuideComponent },
  
  
];
