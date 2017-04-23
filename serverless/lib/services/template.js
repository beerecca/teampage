const template = `{{#each staff}}
    <div class="tp-staff" data-office="{{office}}" data-team="{{team}}">
        {{#if photo}}
            <img class="tp-staff__avatar" src="{{photo}}">
        {{/if}}
        <h4 class="tp-staff__name">{{name}}</h4>
        <p class="tp-staff__title">{{title}}</p>
    </div>
{{/each}}`;

export default template;
