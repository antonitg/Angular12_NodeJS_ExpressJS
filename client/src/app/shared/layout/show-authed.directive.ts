import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Directive({
  selector: '[appShowAuthed]'
})
export class ShowAuthedDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private userService: UserService,
    private viewContainer: ViewContainerRef
  ) {}

  condition!: boolean;

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(
      (isAuthenticated) => {
        console.log("asdasddLLLLL");

        console.log(isAuthenticated);

        if (isAuthenticated && this.condition || !isAuthenticated && !this.condition) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      }
    );
  }

  @Input() set appShowAuthed(condition: boolean) {
    this.condition = condition;
    console.log("Condition directive: " + condition);

  }
}
