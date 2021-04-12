import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Profile } from "src/app/models/profile";
import {AnswerUploadService} from "src/app/answer-upload/answer-upload.service";

@Component({
  selector: 'app-answer-upload',
  templateUrl: './answer-upload.component.html',
  styleUrls: ['./answer-upload.component.css']
})
export class AnswerUploadComponent implements OnInit {
  form!: FormGroup;
  profile!: Profile; 
  imageData!: string;


  constructor(private answerUploadService: AnswerUploadService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      sem: new FormControl(null),
      subject: new FormControl(null),
      name: new FormControl(null),
      image: new FormControl(null),

    });
  }
  onFileSelect(event:any) {
    console.log(event.target.files);
    const file =event.target.files[0]; //(event.target as HTMLInputElement).files[0] | null;
    //file=files[0];
    //console.log(file);
    
    this.form.patchValue({ image: file });
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg","application/pdf","video/mp4"];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    console.log("submit");
    this.answerUploadService.addProfile(this.form.value.sem,this.form.value.subject, this.form.value.name, this.form.value.image);
    this.form.reset();
    this.imageData =" ";
  }

}