const handlebars = require('handlebars');
import template from './template';

class HtmlGenerator {
    generate(staff) {
        const htmlGenerator = handlebars.compile(template);
        return htmlGenerator({staff: staff});
    }
}

export default HtmlGenerator;
