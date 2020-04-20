import {Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import CustomValidators from '../forms/CustomValidators';
import {Router} from '@angular/router';
import { UserService } from '../userservice/user.service';


@Component({
  selector: 'adduser',
  styleUrls: ['./adduser.component.css'],
  templateUrl: './adduser.component.html'
    
})
export class AdduserComponent {
  userdet: any = null;
  data: any = null;
  adduserForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService){
  this.userdet = JSON.parse(localStorage.getItem("loggedinuser"));
      console.log(this.userdet);      
      if(this.userdet !== null){
        this.router.navigate(['/adduser']);
        // console.log(this.userService.makeRequest());
        // this.userService.makeRequest().subscribe(data => {
        //   this.data = data.data;
        //   console.log(data);
        // });

          //this.email = this.userdet.email;       
          //console.log(this.email);          
      }
      else
        this.router.navigate(['/login']);
        //  this.navCtrl.push(Page1);
  }

  ngOnInit() {         
        this.adduserForm = this.formBuilder.group({
        name: ['', [Validators.required]],        
        email: ['', [Validators.required, CustomValidators.validateEmail]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        file: ['', []]
        });
    }

    submitForm(): void {
        console.log(this.adduserForm);
        if(this.adduserForm.valid == true){
            this.userService.addUser(this.adduserForm.value).subscribe(data => {
              this.data = data;
              console.log(data);
            });
            //this.router.navigate(['/']);
            //location.reload();
        }
            
    }
}
