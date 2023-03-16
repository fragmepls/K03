import { ItemService } from './../shared/item.service';
import { ArtikleValidators } from './../shared/artikle-validators';
import { ItemFactory } from './../shared/Item-factory';
import { Item } from './../shared/item';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Image } from '../shared/image';

class PricesCrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return control?.dirty &&
      (form?.form.get('prices')?.hasError('purchasingGreaterRetail') ||
        form?.form
          .get('prices')
          ?.get('purchasingPrice')
          ?.hasError('greaterZero'))
      ? true
      : false;
  }
}

class PicturesCrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return control?.dirty &&
      (form?.form.get('pictures')?.hasError('differentURLs') ||
        control.hasError('required'))
      ? true
      : false;
  }
}

@Component({
  selector: 'av-artikle-form',
  templateUrl: './artikle-form.component.html',
  styleUrls: ['./artikle-form.component.scss'],
})
export class ArtikleFormComponent implements OnInit {
  artikleForm!: FormGroup;
  item: Item = ItemFactory.empty();
  newItem: boolean = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private is: ItemService,
    private router: Router
  ) {}

  pricesErrorMatcher = new PricesCrossFieldErrorMatcher();
  picturesErrorMatcher = new PicturesCrossFieldErrorMatcher();

  ngOnInit() {
    this.artikleForm = this.fb.group({
      id: [this.item.id, [Validators.required, ArtikleValidators.idFormat]],
      description: [this.item.description, Validators.required],
      number: [
        this.item.number,
        [ArtikleValidators.noCommas, ArtikleValidators.greaterZero],
      ],
      prices: this.fb.group(
        {
          purchasingPrice: [
            this.item.purchasingPrice,
            [ArtikleValidators.greaterZero],
          ],
          retailPrice: [this.item.retailPrice, [ArtikleValidators.greaterZero]],
        },
        { validators: [ArtikleValidators.purchasingGreaterRetail] }
      ),
      launchDate: [this.item.launchDate, Validators.required],
      pictures: this.fb.array(
        [
          this.fb.group({
            url: [this.item.images[0].url, Validators.required],
            title: [this.item.images[0].title],
          }),
        ],
        {
          validators: [ArtikleValidators.differentURLs],
        }
      ),
    });

    if (this.route.snapshot.params.id !== undefined) {
      this.pictures.clear();
      this.newItem = false;
      this.is.getItem(this.route.snapshot.params.id).subscribe((result) => {
        this.item = result;
        for (let image of this.item.images) {
          this.pushPicture(image.url, image.title);
        }
        this.artikleForm.patchValue({
            id: this.item.id,
            description: this.item.description,
            number: this.item.number,
            prices: {
              purchasingPrice: this.item.purchasingPrice,
              retailPrice: this.item.retailPrice
            },
            launchDate: this.item.launchDate
          });
      });
    }

    if (!this.newItem) {
      this.artikleForm.controls.id.disable();
    } else {
      this.artikleForm.controls.id.enable();
    }
  }

  get pictures(): FormArray {
    return this.artikleForm.get('pictures') as FormArray;
  }

  addPictureControl() {
    this.pictures.push(
      this.fb.group({
        url: [null, Validators.required],
        title: [null],
      })
    );
  }

  pushPicture(url: string, title: string) {
    this.pictures.push(
      this.fb.group({
        url: [url, Validators.required],
        title: [title],
      })
    );
  }

  removePictureControl(i: number) {
    this.pictures.removeAt(i);
  }

  delete() {
    this.router.navigate([`/error/delete/${this.item.id}`]);
  }
  submit() {
    let imageArray: Image[] = [];
    (this.pictures as FormArray).controls.map((control) =>
      imageArray.push({
        url: control.get('url')?.value,
        title: control.get('title')?.value,
      })
    );
    let item = new Item(
      (this.artikleForm.get('id')?.value as string).toLocaleUpperCase(),
      this.artikleForm.get('description')?.value,
      this.artikleForm.get('number')?.value,
      this.artikleForm.get('prices')?.get('purchasingPrice')?.value,
      this.artikleForm.get('prices')?.get('retailPrice')?.value,
      this.artikleForm.get('launchDate')?.value,
      imageArray
    );
    if (this.newItem) {
      this.router.navigateByUrl(`/error/create/`, {
        state: item,
      });
    } else {
      this.router.navigateByUrl(`/error/update/${this.item.id}`, {
        state: item,
      });
    }
  }
}
