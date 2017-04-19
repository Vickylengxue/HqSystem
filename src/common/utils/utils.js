function fieldClassName(field) {
     if (!field) {
       return '';
     }
     if ((field.$submitted) && field.$valid) {
       return 'has-success';
     }
     if ((field.$submitted) && field.$invalid) {
       return 'has-danger';
     }
}
export default {
	fieldClassName
}
