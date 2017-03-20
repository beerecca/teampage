const template = `{{#each staff}}
    <div class="staff__container" data-office="{{office}}" data-team="{{team}}">
        <img src="{{photo}}">
        <p>{{name}}</p>
        <p>{{title}}</p>
    </div>
{{/each}}`;

export default template;
