import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { FeedbackService } from '../services/feedback.service';
import { flyInOut } from '../animations/app.animations';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut()
  ]
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  feedbackcopy: Feedback;
  contactType = ContactType;
  @ViewChild('fform') feedbackFormDirective;
  errMess: string;

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email':''
  };

  validationMessages  = {
    'firstname': {
      'required': 'First name is required.',
      'minlength': 'First name  must be at least 2 characters long.',
      'maxlength': 'First name cannot be more than 25 characters long.'
    },
    'lastname': {
      'required': 'Last name is required.',
      'minlength': 'Last name  must be at least 2 characters long.',
      'maxlength': 'Last name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required': 'Telephone number is required.',
      'pattern': 'Telephone number must contain only numbers.'
    },
    'email': {
      'required': 'Email is required.',
      'email': 'Email not in valid format.'
    }
  }

  constructor(private feedbackService: FeedbackService,
              private fb: FormBuilder,
              @Inject('baseURL') private baseURL) {
    this.createForm();
    }

  ngOnInit() {
  }

  createForm(){
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: [0, [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges
        .subscribe(data => this.onValueChanged(data),
          errmess => this.errMess = <any>errmess);

    this.onValueChanged(); //(re)set form validation messages

  }

  onValueChanged(data?: any){
    if(!this.feedbackForm){
      return;
    }
    const form = this.feedbackForm;
    for (const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)){
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackFormDirective.resetForm();

    this.feedbackcopy= this.feedback;
    this.feedbackService.submitFeedback(this.feedbackcopy)
      .subscribe(feedback => {
        this.feedback = feedback;
        this.feedbackcopy = feedback;},
        errmess => { this.feedback = null; this.feedbackcopy = null;
        this.errMess = <any>errmess});

  }
}
