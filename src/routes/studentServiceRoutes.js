
import {checkToken, login, register} from "../controllers/userController";
import {validateToken} from "../../JWT";
import {createStudent, deleteStudent, getAllStudents} from "../controllers/studentController";


const routes = (app) => {
    
    // app.route('/contact')
    //     .get((req, res, next) => { 
    //     // middleware
    //     console.log('Request from: ' + req.originalUrl)
    //     console.log('Request type: ' + req.method)
    //     next();  
    //     }, getAllContacts)
    // .post(addNewContact);



    // app.route('/contact/:contactID')
    //     .get(getContact)
    //     .put(updateContact)
    //     .delete(removeContact)

    app.route('/check-token')
        .get(validateToken, checkToken)

    app.route('/register')
        .post(register);

    app.route('/login')
        .post(login);

    app.route('/create-student')
        .post(validateToken, createStudent);

    app.route('/get-all-students')
        .post(validateToken, getAllStudents);
      
      app.route('/delete-student')
          .post(validateToken, deleteStudent);
      



}



export default routes;
